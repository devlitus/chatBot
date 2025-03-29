import { Message } from "./Message";
import { MutableRefObject } from "react";
import Spinner from "@/components/ui/spinner/Spinner";
import { useMessageStore } from "@/stores/message";

interface MessageType {
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: MessageType[];
  messagesEndRef: MutableRefObject<HTMLDivElement | null>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const { isLoading } = useMessageStore();

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <Message key={index} role={message.role} content={message.content} />
      ))}
      {isLoading && <Spinner />}
      <div ref={messagesEndRef} />
    </div>
  );
}
