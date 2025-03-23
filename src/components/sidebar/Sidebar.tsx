import { Button } from "../ui/button/Button";
import { Plus } from "../icons/Plus";

interface Chat {
  id: string;
  title: string;
}

export function Sidebar() {
  // Mock data para los chats
  const chats: Chat[] = [
    { id: "1", title: "Chat 1" },
    { id: "2", title: "Chat 2" },
    { id: "3", title: "Chat 3" },
  ];

  return (
    <div className="h-screen  flex flex-col p-4 border-r border-[var(--color-accent)]">
      <Button
        variant="primary"
        className="
        w-full 
        mb-4 
        flex 
        items-center 
        justify-center gap-2  "
      >
        <Plus />
        <span>Nuevo Chat</span>
      </Button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant="secondary"
            className="w-full text-left truncate px-4 py-3 bg-transparent hover:bg-[var(--color-accent)] text-[var(--color-text-primary)] transition-colors duration-200"
          >
            {chat.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
