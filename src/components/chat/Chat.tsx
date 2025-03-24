import { useChatStore } from "@/stores/chat";
import { useEffect, useRef, useMemo } from "react";
import { MessageList } from "./components/MessageList";

export function Chat() {
  const { chats, currentChatId } = useChatStore();
  const currentChat = useMemo(
    () => chats.find((chat) => chat.id === currentChatId),
    [chats, currentChatId]
  );
  const messages = useMemo(
    () => currentChat?.messages || [],
    [currentChat?.messages]
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full p-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[var(--color-text-primary)]">
      <div className="max-w-[1280px] mx-auto">
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      </div>
    </div>
  );
}
