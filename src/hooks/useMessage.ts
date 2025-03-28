import { sendMessage } from "@/services/post/sendMessage";
import { useChatStore } from "@/stores/chat";
import { useListModelStore } from "@/stores/listModel";
import { useCallback, useState } from "react";

export function useMessage() {
  const { chats, currentChatId, addMessage } = useChatStore();
  const { selectedModel } = useListModelStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessage = useCallback(async (currentMessage?: string) => {
    if (!currentChatId) {
      console.warn('No active chat');
      return { success: false, error: 'No active chat' };
    }

    if (selectedModel === "Modelos LLM") {
      console.warn('No model selected');
      return { success: false, error: 'No model selected' };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Get current chat messages
      const currentChat = chats.find(chat => chat.id === currentChatId);
      if (!currentChat) {
        console.warn('Chat not found');
        setIsLoading(false);
        return { success: false, error: 'Chat not found' };
      }

      // Get the last few messages for context (limit to last 10 messages)
      const recentMessages = currentChat.messages.slice(-10);
      
      // Create messages array with new message
      const messagesToSend = currentMessage 
        ? [...recentMessages, { role: 'user', content: currentMessage }]
        : recentMessages;

      console.log('Sending messages to API:', messagesToSend); // Debug log

      // Send messages to API
      const response = await sendMessage({
        model: selectedModel,
        messages: messagesToSend
      });

      console.log('Received response:', response); // Debug log
      
      // Add assistant's response to chat
      if (response && typeof response === 'string') {
        addMessage({ 
          role: 'assistant', 
          content: response.trim() 
        });
        
        // Guardar en localStorage se maneja automáticamente en el store
        
        setIsLoading(false);
        return { success: true, data: response.trim() };
      } else {
        console.error('Invalid response from assistant:', response);
        setError('Respuesta inválida del asistente');
        setIsLoading(false);
        return { success: false, error: 'Invalid response from assistant' };
      }
    } catch (error) {
      console.error('Failed to fetch message:', error);
      setError('Error al obtener respuesta');
      setIsLoading(false);
      return { success: false, error: 'Failed to fetch message' };
    }
  }, [addMessage, selectedModel, chats, currentChatId]); 

  return { fetchMessage, isLoading, error };
}
