import { useChatStore } from "@/stores/chat";

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
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
