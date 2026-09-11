import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="flex items-center gap-2 p-4 rounded-full text-xs font-medium transition-all duration-200 text-neutral-800 hover:bg-white shadow-sm dark:text-white dark:hover:bg-white/15"
    >
      {isDark ? (
        <>
          <Moon className="w-4 h-4 text-indigo-400" />
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 text-amber-500" />
        </>
      )}
    </button>
  );
}
