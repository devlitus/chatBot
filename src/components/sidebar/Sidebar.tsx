import { useChatStore } from '@/stores/chat/chat';
import { useEffect } from 'react';
import { Button } from '../ui/button/Button';
import { Plus } from '../icons/Plus';
import { Trash } from '../icons/Trash';
import { useSupabaseAuth } from '@/hooks/auth/useSupabaseAuth';

export function Sidebar() {
  const { user } = useSupabaseAuth();
  const {
    chats,
    currentChat,
    loadChats,
    createChat,
    deleteChat,
    setCurrentChat
  } = useChatStore();

  useEffect(() => {
    if (user?.id) {
      loadChats(user.id);
    }
  }, [user?.id, loadChats]);

  const handleCreateChat = async () => {
    if (!user?.id) return;
    await createChat('Nuevo Chat', user.id);
  };

  const handleDeleteChat = async (e: React.MouseEvent, chatId: number) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta conversación?')) {
      await deleteChat(chatId);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 border-r border-[var(--color-accent)]">
      <Button
        variant="primary"
        className="w-full mb-4 flex items-center justify-center gap-2"
        onClick={handleCreateChat}
      >
        <Plus />
        <span>Nuevo Chat</span>
      </Button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div key={chat.id} className="group relative">
            <Button
              variant="secondary"
              className={`w-full text-left truncate px-4 py-3 ${
                currentChat?.id === chat.id
                  ? 'bg-[var(--color-accent)]'
                  : 'bg-transparent hover:bg-[var(--color-accent)]'
              } text-[var(--color-text-primary)] transition-colors duration-200`}
              onClick={() => setCurrentChat(chat)}
            >
              {chat.title}
            </Button>
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
