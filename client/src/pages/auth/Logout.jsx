import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Loader2, UserRound, X } from "lucide-react";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef(null);
  const { user } = useAuth();

  const currentUser = user?.user || user?.data || user || {};
  const displayName = currentUser.name || currentUser.username || "Yapper";
  const avatarUrl =
    currentUser.imageUrl || currentUser.avatar || currentUser.avatarUrl;
  const userInitial = displayName[0]?.toUpperCase() || "Y";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (err) {
      console.warn("Logout failed on server, redirecting anyway:", err);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutConfirmOpen(false);
      navigate("/login");
    }
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="flex items-center gap-2 rounded-full p-1.5 pr-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Open profile menu"
          aria-expanded={isOpen}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-500 dark:text-indigo-400 text-xs shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{userInitial}</span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-12 z-30 min-w-48 overflow-hidden rounded-xl border border-black/10 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl">
            <div className="border-b border-black/5 px-3 py-2.5 dark:border-white/10">
              <p className="truncate text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {displayName}
              </p>
              <p className="text-[11px] text-neutral-500">Account menu</p>
            </div>
            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-xs text-neutral-700 hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/10"
            >
              <UserRound className="w-4 h-4" />
              Profile
            </NavLink>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsLogoutConfirmOpen(true);
              }}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs text-red-500 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Centered Modal Overlay via React Portal */}
      {isLogoutConfirmOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-100">
                  Log Out
                </h3>
                <button
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  disabled={isLoggingOut}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">
                Are you sure you want to log out of your account?
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  disabled={isLoggingOut}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-red-600/20"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
