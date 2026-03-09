import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, GraduationCap, Users, Headphones, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const POPUP_DELAY_MS = 20_000;

const ArticlePopup = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    phone: "",
    contactPerson: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const currentPath = window.location.pathname;

      const response = await fetch("/api/send-contact-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.contactPerson?.split(" ")[0] || "",
          lastName: formData.contactPerson?.split(" ").slice(1).join(" ") || "",
          name: formData.contactPerson || "(nicht angegeben)",
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: `[Popup-Anfrage von ${currentPath}] Interesse an Copilot-Training & Projektbegleitung.`,
          trainingSource: currentPath,
        }),
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Server-Antwort konnte nicht verarbeitet werden.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Fehler beim Versenden der Anfrage");
      }

      toast({
        title: "Vielen Dank!",
        description: "Wir melden uns zeitnah bei Ihnen.",
      });

      handleClose();
    } catch (error) {
      toast({
        title: "Fehler",
        description:
          error instanceof Error
            ? error.message
            : "Bitte versuchen Sie es später erneut oder schreiben Sie an info@copilotenschule.de",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
          aria-label="Schließen"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 dark:from-primary/20 dark:via-blue-950/30 dark:to-purple-950/30 p-6 pb-4 rounded-t-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary/15 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
              Copilotenschule
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Copilot richtig einführen – nicht nur lizenzieren
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Die Lizenz allein bringt keine Produktivität. Wir helfen Ihnen, das volle Potenzial zu heben.
          </p>
        </div>

        {/* Leistungen */}
        <div className="px-6 pt-4 pb-2">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30">
              <GraduationCap className="w-6 h-6 text-blue-600 mb-1.5" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Praxisnahe Trainings</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30">
              <Users className="w-6 h-6 text-purple-600 mb-1.5" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Projekt­begleitung</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-green-50 dark:bg-green-950/30">
              <Headphones className="w-6 h-6 text-green-600 mb-1.5" />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Change Management</span>
            </div>
          </div>
        </div>

        {/* Formular */}
        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ihre geschäftliche E-Mail-Adresse *"
                required
                className="h-11"
              />
            </div>
            <div>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Unternehmen *"
                required
                className="h-11"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telefon (optional)"
                className="h-11"
              />
              <Input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Ihr Name (optional)"
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wird gesendet..." : "Unverbindlich anfragen"}
            </Button>

            <div className="flex items-center justify-center gap-4 pt-1">
              <a
                href="https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <Calendar className="w-3.5 h-3.5" />
                Oder direkt Termin buchen
              </a>
            </div>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              Wir behandeln Ihre Daten vertraulich gemäß DSGVO. Keine ungewünschten E-Mails.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticlePopup;
