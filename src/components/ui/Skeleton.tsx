export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div
    className={`bg-ink/10 rounded animate-pulse ${className}`}
  />
)

export const RecipeCardSkeleton = () => (
  <div className="adventure-card overflow-hidden">
    <Skeleton className="h-40 w-full rounded-none" />
    <div className="p-3 space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-full" />
    </div>
  </div>
)

export const RecipeDetailSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-56 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
    </div>
    <div className="adventure-card p-4 space-y-2">
      <Skeleton className="h-6 w-1/2 mb-3" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  </div>
)