# Performance Messung: Fallback-Strategie

## Warum PageSpeed Insights oft scheitert

Die Google PageSpeed Insights API hat ein sehr kleines Tageskontingent pro Projekt.
Sie liefert häufig HTTP 429 ("Quota exceeded"). Verlasse dich NICHT auf sie als
einzige Methode.

## Primäre Methode: HTTP-basierte Messung (IMMER verfügbar)

```python
import requests, time

def measure_performance(url):
    start = time.time()
    r = requests.get(url, timeout=20, allow_redirects=True,
                     headers={'User-Agent': 'Mozilla/5.0 (compatible; HealthCheck/1.0)'})
    ttfb_ms = r.elapsed.total_seconds() * 1000
    total_ms = (time.time() - start) * 1000
    size_kb = len(r.content) / 1024
    return {
        "url": url,
        "status": r.status_code,
        "ttfb_ms": round(ttfb_ms),
        "total_ms": round(total_ms),
        "html_size_kb": round(size_kb, 1),
        "server": r.headers.get("server", "unknown"),
        "cache_control": r.headers.get("cache-control", "MISSING"),
    }
```

TTFB-Bewertung (für JSON-Snapshot und Dashboard):
- status: "good"              → TTFB < 200ms  ✅
- status: "needs_improvement" → TTFB 200–800ms 🟡
- status: "poor"              → TTFB > 800ms   🔴 KRITISCH

