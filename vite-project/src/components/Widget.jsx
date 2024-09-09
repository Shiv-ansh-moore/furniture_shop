import Logo from "./Logo";
import Form from "./Form";
import User_messages from "./User_messages";
import Bot_messages from "./Bot_messages";
import { useEffect, useState } from "react";

const Widget = () => {
  return (
    <div className="fixed bottom-[20px] right-[20px] flex h-[80vh] w-[30vw] flex-col overflow-auto rounded-xl border-2 border-ikea-yellow pb-[60px]">
      <div className="flex-1 overflow-auto">
        <Logo />
        <User_messages message={userMessage}/>
        <Bot_messages />
      </div>
      <div className="mt-1">
        <Form/>
      </div>
    </div>
  );
};
export default Widget;
