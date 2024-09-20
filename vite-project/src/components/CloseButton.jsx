import React from "react";

const CloseButton = () => {
  return (
    <div>
      <button>
        <div className="flex h-[20px] w-[20px] flex-col justify-center rounded-full bg-ikea-yellow font-bold">
          <p className="mb-[3px] p-0">x</p>
        </div>
      </button>
    </div>
  );
};

export default CloseButton;
