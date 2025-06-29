// server/api/groq.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  // ✅ Validate input shape
  if (
    !body ||
    typeof body !== 'object' ||
    !Array.isArray(body.messages) ||
    !body.model
  ) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request body: must include `model` and `messages` array.'
    })
  }

  // 🧠 Log the clean input
  console.log('📦 Sending to Groq:\n', JSON.stringify(body, null, 2))

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: body.model,
      messages: body.messages,
      temperature: body.temperature ?? 0.8
    })
  })

  // 🛑 Handle invalid JSON or Groq crashing
  let data
  try {
    data = await res.json()
  } catch {
    const fallback = await res.text()
    console.error('❌ Groq returned invalid JSON:', fallback)
    throw createError({ statusCode: 500, message: fallback })
  }

  // 🚨 Groq rejected the request
  if (!res.ok) {
    console.error('❌ Groq API Error:', data)
    throw createError({ statusCode: res.status, message: data?.error?.message || 'Groq request failed' })
  }

  // ✅ Success
  return data
})
