/**
 * Utility to fetch YouTube video transcripts via our backend API
 */

export interface YouTubeTranscriptResponse {
  success: boolean;
  videoId?: string;
  transcript?: string;
  transcriptPlain?: string;
  language?: string;
  error?: string;
  debug?: string;
  xmlErrors?: string[];
}

/**
 * Fetch transcript for a YouTube video
 * Uses the stable Node.js backend with youtube-transcript package
 *
 * @param url YouTube video URL
 * @returns Promise with transcript data
 */
export async function fetchYouTubeTranscript(url: string): Promise<YouTubeTranscriptResponse> {
  try {
    // Use Node.js API endpoint (most reliable method for 2025)
    // In development: http://localhost:3001
    // In production: will be proxied through the main server
    const apiEndpoint = import.meta.env.PROD
      ? '/api/fetch-youtube-transcript.php' // Production fallback to PHP
      : 'http://localhost:3001/transcript'; // Development: Node.js server

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Fehler beim Abrufen des Transkripts',
        debug: data.debug,
      };
    }

    return data;
  } catch (error) {
    console.error('Error fetching YouTube transcript:', error);

    // Provide helpful error message
    let errorMessage = 'Netzwerkfehler';
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        errorMessage = 'Konnte Transcript-Server nicht erreichen. Stelle sicher, dass "npm run dev:transcript" läuft.';
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Extract video ID from various YouTube URL formats
 * @param url YouTube URL
 * @returns Video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/v\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Validate if a URL is a valid YouTube URL
 * @param url URL to validate
 * @returns True if valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}
