const Dot_spinner = () => {
  return (
    <div className="mb-3 ml-3 mr-3 flex h-[20px] w-[50px] items-center justify-center rounded-xl bg-ikea-grey">
      <div className="flex justify-center space-x-1">
        <div className="h-2 w-2 flex-none animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 flex-none animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 flex-none animate-bounce rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
};
export default Dot_spinner;
