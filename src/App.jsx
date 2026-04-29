import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Toast, ToastContainer } from "./components/Toast";
import { ContactPage } from "./pages/ContactPage";
import { DetailPage } from "./pages/DetailPage";
import { ExplorePage } from "./pages/ExplorePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const FavoritesContext = createContext(null);
export const ToastContext = createContext(null);
export const ConfirmDialogContext = createContext(null);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) throw new Error("useConfirmDialog must be used within ConfirmDialogProvider");
  return context;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [confirmOptions, setConfirmOptions] = useState(null);

  const addFavorite = useCallback((artwork) => {
    setFavorites((prev) => (prev.some((f) => f.id === artwork.id) ? prev : [...prev, artwork]));
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorite = useCallback((id) => favorites.some((f) => f.id === id), [favorites]);

  const showToast = useCallback((type, message) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showConfirm = useCallback((options) => {
    setConfirmOptions(options);
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmOptions(null);
  }, []);

  function handleConfirm() {
    confirmOptions.onConfirm();
    closeConfirm();
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
        <ToastContext.Provider value={{ showToast }}>
          <ConfirmDialogContext.Provider value={{ showConfirm }}>
            <div className="flex min-h-screen flex-col">
              <Navbar favoritesCount={favorites.length} />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explorar" element={<ExplorePage />} />
                  <Route path="/obra/:id" element={<DetailPage />} />
                  <Route path="/favoritos" element={<FavoritesPage />} />
                  <Route path="/contacto" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>

            <ToastContainer>
              {toasts.map((toast) => (
                <Toast key={toast.id} type={toast.type} message={toast.message} onClose={() => removeToast(toast.id)} />
              ))}
            </ToastContainer>

            {confirmOptions && (
              <ConfirmDialog
                title={confirmOptions.title}
                message={confirmOptions.message}
                confirmText={confirmOptions.confirmText}
                cancelText={confirmOptions.cancelText}
                onConfirm={handleConfirm}
                onCancel={closeConfirm}
                isDarkPattern={confirmOptions.isDarkPattern}
              />
            )}
          </ConfirmDialogContext.Provider>
        </ToastContext.Provider>
      </FavoritesContext.Provider>
    </BrowserRouter>
  );
}
