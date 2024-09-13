import Logo from "./Logo";
import Form from "./Form";
import User_messages from "./User_messages";
import Bot_messages from "./Bot_messages";
import { useEffect, useState } from "react";

const Widget = () => {
  const [threadId, setThreadId] = useState();

  useEffect(() => {
    const sse = new EventSource("http://127.0.0.1:5000/events");
    function handleStream(data) {
      console.log(data);
    }
    sse.onmessage = (e) => handleStream(e.data);
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((response) => response.json())
      .then((data) => {
        setThreadId(data.thread_id);
        console.log("Thread_id", data.thread_id);
      });
  }, []);

  const [messages, setMessages] = useState([]);

  // add user messages to messages array
  const addUserMessage = (userMessage) => {
    setMessages([...messages, { type: "user", text: userMessage }]);
  };
  // display user messages

  return (
    <div className="fixed bottom-[20px] right-[20px] flex h-[80vh] max-h-[700px] w-[30vw] min-w-[450px] max-w-[500px] flex-col overflow-auto rounded-xl border-2 border-ikea-yellow pb-[60px]">
      <div className="flex-1 overflow-auto">
        <Logo />
        {messages.map((message, index) =>
          message.type === "user" ? (
            <User_messages key={index} message={message} />
          ) : (
            <Bot_messages key={index} message={msg.text} />
          ),
        )}
      </div>
      <div className="mt-1">
        <Form addUserMessage={addUserMessage} thread_id={threadId} />
      </div>
    </div>
  );
};
export default Widget;
