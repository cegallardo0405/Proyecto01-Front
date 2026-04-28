import { NavLink } from "react-router-dom";
import { useState } from "react";
import { GalleryLogo } from "./GalleryLogo";

export function Navbar({ favoritesCount }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `link-elegant text-sm tracking-widest uppercase transition-colors ${
      isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background-soft backdrop-blur-sm">
      <nav className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Navegacion principal">
        <div className="flex h-16 items-center justify-between md:h-20">
          <NavLink to="/" className="group flex items-center gap-3" aria-label="Ir al inicio - Galeria ARTIC">
            <GalleryLogo className="h-8 w-8 transition-transform group-hover:scale-105 md:h-10 md:w-10" />
            <span className="font-serif text-lg font-semibold tracking-tight md:text-xl">ARTIC</span>
          </NavLink>

          <div className="hidden items-center gap-8 md:flex">
            <NavLink to="/explorar" className={navLinkClass}>
              Explorar
            </NavLink>
            <NavLink to="/favoritos" className={navLinkClass}>
              <span className="flex items-center gap-2">
                Favoritos
                {favoritesCount > 0 && (
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
                    aria-label={`${favoritesCount} obras en favoritos`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </span>
            </NavLink>
            <NavLink to="/contacto" className={navLinkClass}>
              Contacto
            </NavLink>
          </div>

          <button
            type="button"
            className="p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <NavLink to="/" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                Inicio
              </NavLink>
              <NavLink to="/explorar" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                Explorar
              </NavLink>
              <NavLink to="/favoritos" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center gap-2">
                  Favoritos
                  {favoritesCount > 0 && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {favoritesCount}
                    </span>
                  )}
                </span>
              </NavLink>
              <NavLink to="/contacto" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
                Contacto
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

