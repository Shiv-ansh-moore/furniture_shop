import Logo from "./Logo";
import Form from "./Form";
import User_messages from "./User_messages";
import Bot_messages from "./Bot_messages";
import { useEffect, useState } from "react";

const Widget = () => {
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
        {messages.map((message, index) => (
          <User_messages key={index} message={message} />
        ))}
      </div>
      <div className="mt-1">
        <Form addUserMessage={addUserMessage} />
      </div>
    </div>
  );
};
export default Widget;
