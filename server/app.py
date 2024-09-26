from flask import Flask, stream_with_context, Response, request, jsonify
import json
from openai import OpenAI
from openai import AssistantEventHandler
from typing_extensions import override
from flask_cors import CORS
import queue
import os

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.getenv("OPEN_AI_API_KEY"))

clients = {}

class EventHandler(AssistantEventHandler):
  def __init__(self, thread_id):
        super().__init__()
        self.thread_id = thread_id

  @override
  def on_text_created(self, text) -> None:
    client_queue = clients.get(self.thread_id)
    if client_queue:
        client_queue.put("message_start_69")

  @override
  def on_end(self) -> None:
      client_queue = clients.get(self.thread_id)
      if client_queue:
          client_queue.put("message_done_69")
  
  @override
  def on_text_delta(self, delta, snapshot):
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
                json_data = json.dumps({'message': result})
                yield f"data: {json_data}\n\n"
        except GeneratorExit:
            clients.pop(thread_id, None)
    return Response(stream_with_context(event_stream()), content_type='text/event-stream')


if __name__ == '__main__':
   app.run(debug=True)