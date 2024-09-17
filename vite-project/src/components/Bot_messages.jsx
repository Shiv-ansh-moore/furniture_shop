import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ node, ...props }) => (
    <h1 className="mb-4 text-3xl font-bold" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="mb-4 text-2xl font-bold" {...props} />
  ),
  p: ({ node, ...props }) => <p className="mb-2 text-base" {...props} />,
  a: ({ node, ...props }) => (
    <a className="text-blue-500 underline" {...props} />
  ),
  img: ({ node, ...props }) => (
    <img className="ml-3 w-1/2 rounded-lg shadow-md" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="ml-3 list-inside list-disc" {...props} />
  ),
  ol: ({ node, ...props }) => <ol className="ml-5 list-decimal" {...props} />,
  li: ({ node, ...props }) => {
    const containsImage = node.children.some((child) => child.type === "image");

    return (
      <li className={`mb-1 ${containsImage ? "list-none" : ""}`} {...props} />
    );
  },
};

const BotMessages = (props) => {
  const testMessage = "This is line one.  \nThis is line two.\nThis is line three.";
  return (
    <div className="m-3 rounded-xl bg-ikea-grey p-7">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
        breaks={true}
      >
        {/* {testMessage} */}
        {props.message.text}
      </ReactMarkdown>
    </div>
  );
};

export default BotMessages;
