import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../server/.env') });
dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
// Gmail App Passwords are often copied with spaces; strip them for auth.
const SMTP_PASS = process.env.SMTP_PASS?.replace(/\s+/g, '');
const RECIPIENT = process.env.SMTP_RECIPIENT || 'mahnoorshahid2410@gmail.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeHeaderValue(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validateContactPayload(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!name) {
    return { error: 'name is required' };
  }
  if (!email) {
    return { error: 'email is required' };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: 'email format is invalid' };
  }
  if (!message) {
    return { error: 'message is required' };
  }

  return {
    name: sanitizeHeaderValue(name),
    email: sanitizeHeaderValue(email),
    message,
  };
}

function createTransporter() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is incomplete');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const validated = validateContactPayload(body || {});

    if (validated.error) {
      return Response.json({ error: validated.error }, { status: 400 });
    }

    const { name, email, message } = validated;
    const transporter = createTransporter();
    const subjectLine = `New Portfolio Contact — ${name}`;
    const text = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`;
    const html = `
      <div>
        <p><strong>Name:</strong><br/>${escapeHtml(name)}</p>
        <p><strong>Email:</strong><br/>${escapeHtml(email)}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      replyTo: email,
      to: RECIPIENT,
      subject: subjectLine,
      text,
      html,
    });

    return Response.json({ status: 'ok' });
  } catch (error) {
    console.error('Contact submit failed:', error instanceof Error ? error.message : 'unknown error');
    return Response.json({ error: 'Unable to send email' }, { status: 500 });
  }
}
