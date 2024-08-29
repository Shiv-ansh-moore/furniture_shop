from flask import Flask, session, stream_with_context
from flask_session import Session
from openai import OpenAI

app = Flask(__name__)
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

client = OpenAI

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




if __name__ == '__main__':
    app.run(debug=True)