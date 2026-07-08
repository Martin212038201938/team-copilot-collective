#!/usr/bin/env bash
# Postet einen Text-Bericht als Adaptive Card in einen Teams-Kanal
# über einen Power-Automate-/Workflows-Webhook ("Beim Empfang einer
# Webhook-Anfrage in einem Kanal posten").
#
# Die Webhook-URL ist ein Secret und steht NICHT in dieser Datei, sondern in
#   ~/Documents/Cowork Bereich/website-health-check/.env
# als Variable TEAMS_WEBHOOK_MARKETING_SEA=... (gitignored).
#
# Aufruf:
#   bash post-report-to-teams.sh --title "SEO-Audit 06.07.2026" --file /pfad/bericht.md
#   echo "kurzer text" | bash post-report-to-teams.sh --title "Titel"
#
# Exit-Codes: 0 = gepostet (HTTP 200/202) · 2 = keine URL · 3 = HTTP-Fehler · 4 = leerer Text

set -euo pipefail

ENV_FILE="${TEAMS_ENV_FILE:-$HOME/Documents/Cowork Bereich/website-health-check/.env}"
TITLE="SEO-Audit copilotenschule.de"
BODY_FILE=""

while [ $# -gt 0 ]; do
  case "$1" in
    --title) TITLE="$2"; shift 2 ;;
    --file)  BODY_FILE="$2"; shift 2 ;;
    --env)   ENV_FILE="$2"; shift 2 ;;
    *) echo "Unbekanntes Argument: $1" >&2; exit 1 ;;
  esac
done

# Webhook-URL laden
WEBHOOK=""
if [ -f "$ENV_FILE" ]; then
  WEBHOOK="$(grep -E '^TEAMS_WEBHOOK_MARKETING_SEA=' "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '"'"'"' \r')"
fi
if [ -z "$WEBHOOK" ]; then
  echo "FEHLER: TEAMS_WEBHOOK_MARKETING_SEA nicht in $ENV_FILE gefunden." >&2
  echo "→ Workflow-URL dort als TEAMS_WEBHOOK_MARKETING_SEA=... hinterlegen." >&2
  exit 2
fi

# Body-Text einlesen (Datei oder stdin)
if [ -n "$BODY_FILE" ]; then
  BODY="$(cat "$BODY_FILE")"
else
  BODY="$(cat)"
fi
if [ -z "${BODY// /}" ]; then
  echo "FEHLER: Leerer Bericht-Text." >&2
  exit 4
fi

# Adaptive-Card-Payload sicher als JSON bauen (python3 macht das Escaping)
PAYLOAD="$(TITLE="$TITLE" BODY="$BODY" python3 - <<'PY'
import os, json
title = os.environ["TITLE"]
body  = os.environ["BODY"]
# Teams-TextBlöcke sind bei sehr langen Texten robuster, wenn man sie in
# mehrere Blöcke splittet (weiche Grenze ~ Absätze). Wir hängen den ganzen
# Text in einen wrap-TextBlock; Adaptive Cards erlauben Light-Markdown.
card = {
    "type": "message",
    "attachments": [{
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.4",
            "msteams": {"width": "Full"},
            "body": [
                {"type": "TextBlock", "text": title, "weight": "Bolder",
                 "size": "Large", "wrap": True},
                {"type": "TextBlock", "text": body, "wrap": True,
                 "spacing": "Medium"}
            ]
        }
    }]
}
print(json.dumps(card))
PY
)"

# POST
HTTP_CODE="$(curl -s -o /tmp/teams-post-resp.txt -w '%{http_code}' \
  -X POST "$WEBHOOK" \
  -H 'Content-Type: application/json' \
  --data-binary "$PAYLOAD")"

echo "Teams-POST HTTP $HTTP_CODE"
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo "✓ Bericht in Teams-Kanal 'Marketing und SEA' gepostet."
  exit 0
else
  echo "✗ Fehler beim Posten. Antwort:" >&2
  cat /tmp/teams-post-resp.txt >&2
  exit 3
fi
