import React from "react";
import smile from "../assets/images/icons8-chat-bot-50 (1).png"

const Button = ({handleButtonClick}) => {
  return (
    <div className="fixed bottom-[20px] right-[20px]">
      <button onClick={handleButtonClick}>
        <div className="m-0 flex h-[60px] w-[200px] flex-col justify-center rounded-3xl bg-ikea-yellow p-0">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl text-white">Chat Now</h1>
            </div>
            <div>
              <img
                className="m-2 h-[30px]"
                src={smile}
                alt="Chat Icon"
              />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Button;