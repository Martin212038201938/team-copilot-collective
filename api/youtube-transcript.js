#!/usr/bin/env node

/**
 * YouTube Transcript Fetcher using youtube-transcript npm package
 * This is the most reliable method as of 2025
 *
 * Usage:
 * - As CLI: node api/youtube-transcript.js <youtube-url>
 * - As API: node api/youtube-transcript.js --server (starts HTTP server on port 3001)
 */

import { YoutubeTranscript } from 'youtube-transcript';
import http from 'http';
import url from 'url';

/**
 * Extract video ID from various YouTube URL formats
 */
function extractVideoId(urlString) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&?/]+)/,
  ];

  for (const pattern of patterns) {
    const match = urlString.match(pattern);
    if (match) {
      return match[1];
    }
  }

  // If no pattern matches, assume it's already a video ID
  return urlString;
}

/**
 * Fetch transcript for a YouTube video
 */
async function fetchTranscript(videoUrl) {
  try {
    const videoId = extractVideoId(videoUrl);

    // Fetch transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: 'de', // Prefer German
    }).catch(async () => {
      // Fallback to English if German not available
      return await YoutubeTranscript.fetchTranscript(videoId, {
        lang: 'en',
      });
    }).catch(async () => {
      // Fallback to any available language
      return await YoutubeTranscript.fetchTranscript(videoId);
    });

    // Format transcript with timestamps
    let formattedTranscript = '';
    let plainTranscript = '';

    for (const item of transcript) {
      const seconds = Math.floor(item.offset / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const timestamp = `[${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}]`;

      formattedTranscript += `${timestamp} ${item.text}\n`;
      plainTranscript += `${item.text} `;
    }

    return {
      success: true,
      videoId,
      transcript: formattedTranscript.trim(),
      transcriptPlain: plainTranscript.trim(),
      language: transcript[0]?.lang || 'unknown',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Fehler beim Abrufen des Transkripts',
      debug: error.toString(),
    };
  }
}

/**
 * Start HTTP server for API mode
 */
function startServer(port = 3001) {
  const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok', service: 'youtube-transcript' }));
      return;
    }

    if (req.method === 'POST' && parsedUrl.pathname === '/transcript') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const data = JSON.parse(body);

          if (!data.url) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'YouTube URL ist erforderlich' }));
            return;
          }

          const result = await fetchTranscript(data.url);

          if (result.success) {
            res.writeHead(200);
            res.end(JSON.stringify(result));
          } else {
            res.writeHead(500);
            res.end(JSON.stringify(result));
          }
        } catch (error) {
          res.writeHead(500);
          res.end(JSON.stringify({
            success: false,
            error: 'Fehler beim Verarbeiten der Anfrage',
            debug: error.message,
          }));
        }
      });

      return;
    }

    // 404 for unknown routes
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  });

  server.listen(port, () => {
    console.log(`YouTube Transcript API läuft auf http://localhost:${port}`);
    console.log(`Endpunkt: POST http://localhost:${port}/transcript`);
    console.log(`Health Check: GET http://localhost:${port}/health`);
  });
}

/**
 * CLI mode
 */
async function runCLI() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
YouTube Transcript Fetcher

Usage:
  node api/youtube-transcript.js <youtube-url>       Fetch transcript for a video
  node api/youtube-transcript.js --server            Start HTTP server
  node api/youtube-transcript.js --help              Show this help

Examples:
  node api/youtube-transcript.js "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  node api/youtube-transcript.js --server
    `);
    process.exit(0);
  }

  if (args[0] === '--server') {
    startServer();
    return;
  }

  const result = await fetchTranscript(args[0]);
  console.log(JSON.stringify(result, null, 2));
}

// Run CLI if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCLI();
}

export { fetchTranscript, startServer, extractVideoId };
