import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { CodeBlock } from '../codeBlock/CodeBlock';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
} from '../markdownTable/MarkdownTable';

interface MessageContentProps {
  content: string;
}

const MarkdownComponents: Partial<Components> = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--color-text-primary)]">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => (
    <ul className="list-disc ml-4 space-y-1 marker:text-[var(--color-text-primary)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-4 space-y-1 marker:text-[var(--color-text-primary)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 italic">
      {children}
    </blockquote>
  ),
  code: CodeBlock,
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};

export function MessageContent({ content }: MessageContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        components={MarkdownComponents}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
