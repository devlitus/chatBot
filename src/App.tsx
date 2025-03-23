import { Chat } from "@/components/chat/Chat";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useThemeStore } from "@/stores/theme";
import "@/styles/theme.css";
import { useEffect } from "react";

export function App() {
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="flex h-svh ">
      <aside className="w-[280px] min-w-[280px] bg-[var(--color-surface)]">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col h-full bg-[var(--color-surface)]">
        <header className="w-full">
          <Hero />
        </header>

        <main className="flex-1 overflow-auto bg-[var(--color-surface)]">
          <Chat />
        </main>

        <footer className="w-full bg-[var(--color-surface)]">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
