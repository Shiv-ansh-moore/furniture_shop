from flask import Flask, stream_with_context, Response, request, jsonify
from openai import OpenAI
from openai import AssistantEventHandler
from typing_extensions import override
from flask_cors import CORS
import queue

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key="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")

clients = {}

class EventHandler(AssistantEventHandler):
  def __init__(self, thread_id):
        super().__init__()
        self.thread_id = thread_id

  @override
  def on_text_created(self, text) -> None:
    print(f"\nassistant > ", end="", flush=True)
      
  @override
  def on_text_delta(self, delta, snapshot):
      print(delta)
      client_queue = clients.get(self.thread_id)
      if client_queue:
          client_queue.put(delta.value)


def create_thread():
    thread = client.beta.threads.create()
    return thread

def add_message_to_thread(thread_id, user_message):
    message = client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=user_message
    )
    return message

def stream_run(thread_id):
   with client.beta.threads.runs.stream(
    thread_id=thread_id,
    assistant_id="asst_1zAa3uxrsn8R5mnlLeyZbihD",
    event_handler=EventHandler(thread_id),
    ) as stream:
        stream.until_done()

@app.route("/")
def initial_setup():
    thread = create_thread()
    return jsonify({"thread_id": thread.id})

@app.route("/onSubmit", methods=["POST"])
def run_this_bitch():
    thread_id = request.args.get("id")
    input = request.json.get("input")
    add_message_to_thread(thread_id=thread_id, user_message=input)
    stream_run(thread_id=thread_id)
    return("", 204)

@app.route("/events")
def events():
    def event_stream():
        thread_id = request.args.get("id")
        client_que = queue.Queue()
        clients[thread_id] = client_que
        try:
            while True:
                result = client_que.get()
                yield f"data: {result}\n\n"
        except GeneratorExit:
            clients.pop(thread_id, None)
    return Response(stream_with_context(event_stream()), content_type='text/event-stream')


if __name__ == '__main__':
   app.run(debug=True)