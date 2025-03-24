import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ReactNode } from "react";

interface BaseProps {
  children: ReactNode;
}

interface CodeProps {
  node?: {
    position?: {
      start: {
        line: number;
      };
      end: {
        line: number;
      };
    };
  };
  className?: string;
  children: ReactNode;
}

const MarkdownComponents = {
  ul: ({ children }: BaseProps) => (
    <ul className="list-disc ml-4 space-y-1">{children}</ul>
  ),
  li: ({ children }: BaseProps) => (
    <li className="marker:text-[var(--color-text-primary)]">{children}</li>
  ),
  strong: ({ children }: BaseProps) => (
    <strong className="font-semibold text-[var(--color-text-primary)]">
      {children}
    </strong>
  ),
  p: ({ children }: BaseProps) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  code: ({ node, className, children }: CodeProps) => {
    const isInline = node?.position?.start.line === node?.position?.end.line;
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    return !isInline && language ? (
      <div className="rounded-md overflow-hidden my-2">
        <SyntaxHighlighter style={vscDarkPlus} language={language} PreTag="div">
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-[var(--color-bg-primary)] px-1 py-0.5 rounded text-sm">
        {children}
      </code>
    );
  }
};

interface MessageContentProps {
  content: string;
}

export function MessageContent({ content }: MessageContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown components={MarkdownComponents}>{content}</ReactMarkdown>
    </div>
  );
}
