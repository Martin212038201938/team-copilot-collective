#!/bin/bash
# IndexNow URL Submission Script für copilotenschule.de
# Reicht alle URLs aus der Sitemap bei Bing IndexNow ein
# Bing teilt automatisch mit Yandex, Seznam, Naver

INDEXNOW_KEY="71f2f35d291ff3779699a8e4692d6cf7"
HOST="copilotenschule.de"
KEY_LOCATION="https://copilotenschule.de/${INDEXNOW_KEY}.txt"

# URLs aus der Sitemap extrahieren und als JSON-Array formatieren
URLS=$(grep -oP '(?<=<loc>)https://copilotenschule\.de[^<]+' public/sitemap.xml | head -100)

# JSON Body erstellen
JSON_BODY=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${INDEXNOW_KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": [
$(echo "$URLS" | sed 's/.*/"&"/' | paste -sd, | sed 's/,/,\n    /g' | sed 's/^/    /')
  ]
}
EOF
)

echo "Submitting $(echo "$URLS" | wc -l) URLs to IndexNow..."
echo ""
echo "Request Body:"
echo "$JSON_BODY"
echo ""

# An Bing IndexNow senden (wird automatisch mit anderen Suchmaschinen geteilt)
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$JSON_BODY")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

echo "Response Code: $HTTP_CODE"
echo "Response Body: $BODY"

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
  echo ""
  echo "✅ URLs erfolgreich bei IndexNow eingereicht!"
  echo "   Die URLs werden automatisch an Bing, Yandex, Seznam und Naver weitergeleitet."
else
  echo ""
  echo "❌ Fehler beim Einreichen. HTTP Code: $HTTP_CODE"
fi
