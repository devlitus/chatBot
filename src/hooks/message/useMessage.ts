import { useListModelStore } from "@/stores/listModel/listModel";
import { useMessageStore } from "@/stores/message/message";
import { useCallback, useEffect } from "react";
import { MessageService } from "@/services/messages/messageService";
import { MessageResponse } from "@/types/message";
import { useChatStore } from "@/stores/chat/chat";

/**
 * Hook para manejar el envío y recepción de mensajes
 */
export function useMessage() {
  const { currentChatId, addMessage, chats, activateChat } = useChatStore();
  const { selectedModel } = useListModelStore();
  const { setIsLoading, isLoading } = useMessageStore();

  /**
   * Maneja el envío de un mensaje
   */
  const handleSendMessage = useCallback(async (currentMessage: string): Promise<MessageResponse> => {
    // Validar parámetros
    const validationResult = MessageService.validateMessageParams(currentChatId, selectedModel);
    if (!validationResult.success) {
      return validationResult;
    }

    setIsLoading(true);

    try {
      // Obtener chat actual
      const currentChat = chats.find(chat => chat.id === currentChatId);
      if (!currentChat) {
        setIsLoading(false);
        return { success: false, error: 'Chat not found' };
      }

      // Preparar y enviar mensajes
      const recentMessages = MessageService.getRecentMessages(currentChat.messages);
      const messagesToSend = MessageService.prepareMessagesToSend(recentMessages, currentMessage);
      
      const response = await MessageService.sendMessageToAPI({
        model: selectedModel,
        messages: messagesToSend
      });

      // Procesar respuesta
      if (response.success && response.data) {
        addMessage({ 
          role: 'assistant', 
          content: response.data 
        });
      }

      setIsLoading(false);
      return response;

    } catch {
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Error processing message' 
      };
    }
  }, [addMessage, selectedModel, chats, currentChatId, setIsLoading]);

  /**
   * Procesa mensajes pendientes cuando cambia el chat
   */
  useEffect(() => {
    const processPendingMessage = async () => {
      const currentChat = chats.find(chat => chat.id === currentChatId);
      if (!currentChat || currentChat.isActive || isLoading) return;

      const lastMessage = currentChat.messages[currentChat.messages.length - 1];
      if (lastMessage?.role === 'user') {
        await handleSendMessage(lastMessage.content);
        activateChat(currentChat.id);
      }
    };

    processPendingMessage();
  }, [currentChatId, chats, activateChat, handleSendMessage, isLoading]);

  /**
   * Mantiene compatibilidad con la función fetchMessage
   */
  const fetchMessage = useCallback(async (currentMessage?: string): Promise<MessageResponse> => {
    const currentChat = chats.find(chat => chat.id === currentChatId);
    if (currentChat && !currentChat.isActive) {
      return { success: true, data: null };
    }

    return handleSendMessage(currentMessage || '');
  }, [handleSendMessage, chats, currentChatId]);

  return {
    handleSendMessage,
    fetchMessage,
    isLoading
  };
}
