import { vi } from "vitest";

// Mocks para los stores
vi.mock("@/stores/chat", () => ({
  useChatStore: () => ({
    addMessage: vi.fn(),
    currentChatId: "test-chat-id",
    addChat: vi.fn(),
  }),
}));

vi.mock("@/stores/listModel", () => ({
  useListModelStore: () => ({
    selectedModel: "gpt-3.5-turbo",
  }),
}));

// Mock para los hooks
vi.mock("@/hooks/useMessage", () => ({
  useMessage: () => ({
    fetchMessage: vi.fn(),
    isLoading: false,
  }),
}));

// Mocks para los iconos
vi.mock("@/components/icons/Upload", () => ({
  Upload: () => ({ type: "div", props: { "data-testid": "upload-icon" } }),
}));

vi.mock("@/components/icons/Send", () => ({
  Send: () => ({ type: "div", props: { "data-testid": "send-icon" } }),
}));

vi.mock("@/components/icons/NoSend", () => ({
  NoSend: () => ({ type: "div", props: { "data-testid": "no-send-icon" } }),
}));

// Mock para el botón
vi.mock("@/components/ui/button/Button", () => ({
  Button: ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    disabled,
    ...props
  }: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>) => ({
    type: "button",
    props: {
      onClick,
      disabled,
      className: `button ${variant} ${size} ${className}`,
      "data-testid": "mock-button",
      ...props,
      children,
    },
  }),
}));
