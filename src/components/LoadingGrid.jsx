export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="status" aria-label="Cargando obras de arte">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-secondary" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 rounded bg-secondary" />
            <div className="h-3 w-1/2 rounded bg-secondary" />
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando...</span>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse" role="status" aria-label="Cargando contenido">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="aspect-square bg-secondary" />
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-3/4 rounded bg-secondary" />
              <div className="h-4 w-1/2 rounded bg-secondary" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-secondary" />
              <div className="h-4 w-full rounded bg-secondary" />
              <div className="h-4 w-2/3 rounded bg-secondary" />
            </div>
            <div className="h-12 w-40 rounded bg-secondary" />
          </div>
        </div>
      </div>
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
