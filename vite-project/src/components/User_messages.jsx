const User_messages = (props) => {
  return (
    <div className="flex justify-end">
      <div className="pb-[10px] pr-[10px]">
        <div className="ml-3 mr-3 flex max-w-[70%] flex-col justify-center rounded-xl bg-ikea-grey p-2">
          <div>{props.message.text}</div>
        </div>
      </div>
    </div>
  );
};
export default User_messages;