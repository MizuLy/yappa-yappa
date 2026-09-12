import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const currentUser = user?.user || user?.data || user || {};

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          {currentUser.name || "Profile"}
        </h1>
        {currentUser.email && (
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {currentUser.email}
          </p>
        )}
      </div>
    </div>
  );
}
