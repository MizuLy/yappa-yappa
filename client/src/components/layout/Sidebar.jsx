import {
  History,
  Home,
  MessageCircle,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    {
      icon: <Home className="w-6 h-6 shrink-0" />,
      label: "Home",
      path: "/home",
    },
    {
      icon: <Search className="w-6 h-6 shrink-0" />,
      label: "Search",
      path: "/search",
    },
    {
      icon: <MessageCircle className="w-6 h-6 shrink-0" />,
      label: "Yap",
      path: "/chat",
    },
    {
      icon: <Users className="w-6 h-6 shrink-0" />,
      label: "Yappers",
      path: "/friend",
    },
    {
      icon: <History className="w-6 h-6 shrink-0" />,
      label: "History",
      path: "/history",
    },
    {
      icon: <TrendingUp className="w-6 h-6 shrink-0" />,
      label: "Trending",
      path: "/trend",
    },
  ];

  return (
    <aside
      className="relative flex flex-col h-screen w-[220px] transition-colors duration-300 select-none shrink-0 px-4 py-6 z-20
      /* Light Mode */
      bg-white/70 border-r border-black/10 text-neutral-900
      /* Dark Mode */
      dark:bg-black/40 dark:border-r dark:border-white/10 dark:text-neutral-100
      backdrop-blur-xl"
    >
      {/* Ambient Lighting Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-36 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-[70px] pointer-events-none" />

      {/* Brand Header */}
      <div className="px-3 mb-8 relative z-10">
        <h1 className="text-2xl font-bungee tracking-wide text-indigo-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-200 dark:to-indigo-300">
          Yappa Yappa
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5 px-1 relative z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                isActive
                  ? /* Active State */
                    "bg-indigo-600/10 text-indigo-600 border border-indigo-500/20 font-semibold shadow-sm " +
                    "dark:bg-white/[0.08] dark:text-white dark:border-white/15 dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
                  : /* Inactive Hover State */
                    "text-neutral-600 hover:text-black hover:bg-black/5 " +
                    "dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/[0.04] border border-transparent"
              }`
            }
          >
            {/* Group icon and text together */}
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>

            {/* Active Indicator Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-[.active]:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
