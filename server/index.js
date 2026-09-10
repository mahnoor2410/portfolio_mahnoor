import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER || 'mahnoorshahid2410@gmail.com';
// Gmail App Passwords are often copied with spaces; strip them for auth.
const SMTP_PASS = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
const RECIPIENT = process.env.SMTP_RECIPIENT || SMTP_USER || 'mahnoorshahid2410@gmail.com';
// Port 4000 is commonly taken by NoMachine (nxd) on Linux desktops.
const PORT = Number(process.env.PORT) || 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const looksLikeGmailAppPassword = /^[a-zA-Z0-9]{16}$/.test(SMTP_PASS);

/** Strip CR/LF to prevent email header injection. */
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

function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function sendViaSmtp({ name, email, message }) {
  const transporter = createSmtpTransporter();
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
}

/**
 * Fallback when Gmail SMTP_PASS is missing/invalid.
 * Uses FormSubmit AJAX (activation email is sent once to RECIPIENT).
 */
async function sendViaFormSubmit({ name, email, message }) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _replyto: email,
      _subject: `New Portfolio Contact — ${name}`,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || data.error || 'FormSubmit request failed');
  }
  return data;
}

async function deliverContactMessage(payload) {
  if (looksLikeGmailAppPassword) {
    try {
      await sendViaSmtp(payload);
      return { channel: 'smtp' };
    } catch (error) {
      console.error('SMTP send failed, trying FormSubmit fallback:', error instanceof Error ? error.message : 'unknown');
    }
  } else {
    console.warn(
      'SMTP_PASS is not a valid 16-character Gmail App Password. Using FormSubmit fallback. Update .env SMTP_PASS to enable Gmail SMTP.',
    );
  }

  await sendViaFormSubmit(payload);
  return { channel: 'formsubmit' };
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const validated = validateContactPayload(req.body);

  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }

  try {
    const result = await deliverContactMessage(validated);
    return res.status(200).json({ status: 'ok', channel: result.channel });
  } catch (error) {
    console.error('Contact submit failed:', error instanceof Error ? error.message : 'unknown error');
    return res.status(500).json({ error: 'Unable to send email' });
  }
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    smtpConfigured: looksLikeGmailAppPassword,
    port: PORT,
  });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
  console.log(`Email mode: ${looksLikeGmailAppPassword ? 'Gmail SMTP' : 'FormSubmit fallback'}`);
});
