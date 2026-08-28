function StateBlock({ type, message, onRetry }) {
  if (type === "loading") {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="h-48 rounded-lg bg-slate-200" />

            <div className="mt-4 h-5 rounded bg-slate-200" />

            <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />

            <div className="mt-4 h-5 w-1/3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="font-display text-xl font-bold text-red-700">
          Something went wrong
        </h2>

        <p className="mt-2 text-red-600">
          {message || "We couldn't load the products."}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="font-display text-xl font-bold text-slate-900">
          No products found
        </h2>

        <p className="mt-2 text-slate-600">
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return null;
}

export default StateBlock;