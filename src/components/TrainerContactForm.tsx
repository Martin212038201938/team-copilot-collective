import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Linkedin, Globe, X, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TrainerContactForm = () => {
  const { toast } = useToast();
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    path: "",
    linkedinUrl: "",
    websiteUrl: "",
    message: "",
    cv: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use FormData to support file upload
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('path', formData.path);
      submitData.append('linkedinUrl', formData.linkedinUrl);
      submitData.append('websiteUrl', formData.websiteUrl);
      submitData.append('message', formData.message);

      // Add CV files if present (up to 4 files)
      if (formData.cv.length > 0) {
        formData.cv.forEach((file, index) => {
          submitData.append(`cv[]`, file);
        });
      }

      const response = await fetch('/api/send-trainer-email.php', {
        method: 'POST',
        body: submitData, // FormData sets Content-Type automatically
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Versenden der Bewerbung');
      }

      toast({
        title: "Bewerbung gesendet!",
        description: "Vielen Dank für Ihr Interesse. Wir melden uns innerhalb von 48 Stunden bei Ihnen.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        path: "",
        linkedinUrl: "",
        websiteUrl: "",
        message: "",
        cv: [],
      });
      setFileNames([]);
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
    const newFiles = Array.from(e.target.files || []);

    if (newFiles.length === 0) return;

    // Add new files to existing files
    const combinedFiles = [...formData.cv, ...newFiles];

    // Limit to 4 files
    if (combinedFiles.length > 4) {
      toast({
        title: "Zu viele Dateien",
        description: `Sie können maximal 4 Dateien hochladen. Sie haben ${combinedFiles.length} Dateien ausgewählt.`,
        variant: "destructive",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      cv: combinedFiles,
    }));
    setFileNames(combinedFiles.map(f => f.name));

    // Reset input so the same file can be selected again
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = formData.cv.filter((_, index) => index !== indexToRemove);
    setFormData((prev) => ({
      ...prev,
      cv: updatedFiles,
    }));
    setFileNames(updatedFiles.map(f => f.name));
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
                placeholder="Ihr vollständiger Name"
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
                placeholder="ihre.email@example.com"
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
                Lebenslauf / CV (optional, bis zu 4 Dateien)
              </div>
            </Label>
            <div className="relative">
              <input
                id="cv"
                name="cv"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                multiple
                className="hidden"
              />
              <label
                htmlFor="cv"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-input rounded-md cursor-pointer hover:border-primary transition-colors bg-background"
              >
                <Upload className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {fileNames.length > 0 ? `${fileNames.length} Datei(en) ausgewählt` : "PDF, DOC oder DOCX hochladen (max. 4 Dateien, je 5MB)"}
                </span>
              </label>
            </div>
            {fileNames.length > 0 && (
              <div className="mt-2 space-y-1">
                {fileNames.map((name, index) => (
                  <div key={index} className="flex items-center justify-between gap-2 bg-primary/5 px-3 py-2 rounded-md group">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-primary truncate">{name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Datei entfernen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="block text-sm font-medium mb-2">
              Ihre Nachricht / Motivation *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Erzählen Sie uns kurz über Ihre Erfahrung mit KI-Tools im Microsoft-Umfeld, Ihre Motivation als Trainer zu arbeiten und was Sie besonders macht..."
              rows={6}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Wird gesendet..." : "Lasst uns sprechen"}
          </Button>

          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Nach dem Absenden erhalten Sie eine E-Mail, in der Sie bestätigen, dass wir Sie künftig per E-Mail kontaktieren dürfen. Ihre Einwilligung können Sie jederzeit widerrufen.
          </p>

          <p className="text-sm text-muted-foreground text-center">
            * Pflichtfelder | Wir behandeln Ihre Daten vertraulich gemäß DSGVO
          </p>
        </form>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {/* Microsoft Bookings - Prominente CTA Card */}
        <Card className="p-6 bg-primary text-primary-foreground border-primary shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Direkt Termin buchen</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Vereinbaren Sie direkt ein unverbindliches Kennenlerngespräch.
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

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3">Schnelle Rückmeldung</h3>
          <p className="text-sm text-muted-foreground">
            Wir melden uns innerhalb von 48 Stunden bei Ihnen und besprechen die nächsten
            Schritte – ob Kennenlerngespräch, Train-the-Trainer Session oder Vertragsdetails.
          </p>
        </Card>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3">Unverbindliches Erstgespräch</h3>
          <p className="text-sm text-muted-foreground">
            Lernen wir uns kennen! In einem 30-minütigen Video-Call besprechen wir Ihre
            Erfahrungen, unsere Erwartungen und wie eine Zusammenarbeit aussehen könnte.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default TrainerContactForm;
