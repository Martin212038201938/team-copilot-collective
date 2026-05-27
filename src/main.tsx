import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import Clarity from "@microsoft/clarity";
import App from "./App.tsx";
import "./index.css";

// Microsoft Clarity initialisieren — Heatmaps, Session-Recordings, Conversion-Events.
// Projekt-ID kommt aus Build-Env VITE_CLARITY_ID (GitHub Actions Secret).
// Wenn nicht gesetzt: kein Tracking, kein Fehler — sicher in Dev/Preview.
// Wir tracken NICHT während des react-snap-Pre-Rendering-Snapshots (kein Browser-User).
const clarityId = import.meta.env.VITE_CLARITY_ID as string | undefined;
if (clarityId && typeof navigator !== "undefined" && !/ReactSnap/i.test(navigator.userAgent)) {
  try {
    Clarity.init(clarityId);
  } catch (err) {
    console.debug("[clarity] Init-Fehler (ignoriert):", err);
  }
}

const container = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// react-snap hydration support: use hydrateRoot if pre-rendered, createRoot otherwise
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
