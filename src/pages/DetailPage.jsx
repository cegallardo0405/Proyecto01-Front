import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { LoadingSkeleton } from "../components/LoadingGrid";
import { useFavorites, useToast } from "../App";

export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchArtwork = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const fields =
          "id,title,artist_display,date_display,medium_display,dimensions,department_title,artwork_type_title,image_id,thumbnail,place_of_origin,credit_line,is_public_domain,style_title,classification_title";
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=${fields}`);
        if (!response.ok) throw new Error("No se pudo cargar la obra de arte");
        const data = await response.json();
        setArtwork(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ha ocurrido un error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  function handleFavoriteClick() {
    if (isFavorite(artwork.id)) {
      removeFavorite(artwork.id);
      showToast("info", "Obra removida de favoritos");
      return;
    }

    addFavorite(artwork);
    showToast("success", "Obra agregada a favoritos");
  }

  if (isLoading) return <LoadingSkeleton />;
  if (error) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }
  if (!artwork) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ErrorState message="Obra no encontrada" />
        </div>
      </div>
    );
  }

  const imageUrl = artwork.image_id ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Volver a la pagina anterior"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a explorar
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-1">
            <div className="sticky top-24">
              {imageUrl ? (
                <div className="art-frame bg-secondary">
                  <img src={imageUrl} alt={artwork.thumbnail?.alt_text || artwork.title} className="h-auto w-full" loading="eager" />
                </div>
              ) : (
                <div className="art-frame flex aspect-square items-center justify-center bg-secondary">
                  <svg className="h-24 w-24 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              {artwork.is_public_domain && <p className="mt-4 text-center text-xs text-muted-foreground">Esta obra es de dominio publico</p>}
            </div>
          </div>

          <div className="order-2">
            {artwork.department_title && <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{artwork.department_title}</span>}
            <h1 className="text-balance mb-4 mt-2 font-serif text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">{artwork.title}</h1>
            <p className="mb-8 text-lg text-muted-foreground">{artwork.artist_display || "Artista desconocido"}</p>

            <button
              onClick={handleFavoriteClick}
              className={`mb-12 inline-flex items-center gap-3 border px-6 py-3 text-sm tracking-wider transition-all duration-200 ${
                isFavorite(artwork.id)
                  ? "border-favorite bg-accent text-accent-foreground"
                  : "border-favorite bg-background-soft hover:bg-background-soft-hover"
                }`}
              aria-pressed={isFavorite(artwork.id)}
            >
              <svg className="h-5 w-5" fill={isFavorite(artwork.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {isFavorite(artwork.id) ? "En favoritos" : "Agregar a favoritos"}
            </button>

            <div className="border-t border-border pt-8">
              <h2 className="mb-6 font-serif text-lg font-medium">Detalles de la obra</h2>
              <dl className="space-y-4">
                {artwork.date_display && (
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Fecha</dt>
                    <dd className="text-sm">{artwork.date_display}</dd>
                  </div>
                )}
                {artwork.medium_display && (
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Medio</dt>
                    <dd className="text-sm">{artwork.medium_display}</dd>
                  </div>
                )}
                {artwork.dimensions && (
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Dimensiones</dt>
                    <dd className="text-sm">{artwork.dimensions}</dd>
                  </div>
                )}
                {artwork.place_of_origin && (
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Lugar de origen</dt>
                    <dd className="text-sm">{artwork.place_of_origin}</dd>
                  </div>
                )}
                {artwork.artwork_type_title && (
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Tipo</dt>
                    <dd className="text-sm">{artwork.artwork_type_title}</dd>
                  </div>
                )}
                {artwork.style_title && (
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Estilo</dt>
                    <dd className="text-sm">{artwork.style_title}</dd>
                  </div>
                )}
                {artwork.classification_title && (
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Clasificacion</dt>
                    <dd className="text-sm">{artwork.classification_title}</dd>
                  </div>
                )}
                {artwork.credit_line && (
                  <div className="flex flex-col border-t border-border pt-4 sm:flex-row sm:gap-4">
                    <dt className="min-w-[140px] text-sm text-muted-foreground">Credito</dt>
                    <dd className="text-sm text-muted-foreground">{artwork.credit_line}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-12 border-t border-border pt-8">
              <a
                href={`https://www.artic.edu/artworks/${artwork.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-elegant inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Ver esta obra en el sitio web del Art Institute of Chicago (abre en nueva ventana)"
              >
                Ver en Art Institute of Chicago
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
