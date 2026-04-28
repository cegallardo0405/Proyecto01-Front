import { useMemo, useState } from "react";
import { useConfirmDialog, useToast } from "../App";

export function ContactPage() {
  const { showToast } = useToast();
  const { showConfirm } = useConfirmDialog();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = useMemo(() => {
    const newErrors = {};
    if (formData.name.trim().length > 0 && formData.name.trim().length < 3) newErrors.name = "El nombre debe tener al menos 3 caracteres";
    if (formData.email.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Ingresa un correo electronico valido";
    if (formData.message.trim().length > 0 && formData.message.trim().length < 10)
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    return newErrors;
  }, [formData]);

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.message.trim().length >= 10 &&
      Object.keys(errors).length === 0
    );
  }, [formData, errors]);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Comunicate</span>
            <h1 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">Contacto</h1>
            <p className="text-pretty mx-auto mt-4 max-w-2xl text-muted-foreground">
              ¿Tienes alguna pregunta o sugerencia? Nos encantaria escucharte. Completa el formulario y te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isFormValid) {
                showToast("error", "Por favor completa todos los campos correctamente");
                return;
              }
              showConfirm({
                title: "Enviar mensaje",
                message: `¿Deseas enviar tu mensaje? Te responderemos a ${formData.email}`,
                confirmText: "Enviar",
                cancelText: "Revisar",
                onConfirm: async () => {
                  setIsSubmitting(true);
                  await new Promise((resolve) => setTimeout(resolve, 1500));
                  showToast("success", "Mensaje enviado correctamente");
                  setFormData({ name: "", email: "", message: "" });
                  setTouched({});
                  setIsSubmitting(false);
                },
              });
            }}
            noValidate
          >
            <div className="mb-6">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                onBlur={(e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }))}
                placeholder="Tu nombre completo"
                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                aria-invalid={errors.name && touched.name ? "true" : undefined}
                className={`w-full border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.name && touched.name ? "border-destructive" : "border-border focus:border-foreground"
                }`}
              />
              {errors.name && touched.name && (
                <p id="name-error" className="mt-2 text-sm text-destructive" role="alert">
                  {errors.name}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">El nombre debe tener al menos 3 caracteres</p>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Correo electronico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                onBlur={(e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }))}
                placeholder="tu@correo.com"
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                aria-invalid={errors.email && touched.email ? "true" : undefined}
                className={`w-full border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.email && touched.email ? "border-destructive" : "border-border focus:border-foreground"
                }`}
              />
              {errors.email && touched.email && (
                <p id="email-error" className="mt-2 text-sm text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">Ingresa un correo valido donde podamos responderte</p>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                onBlur={(e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }))}
                placeholder="Escribe tu mensaje aqui..."
                rows={5}
                aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                aria-invalid={errors.message && touched.message ? "true" : undefined}
                className={`w-full resize-none border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.message && touched.message ? "border-destructive" : "border-border focus:border-foreground"
                }`}
              />
              {errors.message && touched.message && (
                <p id="message-error" className="mt-2 text-sm text-destructive" role="alert">
                  {errors.message}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">El mensaje debe tener al menos 10 caracteres</p>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </form>

          <div className="mt-12 border-t border-border pt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-widest">Ubicacion</h3>
                <p className="text-sm text-muted-foreground">
                  111 S Michigan Ave
                  <br />
                  Chicago, IL 60603
                  <br />
                  Estados Unidos
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-serif text-sm font-semibold uppercase tracking-widest">Horarios</h3>
                <p className="text-sm text-muted-foreground">
                  Lunes - Miercoles: 11am - 5pm
                  <br />
                  Jueves - Domingo: 11am - 8pm
                  <br />
                  Martes: Cerrado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
