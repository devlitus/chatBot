import { Button } from '../ui/button/Button';
import { Switch } from '../ui/switch/Switch';
import { ChevronLeft } from '../icons/ChevronLeft';
import { Dropdown } from '../ui/dropdown/Dropdown';

interface HeroProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Hero({ toggleSidebar, isSidebarOpen }: HeroProps) {
  return (
    <div className="flex items-center justify-between p-4 text-[var(--color-text-primary)]">
      <Button
        variant="secondary"
        size="sm"
        onClick={toggleSidebar}
        title={isSidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
        className="transition-transform duration-300"
        style={{
          transform: !isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        <ChevronLeft />
      </Button>
      <div className="flex items-center gap-30">
        <Dropdown />
        <Switch />
      </div>
    </div>
  );
}
