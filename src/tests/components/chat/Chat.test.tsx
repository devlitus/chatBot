import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Chat } from "@/components/chat/Chat";
import { Message } from "@/types/message";
import {
  setupChatMocks,
  mockMessages,
  getMockChatStore,
  mockScrollIntoView,
  getMockMessageStore,
} from "@/tests/mocks/chatMocks";
import { setupModelMocks } from "@/tests/mocks/modelMocks";
import type { Mock } from "vitest";

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
};
global.localStorage = mockLocalStorage;

vi.mock("@/components/chat/components/MessageList", () => {
  return {
    MessageList: ({
      messages,
      messagesEndRef,
    }: {
      messages: Message[];
      messagesEndRef: React.RefObject<HTMLDivElement>;
    }) => {
      const { isLoading } = getMockMessageStore();
      return (
        <div className="space-y-6" data-testid="message-list">
          {messages.map((msg, index) => (
            <div
              key={index}
              data-testid="message-wrapper"
              className={`flex ${
                msg.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div data-testid="message-container">{msg.content}</div>
            </div>
          ))}
          {isLoading && <div data-testid="spinner">Loading...</div>}
          <div ref={messagesEndRef} />
        </div>
      );
    },
  };
});

describe("Chat Integration", () => {
  let mockChatStore: Mock;
  let mockModelStore: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockChatStore = setupChatMocks();
    mockModelStore = setupModelMocks();
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it("should show welcome message when no model is selected", () => {
    mockChatStore.mockReturnValue(
      getMockChatStore({ chats: [], currentChatId: null })
    );

    mockModelStore.mockReturnValue({
      selectedModel: "Modelos LLM",
      models: [],
      modelOptions: [],
      setSelectedModel: vi.fn(),
      setListModels: vi.fn(),
    });

    render(<Chat />);

    expect(screen.getByText("Bienvenido al Chat")).toBeInTheDocument();
    expect(
      screen.getByText("Seleccione un modelo LLM para poder empezar")
    ).toBeInTheDocument();
  });

  it.skip("should render MessageList when model is selected", () => {
    const mockChat = {
      id: "chat1",
      messages: mockMessages,
    };

    mockChatStore.mockReturnValue(
      getMockChatStore({
        chats: [mockChat],
        currentChatId: mockChat.id,
      })
    );

    mockModelStore.mockReturnValue({
      selectedModel: "gpt-4",
      models: [],
      modelOptions: [],
      setSelectedModel: vi.fn(),
      setListModels: vi.fn(),
    });

    render(<Chat />);

    const messageWrappers = screen.getAllByTestId("message-wrapper");
    expect(messageWrappers).toHaveLength(2);

    const messageContainers = screen.getAllByTestId("message-container");
    expect(messageContainers[0]).toHaveTextContent("Hello");
    expect(messageContainers[1]).toHaveTextContent("Hi there");
  });

  it.skip("should scroll to bottom when messages change", async () => {
    const initialMessages = [{ id: "1", content: "Hello", role: "user" }];
    const updatedMessages = [
      ...initialMessages,
      { id: "2", content: "Hi there", role: "assistant" },
    ];

    const mockChat = {
      id: "chat-1",
      messages: initialMessages,
    };

    mockChatStore.mockReturnValue(
      getMockChatStore({
        chats: [mockChat],
        currentChatId: mockChat.id,
      })
    );

    mockModelStore.mockReturnValue({
      selectedModel: "gpt-4",
      models: [],
      modelOptions: [],
      setSelectedModel: vi.fn(),
      setListModels: vi.fn(),
    });

    const { rerender } = render(<Chat />);

    // Verify initial message is rendered
    const initialContainers = screen.getAllByTestId("message-container");
    expect(initialContainers).toHaveLength(1);
    expect(initialContainers[0]).toHaveTextContent("Hello");

    // Update messages and trigger re-render
    mockChatStore.mockReturnValue(
      getMockChatStore({
        chats: [{ ...mockChat, messages: updatedMessages }],
        currentChatId: mockChat.id,
      })
    );

    rerender(<Chat />);

    // Verify both messages are rendered
    const updatedContainers = screen.getAllByTestId("message-container");
    expect(updatedContainers).toHaveLength(2);
    expect(updatedContainers[0]).toHaveTextContent("Hello");
    expect(updatedContainers[1]).toHaveTextContent("Hi there");

    // Give time for the useEffect to run
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("should handle empty chat state", () => {
    mockChatStore.mockReturnValue(
      getMockChatStore({ chats: [], currentChatId: null })
    );

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({ idModel: "gpt-4" })
    );
    mockModelStore.mockReturnValue({
      selectedModel: "gpt-4",
      models: [],
      modelOptions: [],
      setSelectedModel: vi.fn(),
      setListModels: vi.fn(),
    });

    render(<Chat />);

    const messageList = screen.queryByTestId("message-list");
    expect(messageList).not.toBeInTheDocument();
  });

  it("should update when current chat changes", () => {
    const mockMessages2: Message[] = [
      { id: "2", content: "Chat 2", role: "user" },
    ];

    mockChatStore.mockReturnValue(
      getMockChatStore({
        chats: [
          { id: "chat1", messages: mockMessages },
          { id: "chat2", messages: mockMessages2 },
        ],
        currentChatId: "chat1",
      })
    );

    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({ idModel: "gpt-4" })
    );
    mockModelStore.mockReturnValue({
      selectedModel: "gpt-4",
      models: [],
      modelOptions: [],
      setSelectedModel: vi.fn(),
      setListModels: vi.fn(),
    });

    const { rerender } = render(<Chat />);
    expect(screen.getByText("Bienvenido al Chat")).toBeInTheDocument();

    mockChatStore.mockReturnValue(
      getMockChatStore({
        chats: [
          { id: "chat1", messages: mockMessages },
          { id: "chat2", messages: mockMessages2 },
        ],
        currentChatId: "chat2",
      })
    );

    rerender(<Chat />);
    expect(
      screen.getByText("Seleccione un modelo LLM para poder empezar")
    ).toBeInTheDocument();
  });
});
