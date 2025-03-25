import { Message } from "./Message";
import { MutableRefObject } from "react";

interface MessageType {
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: MessageType[];
  messagesEndRef: MutableRefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <Message key={index} role={message.role} content={message.content} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
