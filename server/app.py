from flask import Flask, session, stream_with_context, Response
from flask_session import Session
from openai import OpenAI
from openai import AssistantEventHandler
from typing_extensions import override
import queue

app = Flask(__name__)
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

client = OpenAI(api_key="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")

clients = []

class EventHandler(AssistantEventHandler):    
  @override
  def on_text_created(self, text) -> None:
    print(f"\nassistant > ", end="", flush=True)
      
  @override
  def on_text_delta(self, delta, snapshot):
      for client in clients:
          client.put(delta.value)


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
    event_handler=EventHandler(),
    ) as stream:
        stream.until_done()

@app.route("/events")
def events():
    def event_stream():
        client = queue.Queue()
        clients.append(client)
        try:
            while True:
                result = client.get()
                yield f"data: {result}\n\n"
        except GeneratorExit:
            clients.remove(client)
    return Response(stream_with_context(event_stream()), content_type='text/event-stream')




if __name__ == '__main__':
   app.run(debug=True)