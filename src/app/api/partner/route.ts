import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const ALLOWED_INTERESTS = [
  'Community outreach',
  'Kitchen gardens',
  'Organisation partnership',
  'Volunteering',
  'Funding or sponsorship',
];

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot filled = bot. Pretend success, send nothing.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 150);
  const phone = clean(body.phone, 20);
  const organisation = clean(body.organisation, 120);
  const message = clean(body.message, 1000);
  const interests = Array.isArray(body.interests)
    ? body.interests.filter(
        (i): i is string => typeof i === 'string' && ALLOWED_INTERESTS.includes(i)
      )
    : [];

  if (name.length < 2) {
    return NextResponse.json({ error: 'Enter your full name.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }
  if (interests.length === 0) {
    return NextResponse.json(
      { error: 'Pick at least one way you would like to get involved.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email is not configured yet.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.PARTNER_TO_EMAIL || 'info@lisheyetu.org';
  const from =
    process.env.PARTNER_FROM_EMAIL || 'Lishe Yetu Website <website@lisheyetu.org>';

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Organisation', organisation || '—'],
    ['Interested in', interests.join(', ')],
    ['Message', message || '—'],
  ];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#1B3C1B;padding:20px 24px">
      <h1 style="margin:0;color:#fff;font-size:20px">New partner enquiry</h1>
      <p style="margin:4px 0 0;color:#cfd3b8;font-size:13px">Sent from the Partner With Us form on lisheyetu.org</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:15px">
      ${rows
        .map(
          ([k, v]) => `
        <tr>
          <td style="padding:12px 24px;border-bottom:1px solid #f0f0f0;color:#8C926B;font-weight:bold;width:140px;vertical-align:top">${k}</td>
          <td style="padding:12px 24px;border-bottom:1px solid #f0f0f0;color:#1f2937;white-space:pre-wrap">${escapeHtml(v)}</td>
        </tr>`
        )
        .join('')}
    </table>
    <p style="padding:16px 24px;margin:0;color:#6b7280;font-size:13px">Hit Reply to respond directly to ${escapeHtml(name)}.</p>
  </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `New partner enquiry: ${name}${organisation ? ` (${organisation})` : ''}`,
    html,
    text,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Your details were not sent. Please try again in a moment.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}