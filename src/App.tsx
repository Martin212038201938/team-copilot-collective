import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
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
import DynamicKnowledgePage from "./pages/DynamicKnowledgePage";
import CopilotFuerWord from "./pages/CopilotFuerWord";
import CopilotSicherheit from "./pages/CopilotSicherheit";
import CopilotTippsTricks from "./pages/CopilotTippsTricks";
import CopilotTraining from "./pages/CopilotTraining";
import UeberUns from "./pages/UeberUns";
import TrainingKonfigurator from "./pages/TrainingKonfigurator";
import UnsereAngebote from "./pages/UnsereAngebote";
import TrainingDetail from "./pages/TrainingDetail";
import Workshops from "./pages/Workshops";
import WorkshopDetail from "./pages/WorkshopDetail";
import TrainerProfil from "./pages/TrainerProfil";
import KiRealitaet2026 from "./pages/KiRealitaet2026";
import CopilotUnternehmensweitEinfuehren from "./pages/CopilotUnternehmensweitEinfuehren";
import PromptBibliothekenQuatsch from "./pages/PromptBibliothekenQuatsch";
import CopilotDigitalesGedaechtnis from "./pages/CopilotDigitalesGedaechtnis";
import CopilotLaunchKampagne from "./pages/CopilotLaunchKampagne";
import CopilotROIErfolgsgeschichten from "./pages/CopilotROIErfolgsgeschichten";
import CopilotAdoption2026 from "./pages/CopilotAdoption2026";
import CopilotLernreisen from "./pages/CopilotLernreisen";
import WarumVerteiltesLernen from "./pages/WarumVerteiltesLernen";
import CopilotADHS from "./pages/CopilotADHS";
import CopilotSalesUseCases from "./pages/CopilotSalesUseCases";
import CopilotHRUseCases from "./pages/CopilotHRUseCases";
import KiHalluzinationenVermeiden from "./pages/KiHalluzinationenVermeiden";
import CopilotChatPernodRicard from "./pages/CopilotChatPernodRicard";
import CopilotAgentDigitalesGedaechtnis from "./pages/CopilotAgentDigitalesGedaechtnis";
import CopilotFuerExcel from "./pages/CopilotFuerExcel";
import KiSchulungMitarbeiterPflicht from "./pages/KiSchulungMitarbeiterPflicht";
import Microsoft365E7FrontierSuite from "./pages/Microsoft365E7FrontierSuite";
import CopilotClaudeIntegration from "./pages/CopilotClaudeIntegration";
import CopilotInOutlook from "./pages/CopilotInOutlook";
import CopilotSchulungOnline from "./pages/CopilotSchulungOnline";
import CopilotBetriebsrat from "./pages/CopilotBetriebsrat";
import CopilotInExcelAktivieren from "./pages/CopilotInExcelAktivieren";
import CopilotFlexRoutingEU from "./pages/CopilotFlexRoutingEU";
import CopilotRolloutLeitfaden from "./pages/CopilotRolloutLeitfaden";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trainer-werden" element={<BecomeTrainer />} />
          <Route path="/wissen" element={<Wissen />} />
          <Route path="/wissen/microsoft-copilot-lizenzen" element={<CopilotLicenses />} />
          <Route path="/wissen/github-copilot" element={<GitHubCopilot />} />
          <Route path="/wissen/copilot-studio" element={<CopilotStudio />} />
          <Route path="/wissen/prompt-engineering" element={<PromptEngineering />} />
          <Route path="/wissen/ki-agenten" element={<KIAgenten />} />
          <Route path="/wissen/copilot-fehler-vermeiden" element={<CopilotFehler />} />
          <Route path="/wissen/copilot-roi-berechnen" element={<CopilotRoiBerechnen />} />
          <Route path="/wissen/copilot-fuer-word" element={<CopilotFuerWord />} />
          <Route path="/wissen/copilot-sicherheit-datenschutz" element={<CopilotSicherheit />} />
          <Route path="/wissen/copilot-tipps-tricks-produktivitaet" element={<CopilotTippsTricks />} />
          <Route path="/wissen/copilot-training-schulung" element={<CopilotTraining />} />
          <Route path="/wissen/ki-realitaet-beratungsfirmen-2026" element={<KiRealitaet2026 />} />
          <Route path="/wissen/copilot-unternehmensweit-einfuehren" element={<CopilotUnternehmensweitEinfuehren />} />
          <Route path="/wissen/prompt-bibliotheken-vs-training" element={<PromptBibliothekenQuatsch />} />
          <Route path="/wissen/copilot-digitales-gedaechtnis" element={<CopilotDigitalesGedaechtnis />} />
          <Route path="/wissen/copilot-launch-kampagne" element={<CopilotLaunchKampagne />} />
          <Route path="/wissen/copilot-roi-erfolgsgeschichten" element={<CopilotROIErfolgsgeschichten />} />
          <Route path="/wissen/copilot-adoption-2026-zahlen" element={<CopilotAdoption2026 />} />
          <Route path="/wissen/copilot-lernreise-vs-tagesschulung" element={<CopilotLernreisen />} />
          <Route path="/wissen/warum-verteiltes-lernen-bei-copilot-trainings-funktioniert" element={<WarumVerteiltesLernen />} />
          <Route path="/wissen/copilot-adhs-produktiver-arbeiten" element={<CopilotADHS />} />
          <Route path="/wissen/copilot-vertrieb-use-cases" element={<CopilotSalesUseCases />} />
          <Route path="/wissen/copilot-hr-use-cases" element={<CopilotHRUseCases />} />
          <Route path="/wissen/ki-halluzinationen-vermeiden" element={<KiHalluzinationenVermeiden />} />
          <Route path="/wissen/copilot-chat-free-pernod-ricard" element={<CopilotChatPernodRicard />} />
          <Route path="/wissen/copilot-agent-digitales-gedaechtnis" element={<CopilotAgentDigitalesGedaechtnis />} />
          <Route path="/wissen/copilot-fuer-excel" element={<CopilotFuerExcel />} />
          <Route path="/wissen/ki-schulung-mitarbeiter-pflicht" element={<KiSchulungMitarbeiterPflicht />} />
          <Route path="/wissen/microsoft-365-e7-frontier-suite" element={<Microsoft365E7FrontierSuite />} />
          <Route path="/wissen/claude-in-microsoft-copilot" element={<CopilotClaudeIntegration />} />
          <Route path="/wissen/copilot-in-outlook-nutzen-tipps" element={<CopilotInOutlook />} />
          <Route path="/wissen/microsoft-copilot-schulung-online" element={<CopilotSchulungOnline />} />
          <Route path="/wissen/copilot-betriebsrat" element={<CopilotBetriebsrat />} />
          <Route path="/wissen/copilot-in-excel-aktivieren" element={<CopilotInExcelAktivieren />} />
          <Route path="/wissen/copilot-flex-routing-eu-verarbeitung" element={<CopilotFlexRoutingEU />} />
          <Route path="/wissen/copilot-im-unternehmen-einfuehren-leitfaden" element={<CopilotRolloutLeitfaden />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/ueber-uns" element={<UeberUns />} />
          <Route path="/trainings" element={<UnsereAngebote />} />
          <Route path="/unsere-angebote" element={<Navigate to="/trainings" replace />} />

          {/* Workshops und Events – eigene Kategorie parallel zu Trainings */}
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:slug" element={<WorkshopDetail />} />

          {/* 301-Redirects: alte Workshop-URLs unter /trainings → /workshops */}
          <Route
            path="/trainings/copilot-strategie-change-management"
            element={<Navigate to="/workshops/copilot-strategie-change-management" replace />}
          />
          <Route
            path="/trainings/chatbot-workshop"
            element={<Navigate to="/workshops/chatbot-workshop" replace />}
          />
          <Route
            path="/trainings/copilot-hackathon"
            element={<Navigate to="/workshops/copilot-hackathon" replace />}
          />
          <Route
            path="/trainings/keynote-copilot-arbeitswelt"
            element={<Navigate to="/workshops/keynote-copilot-arbeitswelt" replace />}
          />
          <Route
            path="/trainings/copilot-launch-eventtag"
            element={<Navigate to="/workshops/copilot-launch-eventtag" replace />}
          />
          <Route
            path="/trainings/betriebsrat-ki-workshop"
            element={<Navigate to="/workshops/betriebsrat-ki-workshop" replace />}
          />

          <Route path="/trainings/:slug" element={<TrainingDetail />} />
          <Route path="/trainer/:id" element={<TrainerProfil />} />
          <Route path="/training-konfigurator" element={<TrainingKonfigurator />} />
          <Route path="/admin" element={<Admin />} />
          {/* Dynamic route for all published knowledge articles */}
          <Route path="/wissen/:slug" element={<DynamicKnowledgePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
