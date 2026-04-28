import { useEffect, useRef } from "react";

export function ConfirmDialog({
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  isDarkPattern = false,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const handleBackdropClick = (e) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (rect) {
      const isInDialog = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!isInDialog) {
        onCancel();
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[200] m-auto w-[calc(100%-2rem)] max-w-md rounded-md bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-foreground/20 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95"
      onClick={handleBackdropClick}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <div className="p-6">
        <h2 id="dialog-title" className="mb-2 font-serif text-xl font-semibold">
          {title}
        </h2>
        <p id="dialog-description" className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {isDarkPattern ? (
            <>
              <button onClick={onConfirm} className="px-3 py-1.5 text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground">
                {confirmText}
              </button>
              <button
                onClick={onCancel}
                className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {cancelText}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onCancel}
                className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {confirmText}
              </button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

