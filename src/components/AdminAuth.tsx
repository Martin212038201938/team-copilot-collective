import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminAuthProps {
  children: React.ReactNode;
}

// SICHERHEIT (SEC-01): Es gibt hier KEINE Zugangsdaten mehr im Client-Code.
// Das Passwort wird ausschliesslich server-seitig gegen einen bcrypt-Hash geprueft
// (api/admin-login.php, Hash in Server-ENV ADMIN_PASSWORD_HASH). Der Login-Status
// haengt an einem signierten, ablaufenden Token, das der Server ausstellt und prueft
// (api/admin-verify.php) – ein manuell gesetztes localStorage-Flag genuegt nicht mehr.
const TOKEN_KEY = "admin_token";

const AdminAuth = ({ children }: AdminAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Beim Laden: gespeichertes Token server-seitig verifizieren
    const verify = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/admin-verify.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        if (data?.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch {
        // Bei Netzwerkfehler nicht einloggen; Token bleibt fuer spaeteren Versuch
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin-login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data?.success && data?.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setIsAuthenticated(true);
        setPassword("");
        toast({
          title: "Erfolgreich angemeldet",
          description: "Willkommen zurück!",
        });
      } else {
        toast({
          title: "Anmeldung fehlgeschlagen",
          description: data?.error || "Passwort ist falsch.",
          variant: "destructive",
        });
        setPassword("");
      }
    } catch {
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: "Server nicht erreichbar. Bitte später erneut versuchen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
    setPassword("");
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin-Bereich</CardTitle>
            <CardDescription>
              Bitte melden Sie sich an, um auf das Redaktionssystem zuzugreifen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Passwort eingeben"
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Anmelden…" : "Anmelden"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="w-4 h-4 mr-2" />
          Abmelden
        </Button>
      </div>
      {children}
    </div>
  );
};

export default AdminAuth;
