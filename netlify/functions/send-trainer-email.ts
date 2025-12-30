import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const getPathLabel = (path: string): string => {
  const labels: { [key: string]: string } = {
    praktiker: 'KI-Praktiker ohne Trainer-Erfahrung',
    trainer: 'Erfahrener KI-Trainer (Freelance)',
    festanstellung: 'Festanstellung als KI-Trainer',
  };
  return labels[path] || path;
};

export const handler: Handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { name, email, phone, path, linkedinUrl, websiteUrl, message } = body;

    // Validate required fields
    if (!name || !email || !path || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, E-Mail, Interessensgebiet und Nachricht sind Pflichtfelder' }),
      };
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Copilotenschule Trainer-Bewerbung <noreply@copilotenschule.de>',
      to: 'info@copilotenschule.de',
      replyTo: email,
      subject: `Neue Trainer-Bewerbung von ${name} - ${getPathLabel(path)}`,
      html: `
        <h2>Neue Trainer-Bewerbung</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Interessiert an:</strong> ${getPathLabel(path)}</p>
        ${linkedinUrl ? `<p><strong>LinkedIn:</strong> <a href="${linkedinUrl}">${linkedinUrl}</a></p>` : ''}
        ${websiteUrl ? `<p><strong>Webseite:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>` : ''}
        <p><strong>Nachricht/Motivation:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Hinweis: CV-Upload wird derzeit über eine separate Funktion verarbeitet und wird in einer zukünftigen Version hinzugefügt.</p>
      `,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Fehler beim Versenden der E-Mail. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter info@copilotenschule.de',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};
