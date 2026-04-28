import { Link } from "react-router-dom";
import { useFavorites, useToast } from "../App";

export function ArtworkCard({ artwork }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();
  const imageUrl = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg` : null;

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(artwork.id)) {
      removeFavorite(artwork.id);
      showToast("info", "Obra removida de favoritos");
    } else {
      addFavorite(artwork);
      showToast("success", "Obra agregada a favoritos");
    }
  };

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
            onClick={handleFavoriteToggle}
            className={`absolute right-3 top-3 border border-border bg-background-soft p-2 backdrop-blur-sm transition-all duration-200 hover:bg-background-soft-hover ${
              isFavorite(artwork.id) ? "text-accent" : "text-muted-foreground"
            }`}
            aria-label={
              isFavorite(artwork.id) ? `Quitar ${artwork.title} de favoritos` : `Agregar ${artwork.title} a favoritos`
            }
          >
            <svg className="h-5 w-5" fill={isFavorite(artwork.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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

