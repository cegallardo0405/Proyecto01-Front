import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { useConfirmDialog, useFavorites, useToast } from "../App";

function FavoriteCard({ artwork }) {
  const { removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const { showConfirm } = useConfirmDialog();
  const imageUrl = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg` : null;

  return (
    <article className="group relative">
      <Link to={`/obra/${artwork.id}`} className="block">
        <div className="art-frame relative aspect-[3/4] overflow-hidden bg-secondary">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artwork.thumbnail?.alt_text || artwork.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-16 w-16 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              showConfirm({
                title: "Quitar de favoritos",
                message: `¿Estas seguro de que deseas quitar "${artwork.title}" de tu coleccion de favoritos?`,
                confirmText: "Si, quitar",
                cancelText: "No, mantener en favoritos",
                isDarkPattern: true, // Resalta la acción de mantener en favoritos para evitar que el usuario la quite
                onConfirm: () => {
                  removeFavorite(artwork.id);
                  showToast("info", "Obra removida de favoritos");
                },
              });
            }}
            className="absolute right-3 top-3 bg-background-soft p-2 text-accent backdrop-blur-sm transition-all duration-200 hover:bg-background-soft-hover"
            aria-label={`Quitar ${artwork.title} de favoritos`}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <h3 className="line-clamp-2 font-serif text-base font-medium leading-tight transition-colors group-hover:text-accent">{artwork.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{artwork.artist_display || "Artista desconocido"}</p>
          {artwork.date_display && <p className="mt-1 text-xs text-muted-foreground/70">{artwork.date_display}</p>}
        </div>
      </Link>
    </article>
  );
}

export function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Mi Coleccion</span>
            <h1 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">Mis Favoritos</h1>
            <p className="text-pretty mx-auto mt-4 max-w-2xl text-muted-foreground">
              {favorites.length > 0
                ? `Has guardado ${favorites.length} ${favorites.length === 1 ? "obra" : "obras"} en tu coleccion personal.`
                : "Aqui apareceran las obras que marques como favoritas."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {favorites.length === 0 ? (
            <EmptyState
              title="No tienes favoritos guardados"
              message="Explora la coleccion y agrega obras a tu lista de favoritos haciendo clic en el corazon."
              showExploreLink
            />
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{favorites.length}</span>{" "}
                  {favorites.length === 1 ? "obra guardada" : "obras guardadas"}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favorites.map((artwork) => (
                  <FavoriteCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
