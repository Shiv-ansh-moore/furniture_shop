import Logo from "./Logo";
import Form from "./Form";
import User_messages from "./User_messages";
import Bot_messages from "./Bot_messages";

const Widget = () => {
  return (
    <div className="fixed bottom-[20px] right-[20px] flex h-[700px] w-[500px] flex-col overflow-auto rounded-xl border-2 border-ikea-yellow pb-[60px]">
      <Logo />
      <User_messages />
      <Form />
      <Bot_messages />
    </div>
  );
};
export default Widget;
