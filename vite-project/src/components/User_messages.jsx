const User_messages = (props) => {
  return (
    <div className="flex justify-end">
      <div className="pb-[10px] pr-[10px]">
        <div className="flex h-[40px] flex-col justify-center rounded-xl bg-ikea-grey pl-[10px] pr-[10px]">
          <div>{props.message}</div>
        </div>
      </div>
    </div>
  );
};
export default User_messages;
