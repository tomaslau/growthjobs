export default function Loading() {
  return (
    <main className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Jobs</h1>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse p-6 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
