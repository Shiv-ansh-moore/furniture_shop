import Logo from "./Logo";
import Form from "./Form";
import User_messages from "./User_messages";
import CloseButton from "./CloseButton";
import Bot_messages from "./Bot_messages";
import Dot_spinner from "./Dot_spinner";
import { useEffect, useState, useRef } from "react";

const Widget = ({ handleButtonClick }) => {
  const [threadId, setThreadId] = useState();
  const [messages, setMessages] = useState([]);
  const [formOn, setForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (threadId) {
      const sse = new EventSource(
        `http://127.0.0.1:5000/events?id=${threadId}`,
      );

      function handleStream(data) {
        console.log(data.message);
        if (data.message === "message_done_69") {
          setForm(true);
        } else if (data.message === "message_start_69") {
          setLoading(false);
        } else {
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Server Error");
        }
        return response.json();
      })
      .then((data) => {
        setThreadId(data.thread_id);
        console.log("Thread_id", data.thread_id);
        setForm(true);
        setLoading(false);
        setMessages([
          ...messages,
          {
            type: "bot",
            text: "Hello! Welcome to our furniture shop. How can I assist you today? Are you looking for something specific or do you need some suggestions?",
          },
        ]);
      })
      .catch((error) => console.log("Error fetching data from server"));
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  // Add user messages to the array
  const addUserMessage = (userMessage) => {
    setMessages([...messages, { type: "user", text: userMessage }]);
  };

  return (
    <div className="fixed bottom-[20px] right-[20px] flex h-[80vh] max-h-[700px] w-[30vw] min-w-[450px] max-w-[500px] flex-col overflow-auto rounded-xl border-2 border-ikea-yellow pb-[60px]">
      <div className="flex-1 overflow-auto" ref={messagesEndRef}>
        <div className="flex justify-center">
          <Logo />
          <div className="absolute right-[20px] mt-[16px] p-0">
            <CloseButton handleButtonClick={handleButtonClick} />
          </div>
        </div>
        {messages.map((message, index) =>
          message.type === "user" ? (
            <User_messages key={index} message={message} />
          ) : (
            <Bot_messages key={index} message={message} />
          ),
        )}
        {loading ? <Dot_spinner /> : null}
      </div>
      <div className="mt-1">
        <Form
          addUserMessage={addUserMessage}
          thread_id={threadId}
          formOn={formOn}
          setForm={setForm}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default Widget;
