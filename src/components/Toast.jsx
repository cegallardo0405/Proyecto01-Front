import { useEffect, useState } from "react";

export function Toast({ type, message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    if (type === "success") {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (type === "error") {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  const getStyles = () => {
    if (type === "success") return "bg-primary text-primary-foreground";
    if (type === "error") return "bg-destructive text-destructive-foreground";
    return "bg-secondary text-secondary-foreground border border-border";
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-md px-4 py-3 shadow-lg transition-all duration-300 ease-out ${getStyles()} ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      role="alert"
      aria-live="polite"
    >
      <span className="shrink-0">{getIcon()}</span>
      <p className="text-sm font-medium">{message}</p>
      <button onClick={handleClose} className="ml-2 shrink-0 p-1 transition-opacity hover:opacity-70" aria-label="Cerrar notificacion">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer({ children }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2" aria-label="Notificaciones">
      {children}
    </div>
  );
}
