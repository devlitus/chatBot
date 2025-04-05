import { RefObject } from 'react';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { useMessageStore } from '@/stores/message/message';
import { Message } from '../message/Message';

interface MessageType {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: MessageType[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const { isLoading } = useMessageStore();

  return (
    <div className="space-y-6" data-testid="message-list">
      {messages.map((message, index) => (
        <Message key={index} role={message.role} content={message.content} />
      ))}
      {isLoading && <Spinner />}
      <div ref={messagesEndRef} />
    </div>
  );
}
