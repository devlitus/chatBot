import { useChatStore } from "@/stores/chat";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function Chat() {
  const { messages } = useChatStore();

  return (
    <div className="h-full p-4 text-[var(--color-text-primary)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === 'assistant'
                    ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]'
                    : 'bg-[var(--color-accent)] text-[var(--color-text-inverse)]'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        ul: ({children}) => <ul className="list-disc ml-4 space-y-1">{children}</ul>,
                        li: ({children}) => <li className="marker:text-[var(--color-text-primary)]">{children}</li>,
                        strong: ({children}) => <strong className="font-semibold text-[var(--color-text-primary)]">{children}</strong>,
                        p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                        code: ({node, inline, className, children, ...props}) => {
                          const match = /language-(\w+)/.exec(className || '');
                          const language = match ? match[1] : '';
                          
                          return !inline && language ? (
                            <div className="rounded-md overflow-hidden my-2">
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={language}
                                PreTag="div"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code className="bg-[var(--color-bg-primary)] px-1 py-0.5 rounded text-sm" {...props}>
                              {children}
                            </code>
                          )
                        }
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
