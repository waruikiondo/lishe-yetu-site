import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL
  if (!key || !to) return NextResponse.json({ ok: false, error: 'not configured' })

  const { type, data } = await req.json()
  const label = type === 'appointment' ? 'appointment request' : 'nutrition intake'

  // Format every submitted field into readable lines.
  const format = (obj: Record<string, any>) =>
    Object.entries(obj)
      .map(([k, v]) => {
        const value = Array.isArray(v) ? v.join(', ') : String(v ?? '')
        if (value === '' || value === 'undefined') return null
        const nice = k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        return `${nice}: ${value}`
      })
      .filter(Boolean)
      .join('\n')

  const body = [
    `A new ${label} was submitted on the Lishe Yetu portal.`,
    '',
    format(data || {}),
  ].join('\n')

  try {
    const resend = new Resend(key)
    await resend.emails.send({
      from: 'Lishe Yetu <onboarding@resend.dev>',
      to,
      subject: `New ${label} — Lishe Yetu`,
      text: body,
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) })
  }
}
