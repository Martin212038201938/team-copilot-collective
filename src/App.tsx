import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BecomeTrainer from "./pages/BecomeTrainer";
import Wissen from "./pages/Wissen";
import CopilotLicenses from "./pages/CopilotLicenses";
import GitHubCopilot from "./pages/GitHubCopilot";
import CopilotStudio from "./pages/CopilotStudio";
import PromptEngineering from "./pages/PromptEngineering";
import KIAgenten from "./pages/KIAgenten";
import CopilotFehler from "./pages/CopilotFehler";
import Impressum from "./pages/Impressum";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import CopilotRoiBerechnen from "./pages/CopilotRoiBerechnen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trainer-werden" element={<BecomeTrainer />} />
          <Route path="/wissen" element={<Wissen />} />
          <Route path="/microsoft-copilot-lizenzen" element={<CopilotLicenses />} />
          <Route path="/github-copilot" element={<GitHubCopilot />} />
          <Route path="/copilot-studio" element={<CopilotStudio />} />
          <Route path="/prompt-engineering" element={<PromptEngineering />} />
          <Route path="/ki-agenten" element={<KIAgenten />} />
          <Route path="/copilot-fehler-vermeiden" element={<CopilotFehler />} />
          <Route path="/wissen/copilot-roi-berechnen" element={<CopilotRoiBerechnen />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
