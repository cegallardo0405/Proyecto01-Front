import { Link } from "react-router-dom";

export function EmptyState({ title = "No hay elementos", message = "No se encontraron elementos para mostrar.", showExploreLink = false }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20" role="status" aria-label={title}>
      <div className="mb-6 h-24 w-24 text-muted-foreground/30">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-full w-full" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.75}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>

      <h2 className="mb-2 text-center font-serif text-2xl font-medium">{title}</h2>
      <p className="mb-8 max-w-md text-center text-muted-foreground">{message}</p>

      {showExploreLink && (
        <Link
          to="/explorar"
          className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explorar coleccion
        </Link>
      )}
    </div>
  );
}

