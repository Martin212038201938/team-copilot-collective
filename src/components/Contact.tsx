import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trainingSource, setTrainingSource] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });

  // Erfasse die Herkunftsseite beim Laden der Komponente
  useEffect(() => {
    const referrer = document.referrer;
    if (referrer) {
      try {
        const url = new URL(referrer);
        // Nur interne Seiten erfassen (copilotenschule.de oder localhost)
        if (url.hostname.includes('copilotenschule.de') ||
            url.hostname === 'localhost' ||
            url.hostname === '127.0.0.1') {
          // Speichere den Pfad (z.B. /copilot-studio oder /wissen/copilot-fuer-word)
          if (url.pathname && url.pathname !== '/') {
            setTrainingSource(url.pathname);
          }
        }
      } catch (e) {
        // Ungültige URL - ignorieren
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-contact-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          trainingSource: trainingSource
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Versenden der Anfrage');
      }

      toast({
        title: "Anfrage gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter info@copilotenschule.de",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Kontakt
          </span>
          <h2 className="text-4xl font-bold mt-6 mb-4">
            Copilot nutzen und nicht nur damit spielen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lassen Sie uns gemeinsam das passende Training für Ihr Team entwickeln. 
            Wir beraten Sie gerne unverbindlich.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      E-Mail *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre.email@unternehmen.de"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Unternehmen
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ihr Unternehmen"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telefon
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+49 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ihre Nachricht *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie kurz Ihre Anforderungen: Anzahl der Teilnehmer, gewünschtes Training, bevorzugte Termine..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Wird gesendet..." : "Anfrage absenden"}
                </Button>

                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  Nach dem Absenden erhalten Sie eine E-Mail, in der Sie bestätigen, dass wir Sie künftig per E-Mail kontaktieren dürfen. Ihre Einwilligung können Sie jederzeit widerrufen.
                </p>

                <p className="text-sm text-muted-foreground text-center">
                  * Pflichtfelder | Wir behandeln Ihre Daten vertraulich gemäß DSGVO
                </p>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Microsoft Bookings - Prominente CTA Card */}
            <Card className="p-6 bg-primary text-primary-foreground border-primary shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Erstgespräch vereinbaren</h3>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    Buchen Sie direkt einen passenden Termin für ein kostenloses Beratungsgespräch.
                  </p>
                  <a
                    href="https://outlook.office.com/book/CopilotErstgesprch@yellow-boat.com/?ismsaljsauthenabled"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="secondary" className="w-full font-semibold">
                      <Calendar className="w-4 h-4 mr-2" />
                      Jetzt Termin buchen →
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">E-Mail</h3>
                  <a href="mailto:info@copilotenschule.de" className="text-muted-foreground hover:text-primary transition-colors">
                    info@copilotenschule.de
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telefon</h3>
                  <a href="tel:+4922195018774" className="text-muted-foreground hover:text-primary transition-colors">
                    +49 221 950 187 74
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Standort</h3>
                  <p className="text-muted-foreground">
                    Deutschlandweit<br />
                    Vor Ort oder Remote
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold mb-3">Schnelle Antwort garantiert</h3>
              <p className="text-sm text-muted-foreground">
                Wir melden uns innerhalb von 24 Stunden bei Ihnen und besprechen 
                Ihre individuellen Anforderungen für ein maßgeschneidertes Training.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;