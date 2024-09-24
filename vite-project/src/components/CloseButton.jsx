import React from "react";

const CloseButton = ({handleButtonClick}) => {
  return (
    <div>
      <button onClick={handleButtonClick}>
        <div className="flex h-[20px] w-[20px] flex-col justify-center rounded-full bg-ikea-yellow font-bold">
          <p className="mb-[2px] p-0">x</p>
        </div>
      </button>
    </div>
  );
};

export default CloseButton;
