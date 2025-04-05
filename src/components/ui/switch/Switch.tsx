import { useThemeStore } from '../../../stores/theme/theme';
import { Moon } from '../../icons/Moon';
import { Sun } from '../../icons/Sun';

export function Switch() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      className={`
        flex items-center justify-center p-2 rounded-full
        transition-all duration-200
        ${
          isDark
            ? 'bg-[var(--color-primary)] text-[var(--color-light)] hover:bg-[var(--color-primary)]'
            : 'bg-[var(--color-primary)] text-[var(--color-text-light)] hover:bg-[var(--color-accent)]'
        }
      `}
      onClick={toggleTheme}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? <Moon /> : <Sun />}
    </button>
  );
}
