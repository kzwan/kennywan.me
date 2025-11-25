export default function Loading() {
    return (
      <div className="animate-pulse space-y-8">
        <div className="text-center space-y-4">
          <div className="h-4 bg-gray-800 rounded w-24 mx-auto"></div>
          <div className="h-10 bg-gray-800 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>
    )
  }