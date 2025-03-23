import { useChatStore } from "@/stores/chat";

export function Chat() {
  const { messages } = useChatStore();

  return (
    <div className="h-full p-4 text-[var(--color-text-primary)]">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-2xl  mb-4">Chat</h1>
        <div className="space-y-4 h-full overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
