import { Handler } from '@netlify/functions';
import * as nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

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

    // Create transporter
    const transporter = createTransporter();

    // Send email using SMTP
    const info = await transporter.sendMail({
      from: `"Copilotenschule Trainer-Bewerbung" <${process.env.SMTP_FROM || 'noreply@copilotenschule.de'}>`,
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
      text: `
Neue Trainer-Bewerbung

Name: ${name}
E-Mail: ${email}
${phone ? `Telefon: ${phone}\n` : ''}Interessiert an: ${getPathLabel(path)}
${linkedinUrl ? `LinkedIn: ${linkedinUrl}\n` : ''}${websiteUrl ? `Webseite: ${websiteUrl}\n` : ''}
Nachricht/Motivation:
${message}
      `.trim(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, messageId: info.messageId }),
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
