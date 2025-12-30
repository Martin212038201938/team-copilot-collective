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
    const { name, email, company, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, E-Mail und Nachricht sind Pflichtfelder' }),
      };
    }

    // Create transporter
    const transporter = createTransporter();

    // Send email using SMTP
    const info = await transporter.sendMail({
      from: `"Copilotenschule Kontaktformular" <${process.env.SMTP_FROM || 'noreply@copilotenschule.de'}>`,
      to: 'info@copilotenschule.de',
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${company ? `<p><strong>Unternehmen:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
Neue Kontaktanfrage

Name: ${name}
E-Mail: ${email}
${company ? `Unternehmen: ${company}\n` : ''}${phone ? `Telefon: ${phone}\n` : ''}
Nachricht:
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
