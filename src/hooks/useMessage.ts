import { sendMessage } from "@/services/post/sendMessage";
import { useChatStore } from "@/stores/chat";
import { useListModelStore } from "@/stores/listModel";
import { useCallback } from "react";

export function useMessage() {
  const { chats, currentChatId, addMessage } = useChatStore();
  const { selectedModel } = useListModelStore();

  const fetchMessage = useCallback(async (currentMessage?: string) => {
    if (!currentChatId) {
      console.warn('No active chat');
      return;
    }

    if (selectedModel === "Modelos LLM") {
      console.warn('No model selected');
      return;
    }

    try {
      // Get current chat messages
      const currentChat = chats.find(chat => chat.id === currentChatId);
      if (!currentChat) {
        console.warn('Chat not found');
        return;
      }

      // Get the last few messages for context (limit to last 10 messages)
      const recentMessages = currentChat.messages.slice(-10);
      
      // Create messages array with new message
      const messagesToSend = currentMessage 
        ? [...recentMessages, { role: 'user', content: currentMessage }]
        : recentMessages;

      console.log('Sending messages to API:', messagesToSend); // Debug log

      // Send messages to API
      const assistantResponse = await sendMessage({
        model: selectedModel,
        messages: messagesToSend
      });

      console.log('Received response:', assistantResponse); // Debug log
      
      // Add assistant's response to chat
      if (assistantResponse && typeof assistantResponse === 'string') {
        addMessage({ 
          role: 'assistant', 
          content: assistantResponse.trim() 
        });
      } else {
        console.error('Invalid response from assistant:', assistantResponse);
      }
    } catch (error) {
      console.error('Failed to fetch message:', error);
    }
  }, [addMessage, selectedModel, chats, currentChatId]); 

  return { fetchMessage };
}
