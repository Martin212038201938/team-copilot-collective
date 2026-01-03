# Cost Tracking Patch

Nach jedem `const data = await response.json();` in DraftEditor.tsx muss folgender Code eingefügt werden:

```typescript
// Track API usage and costs
if (data.usage) {
  const usage = trackAPICall('gpt-4o', data.usage.prompt_tokens, data.usage.completion_tokens);

  // Send warning email if limit exceeded (only once per day)
  if (usage.limitExceeded && !usage.warningEmailSent) {
    sendWarningEmail(usage).catch(err =>
      console.error('Failed to send warning email:', err)
    );
  }
}
```

## Locations (line numbers from grep):
- Line 627
- Line 742
- Line 919
- Line 1059

## Manual insertion required
Due to file complexity, manual insertion is recommended for each location.
