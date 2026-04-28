import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] md:min-h-screen flex items-center justify-center bg-background px-4 py-4 md:py-6 overflow-x-hidden">
      {/* Museum Wall Background */}
      <div className="relative">
        {/* Spotlight effect */}
        <div 
          className="absolute -inset-20 bg-gradient-radial from-accent/20 via-transparent to-transparent opacity-60 pointer-events-none"
          aria-hidden="true"
        />
        
        {/* Picture Frame - Contemporary Style */}
        <div className="relative">
          {/* Outer Frame - Dark wood effect */}
          <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 shadow-2xl" />
          
          {/* Frame Bevel - Gold accent */}
          <div className="absolute -inset-3 sm:-inset-5 bg-gradient-to-br from-amber-700/80 via-amber-600/60 to-amber-800/80" />
          
          {/* Inner Frame Border */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950" />
          
          {/* Mat/Passepartout */}
          <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-br from-stone-100 via-white to-stone-50" />
          
          {/* The "Canvas" - The actual artwork */}
          <div 
            className="relative bg-gradient-to-br from-stone-50 via-white to-stone-100 w-[min(90vw,760px)] aspect-[4/5] sm:aspect-[3/2] lg:aspect-[16/9] px-4 sm:px-8 md:px-10 py-4 sm:py-6"
            role="img"
            aria-label="Obra de arte conceptual: Página no encontrada"
          >
            {/* Canvas texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
              aria-hidden="true"
            />
            
            {/* Artwork Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="grid w-full max-w-2xl grid-cols-1 items-center gap-4 sm:gap-6">
                <div className="flex justify-center">
                  <span 
                    className="font-serif text-[56px] sm:text-[72px] md:text-[88px] lg:text-[120px] font-extralight leading-none tracking-tighter bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-400 bg-clip-text text-transparent select-none"
                    aria-hidden="true"
                  >
                    404
                  </span>
                </div>

                <div className="text-center">
                  <div className="mb-2 mt-1 flex items-center justify-center gap-3 sm:mb-3 sm:gap-4" aria-hidden="true">
                    <div className="w-8 sm:w-12 h-px bg-neutral-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-amber-600/60" />
                    <div className="w-8 sm:w-12 h-px bg-neutral-300" />
                  </div>

                  <h1 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide text-neutral-800 mb-2 italic">
                    &ldquo;Ausencia&rdquo;
                  </h1>
                  <p className="text-[9px] sm:text-[10px] lg:text-xs text-neutral-500 uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-1">
                    Concepto digital sobre vacio
                  </p>
                  <p className="text-[9px] sm:text-[10px] lg:text-xs text-neutral-400 tracking-wider mb-2 sm:mb-3">
                    Artista Desconocido, XXXX
                  </p>
                  <p className="mx-auto max-w-sm font-serif text-[11px] text-neutral-600 leading-relaxed text-pretty sm:text-xs lg:text-sm">
                    Esta pieza explora la experiencia de buscar algo que ya no existe, un espacio digital que alguna vez pudo haber sido.
                  </p>

                  <div className="mt-3 flex w-full justify-center sm:mt-4">
                    <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
                      <Link
                        to="/"
                        className="inline-flex items-center justify-center px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-700 border border-neutral-300/80 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
                      >
                        Inicio
                      </Link>
                      <Link
                        to="/explorar"
                        className="inline-flex items-center justify-center px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-neutral-700 border border-neutral-300/80 hover:border-neutral-500 hover:text-neutral-900 transition-colors"
                      >
                        Explorar Obras
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle floor shadow */}
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-t from-neutral-200/30 to-transparent blur-xl rounded-full"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
