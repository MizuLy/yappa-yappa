import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import ThemeToggle from "../ThemeToggle";
import Logout from "../../pages/auth/Logout";

export default function MainLayout() {
  const location = useLocation();

  // Helper to display current section title based on route
  const getPageTitle = (path) => {
    switch (path) {
      case "/home":
        return "Home Feed";
      case "/search":
        return "Explore & Search";
      case "/chat":
        return "Yaps & Messages";
      case "/friend":
        return "Community Yappers";
      case "/history":
        return "Activity History";
      case "/trend":
        return "Trending Topics";
      default:
        return "Yappa Yappa";
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-100 dark:bg-[#050508] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Fixed Left Navigation */}
      <Sidebar />

      {/* Main Content Area with Contextual Sticky Header */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto">
        {/* Subtle Sticky Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-white/40 dark:bg-black/20 border-b border-black/5 dark:border-white/5">
          <h2 className="text-base font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
            {getPageTitle(location.pathname)}
          </h2>

          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <ThemeToggle />
            <Logout />
          </div>
        </header>

        {/* Page Content Rendered via Outlet */}
        <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
