import { vi } from "vitest";

/**
 * Devuelve un mock para el store de chat
 */
export function getChatStoreMock() {
  return {
    useChatStore: () => ({
      addMessage: vi.fn(),
      currentChatId: "test-chat-id",
      addChat: vi.fn(),
    }),
  };
}

/**
 * Devuelve un mock para el store de modelos
 */
export function getListModelStoreMock() {
  return {
    useListModelStore: () => ({
      selectedModel: "gpt-3.5-turbo",
    }),
  };
}
