export function GlassCard() {
  return (
    <div
      className="p-6 rounded-2xl transition-all duration-300
      /* Light Mode */
      bg-white/80 border border-black/10 text-neutral-900 shadow-xl shadow-indigo-500/5
      /* Dark Mode */
      dark:bg-white/[0.03] dark:border-white/10 dark:text-neutral-100 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
      backdrop-blur-xl"
    >
      <h3 className="text-xl font-semibold tracking-tight">
        Glassmorphic Card
      </h3>

      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Seamlessly adapts between dark obsidian glass and clean white light
        mode.
      </p>

      <button
        className="mt-5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
        /* Indigo Accent Button */
        bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-600 border border-indigo-500/20
        dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 dark:text-indigo-300 dark:border-indigo-400/30
        active:scale-[0.98]"
      >
        Interact
      </button>
    </div>
  );
}
