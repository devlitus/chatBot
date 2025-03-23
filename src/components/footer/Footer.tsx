import { Button } from "../ui/button/Button";
import { Upload } from "../icons/Upload";
import { Send } from "../icons/Send";

export function Footer() {
  return (
    <div className="max-w-[1280px] mx-auto flex items-center gap-4 p-4 ">
      <Button variant="primary" className="flex items-center gap-2">
        <Upload />
      </Button>

      <div className="flex-1 relative">
        <input
          type="text"
          className="w-full  text-[var(--color-text-primary)] px-4 py-2 pr-12 border border-[var(--color-accent)] rounded-2xl"
          placeholder="Escribe un mensaje..."
        />
        <Button
          variant="secondary"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
