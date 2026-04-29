import { useEffect, useState } from "react";
import { ArtworkCard } from "../components/ArtworkCard";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingGrid } from "../components/LoadingGrid";

const DEPARTMENTS = [
  { label: "All", value: null },
  { label: "Painting and Sculpture of Europe", value: "Painting and Sculpture of Europe" },
  { label: "American Art", value: "American Art" },
  { label: "Arts of Asia", value: "Arts of Asia" },
  { label: "Photography and Media", value: "Photography and Media" },
  { label: "Prints and Drawings", value: "Prints and Drawings" },
  { label: "Modern and Contemporary Art", value: "Contemporary Art" },
  { label: "Textiles", value: "Textiles" },
  { label: "Arts of Africa", value: "Arts of Africa" },
  { label: "Architecture and Design", value: "Architecture and Design" },
];

export function ExplorePage() {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  async function fetchArtworks(page = 1) {
    setIsLoading(true);
    setError(null);

    try {
      const fields =
        "id,title,artist_display,date_display,medium_display,dimensions,department_title,artwork_type_title,image_id,thumbnail,place_of_origin,credit_line,is_public_domain,style_title,classification_title";
      const cleanQuery = searchQuery.trim();
      const shouldUseSearch = Boolean(cleanQuery || selectedDepartment);
      const endpoint = shouldUseSearch ? "https://api.artic.edu/api/v1/artworks/search" : "https://api.artic.edu/api/v1/artworks";
      const params = new URLSearchParams({
        fields,
        limit: "12",
        page: String(page),
      });

      if (shouldUseSearch) {
        params.set("q", cleanQuery || "*");
      }
      if (selectedDepartment) {
        params.set("query[match][department_title]", selectedDepartment);
      }

      const response = await fetch(`${endpoint}?${params.toString()}`);
      if (!response.ok) throw new Error("Error al cargar las obras de arte");
      const data = await response.json();

      setArtworks(data.data || []);
      setTotalPages(data.pagination?.total_pages || 1);
      setTotalResults(data.pagination?.total || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ha ocurrido un error");
      setArtworks([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setCurrentPage(1);
    fetchArtworks(1);
  }

  function clearDepartmentFilter() {
    setSelectedDepartment(null);
    setCurrentPage(1);
  }

  function changeDepartmentFilter(value) {
    setSelectedDepartment(value);
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage((p) => p - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToNextPage() {
    setCurrentPage((p) => p + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToPage(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    fetchArtworks(currentPage);
  }, [currentPage, selectedDepartment]);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Coleccion</span>
            <h1 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">Explorar Obras</h1>
            <p className="text-pretty mx-auto mt-4 max-w-2xl text-muted-foreground">
              Descubre obras maestras de todas las epocas y culturas. Busca por titulo, artista o palabra clave.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="mx-auto max-w-2xl" role="search">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <label htmlFor="search-input" className="sr-only">
                  Buscar obras de arte
                </label>
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por titulo, artista..."
                  className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                className="bg-primary px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
                aria-label="Buscar"
              >
                Buscar
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="sr-only">Filtrar por departamento:</span>
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.label}
                onClick={() => changeDepartmentFilter(dept.value)}
                className={`border px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                  selectedDepartment === dept.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
                aria-pressed={selectedDepartment === dept.value}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!isLoading && !error && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mostrando <span className="font-medium text-foreground">{artworks.length}</span> de{" "}
                <span className="font-medium text-foreground">{totalResults.toLocaleString()}</span> resultados
              </p>
              {selectedDepartment && (
                <button
                  onClick={clearDepartmentFilter}
                  className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Limpiar filtro
                </button>
              )}
            </div>
          )}

          {isLoading && <LoadingGrid />}
          {error && !isLoading && <ErrorState message={error} onRetry={() => fetchArtworks(currentPage)} />}
          {!isLoading && !error && artworks.length === 0 && (
            <EmptyState
              title="No se encontraron obras"
              message={
                searchQuery
                  ? `No hay resultados para "${searchQuery}". Intenta con otros terminos.`
                  : "No hay obras disponibles con los filtros seleccionados."
              }
            />
          )}

          {!isLoading && !error && artworks.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {artworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginacion">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="border border-border p-2 transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Pagina anterior"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (currentPage <= 3) pageNum = i + 1;
                      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = currentPage - 2 + i;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`h-10 w-10 border text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:bg-secondary"
                          }`}
                          aria-label={`Ir a pagina ${pageNum}`}
                          aria-current={currentPage === pageNum ? "page" : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="border border-border p-2 transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Pagina siguiente"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
