import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function HomePage() {
  const [featuredArt, setFeaturedArt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch("https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,image_id&limit=3&page=1");
        const data = await response.json();
        setFeaturedArt((data.data || []).filter((art) => art.image_id));
      } catch (error) {
        console.error("Error fetching featured art:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const getImageUrl = (imageId) => `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-secondary">
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-center">
            <div className="h-px w-12 bg-border" />
            <span className="mx-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Art Institute of Chicago</span>
            <div className="h-px w-12 bg-border" />
          </div>
          <h1 className="text-balance mb-6 font-serif text-5xl font-light tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Donde el Arte
            <br />
            <span className="font-semibold italic">Cobra Vida</span>
          </h1>
          <p className="text-pretty mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Explora mas de 300,000 obras de arte de todas las epocas y culturas. Una coleccion que trasciende el tiempo
            y el espacio.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/explorar"
              className="inline-flex min-w-[200px] items-center justify-center bg-primary px-8 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-primary/90"
            >
              Explorar Coleccion
            </Link>
            <Link
              to="/contacto"
              className="inline-flex min-w-[200px] items-center justify-center border border-primary px-8 py-4 text-sm uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Destacados</span>
            <h2 className="mt-4 font-serif text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">Obras Maestras</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] animate-pulse bg-secondary" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {featuredArt.slice(0, 3).map((artwork) => (
                <Link key={artwork.id} to={`/obra/${artwork.id}`} className="group block">
                  <article className="relative overflow-hidden">
                    <div className="aspect-[3/4] overflow-hidden bg-secondary">
                      {artwork.image_id && (
                        <img
                          src={getImageUrl(artwork.image_id)}
                          alt={artwork.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="line-clamp-2 font-serif text-lg font-medium transition-colors group-hover:text-accent">{artwork.title}</h3>
                      <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{artwork.artist_display || "Artista desconocido"}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              to="/explorar"
              className="link-elegant inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Ver toda la coleccion
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <blockquote>
            <p className="text-balance font-serif text-2xl font-light italic leading-relaxed sm:text-3xl md:text-4xl">
              {"\""}El arte no es lo que ves, sino lo que haces ver a los demas.{"\""}
            </p>
            <footer className="mt-8">
              <cite className="text-sm uppercase tracking-widest text-muted-foreground not-italic">— Edgar Degas</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="bg-background py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
            {[
              { number: "300K+", label: "Obras de Arte" },
              { number: "5000+", label: "Anos de Historia" },
              { number: "80+", label: "Galerias" },
              { number: "1879", label: "Ano de Fundacion" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">{stat.number}</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

