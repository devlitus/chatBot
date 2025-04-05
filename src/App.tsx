import { useEffect, useState } from 'react';
import { Chat } from '@/components/chat/Chat';
import { Footer } from '@/components/footer/Footer';
import { Hero } from '@/components/hero/Hero';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useThemeStore } from '@/stores/theme/theme';
import '@/styles/theme.css';

export function App() {
  const isDark = useThemeStore((state) => state.isDark);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="flex h-svh ">
      <aside
        role="complementary"
        className={`transition-all duration-300 ease-in-out bg-[var(--color-surface)] ${
          isSidebarOpen
            ? 'w-[280px] min-w-[280px]'
            : 'w-0 min-w-0 overflow-hidden'
        }`}
      >
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col h-full bg-[var(--color-surface)]">
        <header className="w-full">
          <Hero
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
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
