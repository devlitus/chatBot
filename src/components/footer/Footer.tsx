import { Button } from "../ui/button/Button";
import { Upload } from "../icons/Upload";
import { Send } from "../icons/Send";
import { NoSend } from "../icons/NoSend";
import { useChatStore } from "@/stores/chat";
import { useState } from "react";
import { useMessage } from "@/hooks/useMessage";
import { useListModelStore } from "@/stores/listModel";

export function Footer() {
  const [message, setMessage] = useState("");
  const { addMessage } = useChatStore();
  const { fetchMessage } = useMessage();
  const { selectedModel } = useListModelStore();

  const isInputDisabled = selectedModel === "Modelos LLM";
  const isSendDisabled = isInputDisabled || !message.trim();

  const handleSendMessage = async () => {
    if (isSendDisabled) return;
    const currentMessage = message;
    addMessage({ role: "user", content: currentMessage });
    setMessage("");
    await fetchMessage(currentMessage);
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isInputDisabled}
          className="w-full text-[var(--color-text-primary)] px-4 py-2 pr-12 border border-[var(--color-accent)] rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={
            isInputDisabled
              ? "Selecciona un modelo para empezar..."
              : "Escribe un mensaje..."
          }
        />
        <Button
          variant="secondary"
          className="absolute right-2 top-1/2 -translate-y-1/2 disabled:hover:bg-transparent disabled:cursor-not-allowed"
          onClick={handleSendMessage}
          disabled={isSendDisabled}
        >
          {isSendDisabled ? <NoSend /> : <Send />}
        </Button>
      </div>
    </div>
  );
}
