const User_messages = (props) => {
  return (
      <div className="flex justify-end">
        <div className="mb-3 ml-3 mr-3 rounded-xl bg-ikea-grey p-2 max-w-[72.5%] break-words">
          {props.message.text}
        </div>
      </div>
  );
};
export default User_messages;
