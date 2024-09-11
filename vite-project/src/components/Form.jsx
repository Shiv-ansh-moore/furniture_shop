import { useState } from "react";

const Form = (props) => {
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (message.trim()) {
      props.addUserMessage(message); // Pass the message to the function
      setMessage(""); // Clear the input field
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <div className="absolute bottom-[20px] left-[20px] h-[40px] w-[90%] rounded-xl bg-ikea-grey">
        <input
          type="text"
          name="userMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Update the message state on input change
          className="h-[40px] w-[100%] rounded-xl bg-ikea-grey"
        />
        <button
          type="submit"
          className="absolute right-[10px] top-[5px] rounded-full"
        >
          <img
            className="h-[30px]"
            src="/images/upload-icon.png"
            alt="upload"
          ></img>
        </button>
      </div>
    </form>
  );
};

export default Form;
