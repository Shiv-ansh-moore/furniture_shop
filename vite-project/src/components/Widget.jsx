import Logo from "./Logo";
import Form from "./Form";
import User_messages from "./User_messages";
import Bot_messages from "./Bot_messages";
import { useEffect, useState } from "react";

const Widget = () => {
  return (
    <div className="fixed bottom-[20px] right-[20px] flex h-[80vh] max-h-[700px] w-[30vw] max-w-[500px] flex-col overflow-auto rounded-xl border-2 border-ikea-yellow pb-[60px] min-w-[450px]">
      <div className="flex-1 overflow-auto">
        <Logo />
      </div>
      <div className="mt-1">
        <Form />
      </div>
    </div>
  );
};
export default Widget;
