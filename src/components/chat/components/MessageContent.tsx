import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

interface MessageContentProps {
  content: string;
}

const MarkdownComponents: Partial<Components> = {
  p: ({ children }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--color-text-primary)]">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-4 space-y-1 marker:text-[var(--color-text-primary)]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-4 space-y-1 marker:text-[var(--color-text-primary)]">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="mb-1">{children}</li>
  ),
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold mb-2">{children}</h3>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 italic">
      {children}
    </blockquote>
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <div className="rounded-md overflow-hidden my-2">
        <SyntaxHighlighter
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
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border-collapse border border-[var(--color-accent)]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--color-bg-secondary)]">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-[var(--color-accent)] last:border-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left border-r border-[var(--color-accent)] last:border-0 font-bold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border-r border-[var(--color-accent)] last:border-0">
      {children}
    </td>
  ),
};

export function MessageContent({ content }: MessageContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown components={MarkdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
