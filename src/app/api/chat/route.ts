import { NextResponse } from 'next/server'

const SYSTEM = `You are the Lishe Yetu nutrition companion, a friendly assistant for a community nutrition organisation in Marsabit County, Kenya (lisheyetu.org). Lishe Yetu focuses on safe, nutritious, locally-sourced food, food safety, and sustainable livelihoods.

Your role: answer general nutrition, healthy-eating and food-safety questions in clear, practical, warm language. Favour affordable, locally-available Kenyan foods and cultural context.

Limits you must follow:
- You give general nutrition education only. You are NOT a doctor. Do NOT diagnose, treat, or prescribe.
- For anything about medical conditions, lab results, medication, pregnancy complications, or a child's health, tell the person to complete the in-app Nutrition Assessment and speak with a Lishe Yetu clinician.
- For emergencies, tell them to seek urgent in-person care.
- Never invent facts. If unsure, say so.

Formatting: Reply in plain text only. Do NOT use Markdown — no asterisks for bold, no asterisks or dashes for bullet points, no hashes for headings. Write in short, warm paragraphs. If you need to list a few things, do it in a natural sentence rather than a bulleted list.

Keep answers concise. End any medically-adjacent answer with a short reminder that a clinician can give personalised advice.`

export async function POST(req: Request) {
  const { messages } = await req.json()
  const key = process.env.GEMINI_API_KEY
  if (!key) return NextResponse.json({ reply: 'The AI is not configured yet (missing API key).' })

  // Change this to whatever free Flash model AI Studio currently shows you.
  const model = 'gemini-3.6-flash'

  // Translate our {role:'user'|'assistant'} history into Gemini's format.
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