import { NoSend } from '../icons/NoSend';
import { useChatStore } from '@/stores/chat/chat';
import { useState, useCallback, useEffect } from 'react';
import { useMessage } from '@/hooks/message/useMessage';
import { useListModelStore } from '@/stores/listModel/listModel';
import { Button } from '../ui/button/Button';
import { Upload } from '../icons/Upload';
import { Send } from '../icons/Send';
import { useSupabaseAuth } from '@/hooks/auth/useSupabaseAuth';

export function Footer() {
  const [messageText, setMessageText] = useState('');
  const { user } = useSupabaseAuth();
  const { createChat, currentChat, sendMessage } = useChatStore();
  const { isLoading: isSending } = useMessage();
  const { selectedModel, fetchModels,  } = useListModelStore();

  useEffect(() => {
    if (user?.id) {
      fetchModels();
    }
  }, [user?.id, fetchModels]);

  const isInputDisabled = selectedModel === 'Modelos LLM' || !user;
  const isSendDisabled = isInputDisabled || !messageText.trim() || isSending;

  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || !user?.id || isSendDisabled) return;

    if (!currentChat) {
      await createChat('Nuevo Chat', user.id);
    }

    setMessageText('');
    await sendMessage(trimmedMessage, 'user');

    // TODO: Integrar con el servicio de IA para obtener la respuesta
    const aiResponse = 'Esta es una respuesta temporal del asistente';
    await sendMessage(aiResponse, 'assistant');
  }, [messageText, user?.id, isSendDisabled, currentChat, createChat, sendMessage]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  }, []);

  return (
    <div className="max-w-[1560px] mx-auto flex items-center gap-4 p-4">
      <Button variant="primary" className="flex items-center gap-2">
        <Upload />
      </Button>
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder={isInputDisabled ? "Selecciona un modelo LLM para comenzar..." : "Escriba un mensaje..."}
          className="w-full p-3 rounded-lg bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] outline-none
          border border-[var(--color-secondary)] shadow-sm
          focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-50 focus:border-[var(--color-accent)] transition-all
          disabled:opacity-50 disabled:cursor-not-allowed"
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          disabled={isInputDisabled}
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-primary)]"
          onClick={handleSendMessage}
          disabled={isSendDisabled}
          aria-label="enviar mensaje"
        >
          {isSending ? (
            <div className="animate-spin h-5 w-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full"></div>
          ) : isSendDisabled ? (
            <NoSend />
          ) : (
            <Send />
          )}
        </button>
      </div>
    </div>
  );
}
