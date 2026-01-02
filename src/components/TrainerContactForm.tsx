import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Linkedin, Globe } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TrainerContactForm = () => {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    path: "",
    linkedinUrl: "",
    websiteUrl: "",
    message: "",
    cv: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-trainer-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          path: formData.path,
          linkedinUrl: formData.linkedinUrl,
          websiteUrl: formData.websiteUrl,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Versenden der Bewerbung');
      }

      toast({
        title: "Bewerbung gesendet!",
        description: "Vielen Dank für dein Interesse. Wir melden uns innerhalb von 48 Stunden bei dir.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        path: "",
        linkedinUrl: "",
        websiteUrl: "",
        message: "",
        cv: null,
      });
      setFileName("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        cv: file,
      }));
      setFileName(file.name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Path Selection */}
          <div>
            <Label htmlFor="path" className="block text-sm font-medium mb-2">
              Ich interessiere mich für *
            </Label>
            <select
              id="path"
              name="path"
              value={formData.path}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Bitte wählen...</option>
              <option value="praktiker">KI-Praktiker ohne Trainer-Erfahrung</option>
              <option value="trainer">Erfahrener KI-Trainer (Freelance)</option>
              <option value="festanstellung">Festanstellung als KI-Trainer</option>
            </select>
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dein vollständiger Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium mb-2">
                E-Mail *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="deine.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="block text-sm font-medium mb-2">
              Telefon
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+49 ..."
            />
          </div>

          {/* LinkedIn and Website */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedinUrl" className="block text-sm font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profil
                </div>
              </Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <Label htmlFor="websiteUrl" className="block text-sm font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Webseite
                </div>
              </Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <Label htmlFor="cv" className="block text-sm font-medium mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Lebenslauf / CV (optional)
              </div>
            </Label>
            <div className="relative">
              <input
                id="cv"
                name="cv"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <label
                htmlFor="cv"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-input rounded-md cursor-pointer hover:border-primary transition-colors bg-background"
              >
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {fileName || "PDF, DOC oder DOCX hochladen (max. 5MB)"}
                </span>
              </label>
            </div>
            {fileName && (
              <p className="text-sm text-primary mt-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {fileName}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="block text-sm font-medium mb-2">
              Deine Nachricht / Motivation *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Erzähl uns kurz über deine Erfahrung mit KI-Tools im Microsoft-Umfeld, deine Motivation als Trainer zu arbeiten und was dich besonders macht..."
              rows={6}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Wird gesendet..." : "Lasst uns sprechen"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            * Pflichtfelder | Wir behandeln deine Daten vertraulich gemäß DSGVO
          </p>
        </form>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3">Schnelle Rückmeldung</h3>
          <p className="text-sm text-muted-foreground">
            Wir melden uns innerhalb von 48 Stunden bei dir und besprechen die nächsten
            Schritte – ob Kennenlerngespräch, Train-the-Trainer Session oder Vertragsdetails.
          </p>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3">Unverbindliches Erstgespräch</h3>
          <p className="text-sm text-muted-foreground">
            Lernen wir uns kennen! In einem 30-minütigen Video-Call besprechen wir deine
            Erfahrungen, unsere Erwartungen und wie eine Zusammenarbeit aussehen könnte.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default TrainerContactForm;
