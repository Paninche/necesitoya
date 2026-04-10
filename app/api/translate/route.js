export async function POST(req) {
  const { text, target } = await req.json()
  if (!text || !target) return Response.json({ translation: text })

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target, format: 'text' })
    }
  )
  const data = await res.json()
  const translation = data?.data?.translations?.[0]?.translatedText || text
  return Response.json({ translation })
}