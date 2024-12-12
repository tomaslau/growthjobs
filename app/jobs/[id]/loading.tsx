export default function JobLoading() {
  return (
    <main className="container py-6">
      <article className="max-w-[700px]">
        <div className="mb-8">
          {/* Title skeleton */}
          <div className="h-8 bg-gray-200 rounded-lg w-2/3 mb-2 animate-pulse" />

          {/* Job meta info skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
            <span>•</span>
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
            <span>•</span>
            <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
            <span>•</span>
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
        </div>

        {/* Salary range skeleton */}
        <div className="mb-8">
          <div className="h-6 bg-gray-200 rounded w-28 mb-2 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-36 animate-pulse" />
        </div>

        {/* Description skeleton */}
        <div>
          <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          </div>
        </div>

        {/* Apply button skeleton */}
        <div className="mt-8">
          <div className="h-9 bg-gray-200 rounded-lg w-36 animate-pulse" />
        </div>
      </article>
    </main>
  );
}
