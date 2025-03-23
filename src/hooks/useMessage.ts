import { sendMessage } from "@/services/post/sendMessage";
import { useChatStore } from "@/stores/chat";
import { useListModelStore } from "@/stores/listModel";
import { useCallback } from "react";

export function useMessage() {
  const { messages, addMessage } = useChatStore();
  const { selectedModel } = useListModelStore();

  const fetchMessage = useCallback(async (currentMessage?: string) => {
    if (selectedModel === "Modelos LLM") {
      console.warn('No model selected');
      return;
    }

    try {
      const content = await sendMessage({
        model: selectedModel,
        messages: [{
          role: 'user',
          content: currentMessage || messages[messages.length - 1].content
        }]
      });
      addMessage({ role: 'assistant', content });
    } catch (error) {
      console.error('Failed to fetch message:', error);
    }
  }, [addMessage, selectedModel, messages]); 

  return { fetchMessage };
}
