import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const StreamingMarkdown = ({ markdown, showCursor }) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown + (showCursor ? "▍" : "")}
      </ReactMarkdown>
    </div>
  );
};