import { NoSend } from "../icons/NoSend";
import { useChatStore } from "@/stores/chat";
import { useState } from "react";
import { useMessage } from "@/hooks/useMessage";
import { useListModelStore } from "@/stores/listModel";
import { Button } from "../ui/button/Button";
import { Upload } from "../icons/Upload";
import { Send } from "../icons/Send";

export function Footer() {
  const [message, setMessage] = useState("");
  const { addMessage, currentChatId, addChat } = useChatStore();
  const { fetchMessage, isLoading } = useMessage();
  const { selectedModel } = useListModelStore();

  const isInputDisabled = selectedModel === "Modelos LLM";
  const isSendDisabled = isInputDisabled || !message.trim() || isLoading;

  const handleSendMessage = async () => {
    if (isSendDisabled) return;

    // Si no hay un chat activo, crear uno nuevo
    if (!currentChatId) {
      addChat();
    }

    const currentMessage = message.trim();
    addMessage({ role: "user", content: currentMessage });
    setMessage("");

    // Enviar mensaje y comprobar respuesta
    const response = await fetchMessage(currentMessage);

    console.log("Respuesta del servicio:", response);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto flex items-center gap-4 p-4 ">
      <Button variant="primary" className="flex items-center gap-2">
        <Upload />
      </Button>

      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Escriba un mensaje..."
          className="w-full p-3 rounded-lg bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] outline-none
          border border-[var(--color-secondary)] shadow-sm
          focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-50 focus:border-[var(--color-accent)] transition-all"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isInputDisabled || isLoading}
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-primary)]"
          onClick={handleSendMessage}
          disabled={isSendDisabled}
        >
          {isLoading ? (
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
