import { MessageContent } from '../messageContent/MessageContent';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function Message({ role, content }: MessageProps) {
  return (
    <div
      className={`flex ${
        role === 'assistant' ? 'justify-start' : 'justify-end'
      }`}
      data-testid="message-wrapper"
    >
      <div
        data-testid="message-container"
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          role === 'assistant'
            ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]'
            : 'bg-[var(--color-accent)] text-[var(--color-text-inverse)]'
        }`}
      >
        {role === 'assistant' ? <MessageContent content={content} /> : content}
      </div>
    </div>
  );
}
