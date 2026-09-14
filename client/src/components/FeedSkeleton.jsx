export default function FeedSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-pulse">
      {/* Create Post Input Card Skeleton */}
      <div className="p-4 rounded-2xl bg-white/70 dark:bg-neutral-900/80 border border-black/10 dark:border-neutral-800 backdrop-blur-xl shadow-sm">
        {/* Input Area Placeholder */}
        <div className="h-16 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl mb-3" />

        {/* Action Bar Placeholder */}
        <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-neutral-800">
          <div className="h-7 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
        </div>
      </div>

      {/* Feed List Skeletons */}
      <div className="space-y-3">
        {[1, 2, 3].map((index) => (
          <article
            key={index}
            className="p-5 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-black/10 dark:border-neutral-800/80 shadow-sm space-y-3"
          >
            {/* Author Header Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0" />
                <div className="space-y-1.5">
                  {/* Name */}
                  <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  {/* Username */}
                  <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                </div>
              </div>
              {/* Date */}
              <div className="h-3 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            </div>

            {/* Post Content Lines */}
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              <div className="h-3.5 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            </div>

            {/* Media Image Placeholder (Shown on second item for layout variety) */}
            {index === 2 && (
              <div className="h-52 w-full bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
            )}

            {/* Footer Action Buttons Skeleton */}
            <div className="flex items-center gap-8 pt-3 border-t border-black/5 dark:border-neutral-800/60">
              <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              <div className="h-4 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-800 rounded-md ml-auto" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
