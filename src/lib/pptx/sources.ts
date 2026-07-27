// Quellen für Quellenfolie + Sprechernotizen (Konzept Abschnitt 10, Folie 11).
export const ROI_SOURCES: { label: string; url: string }[] = [
  {
    label: "Forrester Total Economic Impact of Microsoft 365 Copilot",
    url: "https://tei.forrester.com/go/microsoft/M365Copilot/?lang=en-us",
  },
  {
    label: "DWP Microsoft 365 Copilot Evaluation",
    url: "https://www.gov.uk/government/publications/an-evaluation-of-dwps-microsoft-copilot-365-trial/an-evaluation-of-dwps-microsoft-365-copilot-trial",
  },
  {
    label: "UK Cross-Government Copilot Experiment",
    url: "https://www.gov.uk/government/publications/microsoft-365-copilot-experiment-cross-government-findings-report/microsoft-365-copilot-experiment-cross-government-findings-report-html",
  },
  {
    label: "OECD: The effects of generative AI on productivity, innovation and entrepreneurship",
    url: "https://www.oecd.org/en/publications/the-effects-of-generative-ai-on-productivity-innovation-and-entrepreneurship_b21df222-en.html",
  },
  {
    label: "Microsoft Copilot Adoption Community",
    url: "https://adoption.microsoft.com/en-us/copilot/adoption-community/",
  },
  {
    label: "Copilotenschule: Copilot ROI berechnen",
    url: "https://copilotenschule.de/wissen/copilot-roi-berechnen",
  },
];

export function buildSourcesNotes(): string {
  return "[Sources]\n" + ROI_SOURCES.map((s) => `- ${s.url}`).join("\n");
}
