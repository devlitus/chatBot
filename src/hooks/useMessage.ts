import { useChatStore } from "@/stores/chat";
import { useListModelStore } from "@/stores/listModel";
import { sendMessage } from "@/services/post/sendMessage";
import { useMessageStore } from "@/stores/message";
import { useCallback } from "react";

export function useMessage() {
  const { currentChatId, addMessage, chats } = useChatStore();
  const { selectedModel } = useListModelStore();
  const { setIsLoading, isLoading } = useMessageStore();
  
  const handleSendMessage = useCallback(async (currentMessage: string) => {
    if (!currentChatId) {
      console.warn('No active chat');
      return { success: false, error: 'No active chat' };
    }

    if (selectedModel === "Modelos LLM") {
      console.warn('No model selected');
      return { success: false, error: 'No model selected' };
    }

    setIsLoading(true);

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

      console.log('Sending messages to API:', messagesToSend);

      // Send messages to API
      const response = await sendMessage({
        model: selectedModel,
        messages: messagesToSend
      });

      console.log('Received response:', response);
      
      // Add assistant's response to chat
      if (response && typeof response === 'string') {
        addMessage({ 
          role: 'assistant', 
          content: response.trim() 
        });
        
        setIsLoading(false);
        return { success: true, data: response.trim() };
      }

      setIsLoading(false);
      return { success: false, error: 'Invalid response from API' };

    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      return { success: false, error: 'Error sending message' };
    }
  }, [addMessage, selectedModel, chats, currentChatId, setIsLoading]);

  // Mantener compatibilidad con la función fetchMessage
  const fetchMessage = useCallback(async (currentMessage?: string) => {
    const response = await handleSendMessage(currentMessage || '');
    return {
      success: response.success,
      data: response.data,
      error: response.error
    };
  }, [handleSendMessage]);

  return {
    handleSendMessage,
    fetchMessage,
    isLoading
  };
}
