import { useChatStore } from '@/stores/chat/chat';
import { useEffect, useRef, useMemo } from 'react';
import { MessageList } from './components/messageList/MessageList';
import { useListModelStore } from '@/stores/listModel/listModel';

export function Chat() {
  const { chats, currentChatId } = useChatStore();
  const { selectedModel } = useListModelStore();

  const currentChat = useMemo(
    () => chats.find((chat) => chat.id === currentChatId),
    [chats, currentChatId],
  );
  const messages = useMemo(
    () => currentChat?.messages || [],
    [currentChat?.messages],
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isModelSelected = selectedModel !== 'Modelos LLM';

  return (
    <div className="h-full p-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[var(--color-text-primary)]">
      <div className="max-w-[1280px] mx-auto">
        {!isModelSelected ? (
          <div className="flex h-full items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center p-8 bg-[var(--color-surface-secondary)] rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Bienvenido al Chat</h2>
              <p className="text-lg">
                Seleccione un modelo LLM para poder empezar
              </p>
            </div>
          </div>
        ) : (
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        )}
      </div>
    </div>
  );
}
