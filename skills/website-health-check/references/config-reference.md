# Config Reference

## Speicherort

`~/Documents/Claude/website-health-check/config.json`

## Vollständiges Schema

```json
{
  "version": "1.0",
  "settings": {
    "check_interval": "daily",
    "history_retention_days": 90,
    "significance_threshold_stddev": 2.0,
    "max_pages_per_domain": 50,
    "pagespeed_strategy": "mobile",
    "dashboard_output": "~/Documents/Claude/website-health-check/dashboard.html",
    "report_output": "~/Documents/Claude/website-health-check/reports/"
  },
  "sites": [
    {
      "domain": "copilotenschule.de",
      "priority": "high",
      "gsc_property": "https://copilotenschule.de/",
      "bing_site": "https://copilotenschule.de",
      "sitemap_url": "https://copilotenschule.de/sitemap.xml",
      "keywords": [],
      "competitors": [],
      "important_pages": [
        "/",
        "/trainings",
        "/wissen"
      ],
      "notes": "Hauptgeschäft. React/Astro-basiert, dynamische Inhalte."
    },
    {
      "domain": "chatgpt-trainings.de",
      "priority": "high",
      "gsc_property": "https://chatgpt-trainings.de/",
      "bing_site": "https://chatgpt-trainings.de",
      "sitemap_url": "https://chatgpt-trainings.de/sitemap.xml",
      "keywords": [],
      "competitors": [],
      "important_pages": ["/"],
      "notes": ""
    },
    {
      "domain": "yellow-boat.com",
      "priority": "low",
      "gsc_property": "https://yellow-boat.com/",
      "bing_site": "https://yellow-boat.com",
      "sitemap_url": "https://yellow-boat.com/sitemap.xml",
      "keywords": [],
      "competitors": [],
      "important_pages": ["/"],
      "notes": ""
    }
  ]
}
```

## Felder im Detail

### settings

| Feld | Typ | Default | Beschreibung |
|------|-----|---------|-------------|
| check_interval | string | "daily" | Wie oft der Check läuft |
| history_retention_days | number | 90 | Wie viele Tage History behalten wird |
| significance_threshold_stddev | number | 2.0 | Ab wieviel Standardabweichungen eine Änderung als signifikant gilt |
| max_pages_per_domain | number | 50 | Max. Unterseiten pro Domain die geprüft werden |
| pagespeed_strategy | string | "mobile" | "mobile" oder "desktop" für PageSpeed |
| dashboard_output | string | Pfad | Wo das HTML-Dashboard gespeichert wird |
| report_output | string | Pfad | Wo Text-Reports gespeichert werden |

### sites[]

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|-------------|
| domain | string | Ja | Domain ohne Protokoll |
| priority | string | Nein | "high", "medium", "low" — beeinflusst Check-Tiefe |
| gsc_property | string | Nein | Google Search Console Property URL |
| bing_site | string | Nein | Bing Webmaster Tools URL |
| sitemap_url | string | Nein | URL zur Sitemap (Default: /sitemap.xml) |
| keywords | string[] | Nein | Ziel-Keywords (werden auto-ermittelt wenn leer) |
| competitors | string[] | Nein | Wettbewerber-Domains (werden auto-ermittelt wenn leer) |
| important_pages | string[] | Nein | Besonders wichtige Pfade für Performance-Checks |
| notes | string | Nein | Freitextnotizen |

## Neue Domain hinzufügen

Minimaler Eintrag:
```json
{
  "domain": "meine-neue-seite.de"
}
```

Alle optionalen Felder werden beim nächsten Durchlauf automatisch befüllt
(Keywords, Wettbewerber, Sitemap-URL etc.).
