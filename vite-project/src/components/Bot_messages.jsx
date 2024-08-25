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
    const containsImage = node.children.some(
      (child) => child.tagName === "img",
    );

    return (
      <li
        className={`mb-1 ${containsImage ? 'list-none' : ''}`} {...props}
      />
    );
  },
};
const message = `Certainly! Here are a few options you might be interested in:

1. **ÄPPLARYD - 3-seat sofa, Gunnared light blue**
   - **Price:** €799
   - **Description:** An eye-catcher that reflects your personality and style. Great to sit, lie down, and hang out on, with lots of space for the whole family over the years.
   - **Dimensions:** Width: 231 cm, Depth: 93 cm, Height including back cushions: 82 cm
   - [**Product Link**](https://www.ikea.com/ie/en/p/aepplaryd-3-seat-sofa-gunnared-light-blue-20575087/)
   - ![ÄPPLARYD Light Blue](https://www.ikea.com/ie/en/images/products/aepplaryd-3-seat-sofa-gunnared-light-blue__1282692_pe932252_s5.jpg?f=s)

2. **ÄPPLARYD - 3-seat sofa, Gunnared black/grey**
   - **Price:** €799
   - **Description:** Stylish and straightforward exterior with well-tailored soft cover and comfortable inner pocket springs. The slim legs reinforce the tranquil and airy look.
   - **Dimensions:** Width: 231 cm, Depth: 93 cm, Height including back cushions: 82 cm
   - [**Product Link**](https://www.ikea.com/ie/en/p/aepplaryd-3-seat-sofa-gunnared-black-grey-30575077/)
   - ![ÄPPLARYD Black/Grey](https://www.ikea.com/ie/en/images/products/aepplaryd-3-seat-sofa-gunnared-black-grey__1282693_pe932251_s5.jpg?f=s)

3. **ÄPPLARYD - 3-seat sofa, Lejde light grey**
   - **Price:** €850
   - **Description:** Super comfy with soft covers and puffy cushions together with pocket springs that follow your body and support various positions – from sitting upright to lying down and relaxing.
   - **Dimensions:** Width: 231 cm, Depth: 93 cm, Height including back cushions: 82 cm
   - [**Product Link**](https://www.ikea.com/ie/en/p/aepplaryd-3-seat-sofa-lejde-light-grey-10506235/)
   - ![ÄPPLARYD Lejde Light Grey](https://www.ikea.com/ie/en/images/products/aepplaryd-3-seat-sofa-lejde-light-grey__0992909_pe820327_s5.jpg?f=s)

Do any of these options meet your requirements, or would you like more alternatives?`;

const Bot_messages = () => {
  return (
    <div className="m-3 rounded-xl bg-ikea-grey p-7">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
      >
        {message}
      </ReactMarkdown>
    </div>
  );
};

export default Bot_messages;
