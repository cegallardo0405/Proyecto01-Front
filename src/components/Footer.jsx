import { NavLink } from "react-router-dom";
import { GalleryLogo } from "./GalleryLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          <div className="md:col-span-2">
            <NavLink to="/" className="mb-4 flex items-center gap-3">
              <GalleryLogo className="h-8 w-8" />
              <span className="font-serif text-xl font-semibold tracking-tight">ARTIC</span>
            </NavLink>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Explorando la belleza del arte a través de la colección del Art Institute of Chicago. Una ventana al
              patrimonio artístico de la humanidad.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest">Navegacion</h3>
            <nav aria-label="Navegacion del pie de pagina">
              <ul className="space-y-3">
                <li>
                  <NavLink to="/" className="link-elegant text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/explorar"
                    className="link-elegant text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Explorar Colección
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/favoritos"
                    className="link-elegant text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Mis Favoritos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contacto"
                    className="link-elegant text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contacto
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest">Informacion</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.artic.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-elegant transition-colors hover:text-foreground"
                  aria-label="Visitar Art Institute of Chicago (abre en nueva ventana)"
                >
                  Art Institute of Chicago
                </a>
              </li>
              <li>
                <a
                  href="https://api.artic.edu/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-elegant transition-colors hover:text-foreground"
                  aria-label="Ver documentacion de la API (abre en nueva ventana)"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">{currentYear} Galeráa ARTIC. Proyecto educativo.</p>
            <p className="text-xs text-muted-foreground">Datos proporcionados por la API del Art Institute of Chicago</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
