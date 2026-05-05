#!/usr/bin/env bash
# Re-Test gegen die Baseline.
# Aufruf: bash seo-monitoring/recheck.sh [BASELINE_DATE]
# Beispiel: bash seo-monitoring/recheck.sh 2026-05-04

set -euo pipefail

BASELINE_DATE="${1:-2026-05-04}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASELINE_FILE="${SCRIPT_DIR}/${BASELINE_DATE}-baseline.json"
TODAY=$(date +%Y-%m-%d)
NOW_FILE="${SCRIPT_DIR}/${TODAY}-snapshot.json"

if [ ! -f "$BASELINE_FILE" ]; then
  echo "Baseline nicht gefunden: $BASELINE_FILE"
  echo "Vorhandene Baselines:"
  ls -1 "$SCRIPT_DIR"/*-baseline.json 2>/dev/null || echo "  (keine)"
  exit 1
fi

echo "============================================================"
echo "SEO Re-Test"
echo "============================================================"
echo "Baseline: $BASELINE_DATE"
echo "Heute   : $TODAY"
echo ""

DEFAULT='copilotenschule.de — Microsoft Copilot Schulungen für Unternehmen'
URLS=$(python3 -c "import json; print('\n'.join(json.load(open('$BASELINE_FILE'))['live_check'].keys()))")

HELMET=0
DEFAULT_GREIFT=0
EMPTY=0
DOUBLE_DESC=0
TOTAL=0

REGRESSIONS=()

echo "{" > "$NOW_FILE"
echo "  \"timestamp\": \"$(date -Iseconds)\"," >> "$NOW_FILE"
echo "  \"baseline_compared_to\": \"$BASELINE_DATE\"," >> "$NOW_FILE"
echo "  \"live_check\": {" >> "$NOW_FILE"

FIRST=1
while IFS= read -r url; do
  TOTAL=$((TOTAL+1))
  HTML=$(curl -sL "https://copilotenschule.de${url}?_=$(date +%s%N)" 2>/dev/null)
  T=$(echo "$HTML" | grep -oE '<title[^>]*>[^<]*</title>' | head -1 | sed 's|<title[^>]*>||;s|</title>||')
  DESC_COUNT=$(echo "$HTML" | grep -c '<meta name="description"' || true)
  CAN_COUNT=$(echo "$HTML" | grep -c '<link rel="canonical"' || true)

  KIND="empty"
  if [ -z "$T" ]; then
    EMPTY=$((EMPTY+1))
  elif [ "$T" = "$DEFAULT" ]; then
    KIND="default"
    DEFAULT_GREIFT=$((DEFAULT_GREIFT+1))
  else
    KIND="helmet"
    HELMET=$((HELMET+1))
  fi

  [ "$DESC_COUNT" -gt 1 ] && DOUBLE_DESC=$((DOUBLE_DESC+1))

  # Baseline-Vergleich für Regression-Detection
  BASELINE_KIND=$(python3 -c "import json; print(json.load(open('$BASELINE_FILE'))['live_check'].get('$url', {}).get('title_kind', '?'))")
  if [ "$BASELINE_KIND" = "helmet" ] && [ "$KIND" != "helmet" ]; then
    REGRESSIONS+=("$url: helmet → $KIND")
  fi

  TITLE_JSON=$(echo "$T" | python3 -c 'import sys, json; print(json.dumps(sys.stdin.read().strip()))')
  [ $FIRST -eq 0 ] && echo "    ," >> "$NOW_FILE"
  echo "    \"$url\": {\"title_kind\": \"$KIND\", \"title\": $TITLE_JSON, \"desc_count\": $DESC_COUNT, \"canonical_count\": $CAN_COUNT, \"baseline_kind\": \"$BASELINE_KIND\"}" >> "$NOW_FILE"
  FIRST=0
done <<< "$URLS"

echo "  }," >> "$NOW_FILE"
echo "  \"summary\": {\"helmet_ok\": $HELMET, \"default_fallback\": $DEFAULT_GREIFT, \"empty\": $EMPTY, \"double_description_bug\": $DOUBLE_DESC, \"total\": $TOTAL}" >> "$NOW_FILE"
echo "}" >> "$NOW_FILE"

echo ""
echo "Ergebnis:"
echo "  Helmet-Flush funktioniert    : $HELMET / $TOTAL"
echo "  Default-Title-Fallback aktiv : $DEFAULT_GREIFT / $TOTAL"
echo "  Komplett leer (BAD!)         : $EMPTY / $TOTAL"
echo "  Doppel-Description (BAD!)    : $DOUBLE_DESC / $TOTAL"
echo ""

# Baseline-Werte zum Vergleich
BASE_HELMET=$(python3 -c "import json; print(json.load(open('$BASELINE_FILE'))['summary']['helmet_ok'])")
BASE_DEFAULT=$(python3 -c "import json; print(json.load(open('$BASELINE_FILE'))['summary']['default_fallback'])")
BASE_EMPTY=$(python3 -c "import json; print(json.load(open('$BASELINE_FILE'))['summary']['empty'])")
BASE_DOUBLE=$(python3 -c "import json; print(json.load(open('$BASELINE_FILE'))['summary']['double_description_bug'])")

echo "Vergleich zur Baseline ($BASELINE_DATE):"
echo "  Helmet-Flush  : $BASE_HELMET → $HELMET   (Δ $((HELMET - BASE_HELMET)))"
echo "  Default-Fallb.: $BASE_DEFAULT → $DEFAULT_GREIFT   (Δ $((DEFAULT_GREIFT - BASE_DEFAULT)))"
echo "  Empty         : $BASE_EMPTY → $EMPTY   (Δ $((EMPTY - BASE_EMPTY)))"
echo "  Double-Desc   : $BASE_DOUBLE → $DOUBLE_DESC   (Δ $((DOUBLE_DESC - BASE_DOUBLE)))"
echo ""

if [ $EMPTY -gt $BASE_EMPTY ] || [ $DOUBLE_DESC -gt $BASE_DOUBLE ]; then
  echo "🚨 REGRESSION: Schwerwiegende Verschlechterung gegenüber Baseline!"
fi

if [ ${#REGRESSIONS[@]} -gt 0 ]; then
  echo ""
  echo "Pro-URL-Regressions (Helmet → Default oder Empty):"
  for r in "${REGRESSIONS[@]}"; do
    echo "  - $r"
  done
fi

echo ""
echo "Snapshot gespeichert: $NOW_FILE"
echo ""
echo "Nächste Schritte:"
echo "  1. GSC öffnen: https://search.google.com/search-console?resource_id=sc-domain:copilotenschule.de"
echo "     → 'Indexierte Seiten' anschauen, Trend mit 22 (Baseline) vergleichen"
echo "  2. Bing Webmaster: https://www.bing.com/webmasters/aiperformance?siteUrl=https%3A%2F%2Fcopilotenschule.de%2F"
echo "     → AI Performance Citations-Trend mit 20.000 (Baseline) vergleichen"
