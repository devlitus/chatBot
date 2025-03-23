import { Button } from "../ui/button/Button";
import { Switch } from "../ui/switch/Switch";
import { ChevronLeft } from "../icons/ChevronLeft";
import { Dropdown } from "../ui/dropdown/Dropdown";

export function Hero() {
  return (
    <div className="flex items-center justify-between p-4  text-[var(--color-text-primary)]">
      <Button variant="secondary" size="sm">
        <ChevronLeft />
      </Button>
      <div className="flex items-center gap-4">
        <Dropdown />
        <Switch />
      </div>
    </div>
  );
}
