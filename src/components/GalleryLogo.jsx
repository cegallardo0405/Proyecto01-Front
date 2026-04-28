export function GalleryLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logo de Galeria ARTIC"
    >
      <rect x="2" y="2" width="44" height="44" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <circle cx="18" cy="20" r="6" fill="currentColor" opacity="0.9" />
      <rect x="26" y="14" width="10" height="14" fill="currentColor" opacity="0.6" />
      <line x1="10" y1="36" x2="38" y2="36" stroke="currentColor" strokeWidth="1" />
      <rect x="14" y="30" width="8" height="6" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
