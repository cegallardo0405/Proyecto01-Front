export function ErrorState({ message = "Ha ocurrido un error al cargar los datos", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20" role="alert" aria-live="polite">
      <div className="mb-6 h-20 w-20 text-destructive">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-full w-full" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-center font-serif text-2xl font-medium">No se pudo cargar la informacion</h2>
      <p className="mb-8 max-w-md text-center text-muted-foreground">{message}</p>

      {onRetry && (
        <button onClick={onRetry} className="bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90">
          Reanudar
        </button>
      )}
    </div>
  );
}

