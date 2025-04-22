import { RefObject } from 'react';
import { Spinner } from '@/components/ui/spinner/Spinner';
import { useMessageStore } from '@/stores/message/message';
import { Message } from '../message/Message';
import type { Database } from '@/types/database.types';

type Message = Database['public']['Tables']['messages']['Row'];

interface MessageListProps {
  messages: Message[];
  messagesEndRef?: RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const { isLoading } = useMessageStore();

  return (
    <div className="space-y-6" data-testid="message-list">
      {messages.map((message) => (
        <Message key={message.id} role={message.role} content={message.content} />
      ))}
      {isLoading && <Spinner />}
      {messagesEndRef && <div ref={messagesEndRef} />}
    </div>
  );
}
