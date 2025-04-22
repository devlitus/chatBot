import { useChatStore } from '@/stores/chat/chat';
import { useEffect, useRef } from 'react';
import { MessageList } from './components/messageList/MessageList';
import { useListModelStore } from '@/stores/listModel/listModel';
import { useSupabaseAuth } from '@/hooks/auth/useSupabaseAuth';

export function Chat() {
  const { user } = useSupabaseAuth();
  const { currentChat, messages, loadChats, loadMessages } = useChatStore();
  const { selectedModel } = useListModelStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (user?.id) {
      loadChats(user.id);
    }
  }, [user?.id, loadChats]);

  useEffect(() => {
    if (currentChat?.id) {
      loadMessages(currentChat.id);
    }
  }, [currentChat?.id, loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isModelSelected = selectedModel !== 'Modelos LLM';

  return (
    <div className="h-full p-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[var(--color-text-primary)]">
      <div className="max-w-[1280px] mx-auto">
        {!isModelSelected ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold mb-4">Selecciona un modelo para comenzar</h2>
          </div>
        ) : (
          <>
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
}
