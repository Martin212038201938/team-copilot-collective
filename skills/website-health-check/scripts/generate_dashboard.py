#!/usr/bin/env python3
"""
Website Health Check Dashboard Generator

Reads daily snapshot data and history.json to generate an interactive
HTML dashboard with Chart.js graphs, trend indicators, and
marketing action markers.

Usage:
  python3 generate_dashboard.py \
    --config ~/Documents/Claude/website-health-check/config.json \
    --data-dir ~/Documents/Claude/website-health-check/data/ \
    --output ~/Documents/Claude/website-health-check/dashboard.html
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
import statistics


def load_json(path):
    """Load a JSON file, return None if not found."""
    p = Path(path).expanduser()
    if not p.exists():
        return None
    with open(p, "r", encoding="utf-8") as f:
        return json.load(f)


def get_domain_snapshots(data_dir, domain, days=90):
    """Load the last N days of snapshots for a domain."""
    domain_dir = Path(data_dir).expanduser() / domain
    if not domain_dir.exists():
        return []

    snapshots = []
    today = datetime.now().date()
    for i in range(days):
        d = today - timedelta(days=i)
        fpath = domain_dir / f"{d.isoformat()}.json"
        if fpath.exists():
            with open(fpath, "r", encoding="utf-8") as f:
                snapshots.append(json.load(f))

    return list(reversed(snapshots))  # chronological order


def detect_significant_changes(values, threshold_stddev=2.0):
    """Detect significant changes in a time series.
    Returns list of (index, value, direction) for significant changes."""
    if len(values) < 15:
        return []

    significant = []
    for i in range(14, len(values)):
        window = values[i - 14:i]
        if all(v is None for v in window):
            continue
        clean = [v for v in window if v is not None]
        if len(clean) < 7:
            continue

        mean = statistics.mean(clean)
        if len(clean) > 1:
            stdev = statistics.stdev(clean)
        else:
            stdev = 0

        current = values[i]
        if current is None or stdev == 0:
            continue

        z_score = (current - mean) / stdev
        if abs(z_score) >= threshold_stddev:
            direction = "up" if z_score > 0 else "down"
            significant.append((i, current, direction))

    return significant


def generate_html(config, history, marketing_actions, latest_snapshots):
    """Generate the complete dashboard HTML."""

    domains = [s["domain"] for s in config.get("sites", [])]
    settings = config.get("settings", {})

    # Build chart data from history
    chart_data = {}
    for domain in domains:
        domain_history = (history or {}).get("domains", {}).get(domain, {})
        metrics = domain_history.get("metrics", [])
        chart_data[domain] = {
            "dates": [m["date"] for m in metrics],
            "performance_score": [m.get("performance_score") for m in metrics],
            "lcp_ms": [m.get("lcp_ms") for m in metrics],
            "cls": [m.get("cls") for m in metrics],
            "indexed_google": [m.get("indexed_google") for m in metrics],
            "clicks_7d": [m.get("clicks_7d") for m in metrics],
            "impressions_7d": [m.get("impressions_7d") for m in metrics],
            "avg_position": [m.get("avg_position") for m in metrics],
            "seo_score": [m.get("seo_score") for m in metrics],
            "geo_score": [m.get("geo_score") for m in metrics],
            "keywords_top10": [m.get("keywords_top10") for m in metrics],
        }

    # Marketing actions for annotation
    ma_by_domain = {}
    for ma in (marketing_actions or []):
        d = ma.get("domain", "")
        if d not in ma_by_domain:
            ma_by_domain[d] = []
        ma_by_domain[d].append(ma)

    html = f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Website Health Check Dashboard</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/3.0.1/chartjs-plugin-annotation.min.js"></script>
<style>
  :root {{
    --bg: #0f1117;
    --card: #1a1d27;
    --border: #2a2d3a;
    --text: #e4e4e7;
    --text-muted: #9ca3af;
    --green: #22c55e;
    --yellow: #eab308;
    --red: #ef4444;
    --blue: #3b82f6;
    --purple: #a855f7;
  }}
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
    padding: 24px;
    line-height: 1.5;
  }}
  .header {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }}
  .header h1 {{ font-size: 24px; font-weight: 600; }}
  .header .date {{ color: var(--text-muted); font-size: 14px; }}
  .health-badges {{
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }}
  .badge {{
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid var(--border);
    background: var(--card);
  }}
  .badge.green {{ border-color: var(--green); color: var(--green); }}
  .badge.yellow {{ border-color: var(--yellow); color: var(--yellow); }}
  .badge.red {{ border-color: var(--red); color: var(--red); }}
  .domain-tabs {{
    display: flex;
    gap: 4px;
    margin-bottom: 24px;
  }}
  .domain-tab {{
    padding: 10px 20px;
    border: 1px solid var(--border);
    border-radius: 8px 8px 0 0;
    background: var(--card);
    cursor: pointer;
    color: var(--text-muted);
    font-size: 14px;
    transition: all 0.2s;
  }}
  .domain-tab.active {{
    color: var(--text);
    border-bottom-color: var(--bg);
    background: var(--bg);
  }}
  .domain-section {{ display: none; }}
  .domain-section.active {{ display: block; }}
  .grid {{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }}
  .card {{
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
  }}
  .card h3 {{
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}
  .metric {{
    font-size: 32px;
    font-weight: 700;
  }}
  .metric.green {{ color: var(--green); }}
  .metric.yellow {{ color: var(--yellow); }}
  .metric.red {{ color: var(--red); }}
  .trend {{
    font-size: 14px;
    margin-top: 4px;
  }}
  .trend.up {{ color: var(--green); }}
  .trend.down {{ color: var(--red); }}
  .trend.neutral {{ color: var(--text-muted); }}
  .chart-container {{
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
  }}
  .chart-container h3 {{
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 12px;
  }}
  .chart-wrapper {{
    position: relative;
    height: 250px;
  }}
  .recommendations {{
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
  }}
  .rec-item {{
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    border-left: 4px solid;
  }}
  .rec-item.critical {{ border-color: var(--red); background: rgba(239,68,68,0.1); }}
  .rec-item.medium {{ border-color: var(--yellow); background: rgba(234,179,8,0.1); }}
  .rec-item.low {{ border-color: var(--blue); background: rgba(59,130,246,0.1); }}
  .rec-title {{ font-weight: 600; margin-bottom: 4px; }}
  .rec-detail {{ font-size: 13px; color: var(--text-muted); }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }}
  th, td {{
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }}
  th {{ color: var(--text-muted); font-weight: 500; }}
  .pos-change {{ font-weight: 600; }}
  .pos-change.better {{ color: var(--green); }}
  .pos-change.worse {{ color: var(--red); }}
  .pos-change.same {{ color: var(--text-muted); }}
  .no-data {{
    text-align: center;
    padding: 40px;
    color: var(--text-muted);
    font-style: italic;
  }}
</style>
</head>
<body>

<div class="header">
  <h1>Website Health Check</h1>
  <div class="date">Stand: {datetime.now().strftime('%d.%m.%Y %H:%M')}</div>
</div>

<div class="health-badges" id="health-badges"></div>
<div class="domain-tabs" id="domain-tabs"></div>
<div id="domain-sections"></div>

<script>
const CHART_DATA = {json.dumps(chart_data, ensure_ascii=False)};
const LATEST = {json.dumps(latest_snapshots, ensure_ascii=False)};
const MARKETING = {json.dumps(ma_by_domain, ensure_ascii=False)};
const DOMAINS = {json.dumps(domains, ensure_ascii=False)};

Chart.defaults.color = '#9ca3af';
Chart.defaults.borderColor = '#2a2d3a';

function getHealthColor(health) {{
  if (health === 'green') return '#22c55e';
  if (health === 'yellow') return '#eab308';
  return '#ef4444';
}}

function getScoreClass(score, thresholds) {{
  if (score >= thresholds[0]) return 'green';
  if (score >= thresholds[1]) return 'yellow';
  return 'red';
}}

function trendArrow(current, previous) {{
  if (!previous || !current) return '<span class="trend neutral">—</span>';
  const diff = current - previous;
  if (Math.abs(diff) < 0.5) return '<span class="trend neutral">→ gleich</span>';
  if (diff > 0) return '<span class="trend up">▲ +' + diff.toFixed(1) + '</span>';
  return '<span class="trend down">▼ ' + diff.toFixed(1) + '</span>';
}}

function trendArrowInverse(current, previous) {{
  // For metrics where lower is better (position, LCP, etc.)
  if (!previous || !current) return '<span class="trend neutral">—</span>';
  const diff = current - previous;
  if (Math.abs(diff) < 0.5) return '<span class="trend neutral">→ gleich</span>';
  if (diff < 0) return '<span class="trend up">▲ ' + diff.toFixed(1) + '</span>';
  return '<span class="trend down">▼ +' + diff.toFixed(1) + '</span>';
}}

// Build badges
const badgesEl = document.getElementById('health-badges');
DOMAINS.forEach(d => {{
  const latest = LATEST[d];
  const health = latest ? (latest.overall_health || 'yellow') : 'gray';
  const badge = document.createElement('span');
  badge.className = 'badge ' + health;
  badge.textContent = d + (health === 'green' ? ' ✓' : health === 'red' ? ' ✗' : ' ◐');
  badgesEl.appendChild(badge);
}});

// Build tabs and sections
const tabsEl = document.getElementById('domain-tabs');
const sectionsEl = document.getElementById('domain-sections');

DOMAINS.forEach((domain, idx) => {{
  // Tab
  const tab = document.createElement('div');
  tab.className = 'domain-tab' + (idx === 0 ? ' active' : '');
  tab.textContent = domain;
  tab.onclick = () => {{
    document.querySelectorAll('.domain-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.domain-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('section-' + idx).classList.add('active');
  }};
  tabsEl.appendChild(tab);

  const section = document.createElement('div');
  section.id = 'section-' + idx;
  section.className = 'domain-section' + (idx === 0 ? ' active' : '');

  const data = CHART_DATA[domain] || {{}};
  const latest = LATEST[domain];

  if (!latest) {{
    section.innerHTML = '<div class="no-data">Noch keine Daten vorhanden. Erster Health Check steht aus.</div>';
    sectionsEl.appendChild(section);
    return;
  }}

  const perf = latest.performance || {{}};
  const indexing = latest.indexing || {{}};
  const seo = latest.seo || {{}};
  const kw = latest.keywords || {{}};
  const llm = latest.llm_visibility || {{}};
  const avail = latest.availability || {{}};
  const recs = latest.recommendations || [];

  // Metric cards
  section.innerHTML = `
    <div class="grid">
      <div class="card">
        <h3>Performance Score</h3>
        <div class="metric ${{getScoreClass(perf.average_performance_score||0, [90,50])}}">
          ${{perf.average_performance_score || '—'}}
        </div>
        <div>${{trendArrow(
          data.performance_score?.[data.performance_score.length-1],
          data.performance_score?.[data.performance_score.length-2]
        )}}</div>
      </div>
      <div class="card">
        <h3>Indexierte Seiten (Google)</h3>
        <div class="metric">${{indexing.google?.indexed_pages || '—'}}</div>
        <div>${{trendArrow(
          data.indexed_google?.[data.indexed_google.length-1],
          data.indexed_google?.[data.indexed_google.length-2]
        )}}</div>
      </div>
      <div class="card">
        <h3>SEO Score</h3>
        <div class="metric ${{getScoreClass(seo.average_seo_score||0, [85,60])}}">
          ${{seo.average_seo_score || '—'}}
        </div>
        <div>${{trendArrow(
          data.seo_score?.[data.seo_score.length-1],
          data.seo_score?.[data.seo_score.length-2]
        )}}</div>
      </div>
      <div class="card">
        <h3>GEO/LLM Score</h3>
        <div class="metric ${{getScoreClass(llm.geo_score||0, [70,40])}}">
          ${{llm.geo_score || '—'}}
        </div>
        <div>${{trendArrow(
          data.geo_score?.[data.geo_score.length-1],
          data.geo_score?.[data.geo_score.length-2]
        )}}</div>
      </div>
      <div class="card">
        <h3>Keywords in Top 10</h3>
        <div class="metric">${{kw.keywords_in_top10 || '—'}}</div>
        <div>${{trendArrow(
          data.keywords_top10?.[data.keywords_top10.length-1],
          data.keywords_top10?.[data.keywords_top10.length-2]
        )}}</div>
      </div>
      <div class="card">
        <h3>Klicks (7 Tage)</h3>
        <div class="metric">${{indexing.google?.clicks_7d || '—'}}</div>
        <div>${{trendArrow(
          data.clicks_7d?.[data.clicks_7d.length-1],
          data.clicks_7d?.[data.clicks_7d.length-2]
        )}}</div>
      </div>
    </div>

    <div class="chart-container">
      <h3>Performance & SEO Trend</h3>
      <div class="chart-wrapper"><canvas id="chart-perf-${{idx}}"></canvas></div>
    </div>

    <div class="chart-container">
      <h3>Indexierung & Klicks</h3>
      <div class="chart-wrapper"><canvas id="chart-index-${{idx}}"></canvas></div>
    </div>

    <div class="chart-container">
      <h3>Keyword Rankings & LLM Sichtbarkeit</h3>
      <div class="chart-wrapper"><canvas id="chart-kw-${{idx}}"></canvas></div>
    </div>

    ${{recs.length > 0 ? `
    <div class="recommendations">
      <h3 style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; font-size: 14px;">Empfehlungen</h3>
      ${{recs.map(r => `
        <div class="rec-item ${{r.priority}}">
          <div class="rec-title">${{r.title}}</div>
          <div class="rec-detail">${{r.description}}</div>
        </div>
      `).join('')}}
    </div>` : ''}}

    ${{kw.rankings?.length > 0 ? `
    <div class="card" style="margin-bottom: 16px;">
      <h3>Keyword Rankings</h3>
      <table>
        <thead><tr><th>Keyword</th><th>Position</th><th>Änderung</th><th>URL</th></tr></thead>
        <tbody>
          ${{kw.rankings.map(r => `
            <tr>
              <td>${{r.keyword}}</td>
              <td>${{r.position_google || '—'}}</td>
              <td class="pos-change ${{r.position_change < 0 ? 'better' : r.position_change > 0 ? 'worse' : 'same'}}">
                ${{r.position_change > 0 ? '▼ +'+r.position_change : r.position_change < 0 ? '▲ '+r.position_change : '→'}}
              </td>
              <td style="font-size:12px;color:var(--text-muted)">${{r.ranking_url || '—'}}</td>
            </tr>
          `).join('')}}
        </tbody>
      </table>
    </div>` : ''}}
  `;
  sectionsEl.appendChild(section);

  // Marketing action annotations
  const domainActions = MARKETING[domain] || [];
  const annotations = {{}};
  domainActions.forEach((ma, i) => {{
    annotations['ma' + i] = {{
      type: 'line',
      xMin: ma.date,
      xMax: ma.date,
      borderColor: '#a855f7',
      borderWidth: 1,
      borderDash: [5, 5],
      label: {{
        display: true,
        content: ma.action.substring(0, 30),
        position: 'start',
        font: {{ size: 10 }},
        color: '#a855f7'
      }}
    }};
  }});

  // Chart: Performance & SEO
  if (data.dates?.length > 0) {{
    new Chart(document.getElementById('chart-perf-' + idx), {{
      type: 'line',
      data: {{
        labels: data.dates,
        datasets: [
          {{
            label: 'Performance',
            data: data.performance_score,
            borderColor: '#3b82f6',
            tension: 0.3,
            pointRadius: 2
          }},
          {{
            label: 'SEO Score',
            data: data.seo_score,
            borderColor: '#22c55e',
            tension: 0.3,
            pointRadius: 2
          }},
          {{
            label: 'GEO Score',
            data: data.geo_score,
            borderColor: '#a855f7',
            tension: 0.3,
            pointRadius: 2
          }}
        ]
      }},
      options: {{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {{
          annotation: {{ annotations }}
        }},
        scales: {{
          y: {{ min: 0, max: 100 }}
        }}
      }}
    }});

    // Chart: Indexing & Clicks
    new Chart(document.getElementById('chart-index-' + idx), {{
      type: 'line',
      data: {{
        labels: data.dates,
        datasets: [
          {{
            label: 'Indexierte Seiten',
            data: data.indexed_google,
            borderColor: '#3b82f6',
            tension: 0.3,
            pointRadius: 2,
            yAxisID: 'y'
          }},
          {{
            label: 'Klicks (7d)',
            data: data.clicks_7d,
            borderColor: '#22c55e',
            tension: 0.3,
            pointRadius: 2,
            yAxisID: 'y1'
          }}
        ]
      }},
      options: {{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {{ annotation: {{ annotations }} }},
        scales: {{
          y: {{ position: 'left' }},
          y1: {{ position: 'right', grid: {{ drawOnChartArea: false }} }}
        }}
      }}
    }});

    // Chart: Keywords
    new Chart(document.getElementById('chart-kw-' + idx), {{
      type: 'line',
      data: {{
        labels: data.dates,
        datasets: [
          {{
            label: 'Keywords in Top 10',
            data: data.keywords_top10,
            borderColor: '#eab308',
            tension: 0.3,
            pointRadius: 2,
            yAxisID: 'y'
          }},
          {{
            label: 'Ø Position',
            data: data.avg_position,
            borderColor: '#ef4444',
            tension: 0.3,
            pointRadius: 2,
            yAxisID: 'y1'
          }}
        ]
      }},
      options: {{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {{ annotation: {{ annotations }} }},
        scales: {{
          y: {{ position: 'left' }},
          y1: {{ position: 'right', reverse: true, grid: {{ drawOnChartArea: false }} }}
        }}
      }}
    }});
  }}
}});
</script>

</body>
</html>"""

    return html


def main():
    parser = argparse.ArgumentParser(description="Generate Website Health Dashboard")
    parser.add_argument("--config", required=True, help="Path to config.json")
    parser.add_argument("--data-dir", required=True, help="Path to data directory")
    parser.add_argument("--output", required=True, help="Output HTML path")
    args = parser.parse_args()

    config = load_json(args.config)
    if not config:
        print(f"Error: Config not found at {args.config}")
        sys.exit(1)

    data_dir = Path(args.data_dir).expanduser()
    history = load_json(data_dir / "history.json")
    marketing = load_json(data_dir / "marketing-actions.json") or []

    # Load latest snapshot for each domain
    latest = {}
    for site in config.get("sites", []):
        domain = site["domain"]
        snapshots = get_domain_snapshots(args.data_dir, domain, days=1)
        if snapshots:
            latest[domain] = snapshots[-1]
        else:
            latest[domain] = None

    html = generate_html(config, history, marketing, latest)

    output_path = Path(args.output).expanduser()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"Dashboard generated: {output_path}")


if __name__ == "__main__":
    main()
