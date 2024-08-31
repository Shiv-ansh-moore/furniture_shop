const Form = (props) => {
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        props.change_user_message(e.target.userMessage.value);
      }}
    >
      <div className="absolute bottom-[20px] left-[20px] h-[40px] w-[460px] rounded-xl bg-ikea-grey">
        <input
          type="text"
          name="userMessage"
          className="h-[40px] w-[460px] rounded-xl bg-ikea-grey"
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
