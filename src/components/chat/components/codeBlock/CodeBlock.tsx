import { ComponentPropsWithoutRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps extends ComponentPropsWithoutRef<"code"> {
  inline?: boolean;
}

export const CodeBlock = ({ inline, className, children, ...props }: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <div className="rounded-md overflow-hidden my-2">
      <SyntaxHighlighter
        // @ts-expect-error - vscDarkPlus has the correct type but TS doesn't recognize it
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        className="rounded-md"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className="bg-[var(--color-bg-secondary)] px-1 py-0.5 rounded text-sm" {...props}>
      {children}
    </code>
  );
};
