import React from "react";

const Button = () => {
  return (
    <div className="fixed bottom-[20px] right-[20px]">
      <button>
        <div className="m-0 flex h-[60px] w-[200px] flex-col justify-center rounded-3xl bg-ikea-yellow p-0">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl text-white">Chat Now</h1>
            </div>
            <div>
              <img
                className="m-2 h-[30px]"
                src="/images/icons8-chat-bot-50 (1).png"
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