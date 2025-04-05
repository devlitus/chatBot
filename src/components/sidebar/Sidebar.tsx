import { Button } from "../ui/button/Button";
import { Plus } from "../icons/Plus";
import { Trash } from "../icons/Trash";
import { useChatStore } from "../../stores/chat";
import { useEffect, useState } from "react";
import { getFirstFiveWords } from "../chat/utils/textUtils";

export function Sidebar() {
  const {
    chats,
    currentChatId,
    addChat,
    setCurrentChat,
    loadChats,
    deleteChat,
  } = useChatStore();
  const [chatTitles, setChatTitles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // Efecto para actualizar los títulos cuando cambian los chats
  useEffect(() => {
    const newTitles: { [key: string]: string } = {};
    chats.forEach((chat) => {
      const firstUserMessage = chat.messages.find((m) => m.role === "user");
      newTitles[chat.id] = firstUserMessage
        ? getFirstFiveWords(firstUserMessage.content)
        : "Chat sin título";
    });
    setChatTitles(newTitles);
  }, [chats]);

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta conversación?")
    ) {
      deleteChat(chatId);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 border-r border-[var(--color-accent)]">
      <Button
        variant="primary"
        className="w-full mb-4 flex items-center justify-center gap-2"
        onClick={addChat}
      >
        <Plus />
        <span>Nuevo Chat</span>
      </Button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div key={chat.id} className="group relative">
            {chatTitles[chat.id] && (
              <Button
                variant="secondary"
                className={`w-full text-left truncate px-4 py-3 ${
                  currentChatId === chat.id
                    ? "bg-[var(--color-accent)]"
                    : "bg-transparent hover:bg-[var(--color-accent)]"
                } text-[var(--color-text-primary)] transition-colors duration-200`}
                onClick={() => setCurrentChat(chat.id)}
              >
                {chatTitles[chat.id]}
              </Button>
            )}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity duration-200"
              onClick={(e) => handleDeleteChat(e, chat.id)}
              title="Eliminar chat"
            >
              <Trash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
