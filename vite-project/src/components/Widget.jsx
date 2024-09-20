import Logo from "./Logo";
import Form from "./Form";
import User_messages from "./User_messages";
import CloseButton from "./CloseButton";
import Bot_messages from "./Bot_messages";
import { useEffect, useState } from "react";

const Widget = () => {
  const [threadId, setThreadId] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (threadId) {
      const sse = new EventSource(
        `http://127.0.0.1:5000/events?id=${threadId}`,
      );

      function handleStream(data) {
        console.log(data.message);

        setMessages((prevMessages) => {
          const messages = [...prevMessages];
          const lastMessageIndex = messages.length - 1;
          const lastMessage = messages[lastMessageIndex];

          if (lastMessage && lastMessage.type === "bot") {
            // Append data to the last bot message
            messages[lastMessageIndex] = {
              ...lastMessage,
              text: lastMessage.text + data.message,
            };
          } else {
            // Add a new bot message with the incoming data
            messages.push({ type: "bot", text: data.message });
          }

          return messages;
        });
      }

      sse.onmessage = (e) => {
        const parsedData = JSON.parse(e.data);
        handleStream(parsedData);
      };

      // Cleanup function to close the EventSource when the component unmounts or threadId changes
      return () => {
        sse.close();
      };
    }
  }, [threadId]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000")
      .then((response) => response.json())
      .then((data) => {
        setThreadId(data.thread_id);
        console.log("Thread_id", data.thread_id);
      });
  }, []);

  // Add user messages to the array
  const addUserMessage = (userMessage) => {
    setMessages([...messages, { type: "user", text: userMessage }]);
  };

  return (
    <div className="fixed bottom-[20px] right-[20px] flex h-[80vh] max-h-[700px] w-[30vw] min-w-[450px] max-w-[500px] flex-col overflow-auto rounded-xl border-2 border-ikea-yellow pb-[60px]">
      <div className="flex-1 overflow-auto">
        <div className="flex justify-center">
          <Logo />
          <div className="absolute right-[20px] mt-[15px]">
            <CloseButton />
          </div>
        </div>
        {messages.map((message, index) =>
          message.type === "user" ? (
            <User_messages key={index} message={message} />
          ) : (
            <Bot_messages key={index} message={message} />
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
