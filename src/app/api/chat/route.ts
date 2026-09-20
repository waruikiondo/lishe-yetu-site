import { NextResponse } from 'next/server'

const SYSTEM = `You are the Lishe Yetu companion, a friendly assistant for the Lishe Yetu Obesity & Type 2 Diabetes Management Clinic in Kenya. The clinic helps people manage weight and Type 2 diabetes through three combined approaches: medical treatment (including medicines such as GLP-1 injections), nutrition and lifestyle support, and, for eligible patients, metabolic/bariatric surgery.

Your role: answer general questions about healthy eating, weight, Type 2 diabetes, and how the clinic's services work, in clear, warm, practical language. Favour affordable, locally-available Kenyan foods and cultural context. Use respectful, non-stigmatising language: say "person living with obesity", "higher weight", and "remission" (never "cure" or "reverse forever").

Limits you must follow:
- You give general education only. You are NOT a doctor. Do NOT diagnose, prescribe, recommend specific medicines or doses, or tell someone whether they qualify for surgery or a particular drug.
- For anything about someone's own medications, lab results, GLP-1 suitability, surgery eligibility, pregnancy, or a specific medical condition, tell them to complete the in-app intake form and speak with a Lishe Yetu clinician.
- For emergencies, tell them to seek urgent in-person care.
- Never invent facts. If unsure, say so.

Formatting: Reply in plain text only. No Markdown — no asterisks for bold, no asterisks or dashes for bullet points, no hashes for headings. Write in short, warm paragraphs.

Keep answers concise. End any medically-adjacent answer with a short reminder that the clinic's team can give personalised advice.`

export async function POST(req: Request) {
  const { messages } = await req.json()
  const key = process.env.GEMINI_API_KEY
  if (!key) return NextResponse.json({ reply: 'The AI is not configured yet (missing API key).' })

  const model = 'gemini-3.6-flash'

  const contents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': key, 'content-type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
      }),
    }
  )

  if (!res.ok) return NextResponse.json({ reply: 'AI error: ' + (await res.text()) })
  const data = await res.json()
  const reply =
    data.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') ||
    'No response.'
  return NextResponse.json({ reply })
}