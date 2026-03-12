# Data Schema Reference

## Täglicher Snapshot

Jede Datei unter `data/{domain}/{YYYY-MM-DD}.json` folgt diesem Schema:

```json
{
  "date": "2026-03-12",
  "domain": "copilotenschule.de",
  "check_duration_seconds": 245,
  "overall_health": "yellow",

  "performance": {
    "pages": [
      {
        "url": "https://copilotenschule.de/",
        "performance_score": 85,
        "accessibility_score": 92,
        "seo_score": 98,
        "best_practices_score": 90,
        "lcp_ms": 2100,
        "inp_ms": 150,
        "cls": 0.05,
        "ttfb_ms": 650,
        "fcp_ms": 1200,
        "status": "good"
      }
    ],
    "average_performance_score": 85,
    "core_web_vitals_status": "good"
  },

  "indexing": {
    "google": {
      "indexed_pages": 42,
      "not_indexed_pages": 3,
      "crawl_errors": 1,
      "not_indexed_reasons": [
        {
          "reason": "Crawled - currently not indexed",
          "count": 2,
          "urls": ["/alte-seite", "/draft-seite"]
        }
      ],
      "clicks_7d": 320,
      "impressions_7d": 5400,
      "ctr_7d": 5.9,
      "avg_position_7d": 12.3
    },
    "bing": {
      "indexed_pages": 38,
      "crawl_errors": 0,
      "clicks_7d": 45,
      "impressions_7d": 890
    },
    "sitemap": {
      "total_urls": 45,
      "index_coverage_pct": 93.3,
      "missing_from_index": ["/neue-seite-1", "/neue-seite-2"]
    }
  },

  "seo": {
    "pages_checked": 45,
    "issues": [
      {
        "severity": "critical",
        "type": "canonical_mismatch",
        "url": "/trainings/copilot",
        "detail": "Canonical zeigt auf / statt auf /trainings/copilot",
        "recommendation": "Canonical-Tag korrigieren"
      },
      {
        "severity": "warning",
        "type": "missing_meta_description",
        "url": "/impressum",
        "detail": "Keine Meta-Description vorhanden",
        "recommendation": "Meta-Description ergänzen"
      }
    ],
    "average_seo_score": 88,
    "pages_with_issues": 5,
    "dynamic_content_problems": [
      {
        "url": "/wissen/artikel-xyz",
        "detail": "Inhalte werden per JS geladen, WebFetch sieht nur Skeleton"
      }
    ]
  },

  "keywords": {
    "rankings": [
      {
        "keyword": "Copilot Schulung",
        "position_google": 8,
        "position_change": -2,
        "ranking_url": "/trainings/copilot-schulung",
        "search_volume_estimate": "medium"
      }
    ],
    "average_position": 14.2,
    "keywords_in_top10": 4,
    "keywords_in_top20": 8
  },

  "llm_visibility": {
    "geo_score": 72,
    "geo_details": {
      "structured_data_present": true,
      "faq_schema": true,
      "author_schema": true,
      "citable_paragraphs": 15,
      "ai_crawlers_allowed": true,
      "robots_txt_blocks": []
    },
    "citations_found": [
      {
        "source": "perplexity",
        "query": "Microsoft Copilot Training Deutschland",
        "cited": true,
        "context": "In Suchergebnissen als Quelle genannt"
      }
    ]
  },

  "competitors": {
    "tracked": ["haufe-akademie.de", "microsoft.com/de-de/training"],
    "keyword_gaps": [
      {
        "keyword": "Copilot Workshop",
        "own_position": 15,
        "competitor": "haufe-akademie.de",
        "competitor_position": 3
      }
    ]
  },

  "availability": {
    "homepage_status": 200,
    "ssl_valid": true,
    "redirect_chain": ["http → https (301)", "www → non-www (301)"],
    "broken_links": [],
    "response_time_ms": 450
  },

  "recommendations": [
    {
      "priority": "critical",
      "module": "seo",
      "domain": "copilotenschule.de",
      "title": "Canonical-Mismatch auf /trainings/copilot",
      "description": "Der Canonical-Tag zeigt auf die Startseite statt auf die aktuelle URL. Das verhindert die Indexierung dieser Seite.",
      "action": "Canonical-Tag in der Seiten-Komponente korrigieren."
    },
    {
      "priority": "medium",
      "module": "performance",
      "domain": "copilotenschule.de",
      "title": "LCP auf Mobile über 2.5s auf /wissen",
      "description": "Largest Contentful Paint liegt bei 2.8s, über dem empfohlenen Grenzwert.",
      "action": "Hero-Bild optimieren (WebP, Lazy Loading) oder Critical CSS inlinen."
    }
  ]
}
```

## History.json

Aggregierte Zeitreihe für schnelle Dashboard-Generierung:

```json
{
  "last_updated": "2026-03-12",
  "domains": {
    "copilotenschule.de": {
      "metrics": [
        {
          "date": "2026-03-12",
          "performance_score": 85,
          "lcp_ms": 2100,
          "cls": 0.05,
          "inp_ms": 150,
          "indexed_google": 42,
          "indexed_bing": 38,
          "clicks_7d": 320,
          "impressions_7d": 5400,
          "avg_position": 12.3,
          "seo_score": 88,
          "geo_score": 72,
          "keywords_top10": 4,
          "overall_health": "yellow"
        }
      ]
    }
  }
}
```

## Marketing-Actions.json

```json
[
  {
    "date": "2026-03-10",
    "domain": "copilotenschule.de",
    "action": "Neuer Blogartikel: Copilot für Führungskräfte",
    "category": "content",
    "url": "/wissen/copilot-fuehrungskraefte",
    "tags": ["blog", "copilot", "führungskräfte"]
  }
]
```

Gültige Kategorien: `content`, `seo`, `technical`, `advertising`, `social`,
`backlinks`, `other`.
