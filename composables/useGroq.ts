export async function useGroq(messages) {
  let data
  try {
    data = await $fetch('/api/groq', {
      method: 'POST',
      body: {
        model: 'llama3-8b-8192',
        messages,
        temperature: 0.8
      }
    })
  } catch (err) {
    console.error('❌ API call to Groq failed:', err)
    return { narrative: 'The gods are silent...', options: [] }
  }

  const content = data?.choices?.[0]?.message?.content

  if (!content) {
    console.warn('⚠️ No content returned from Groq')
    return { narrative: 'An eerie silence fills the air...', options: [] }
  }

  let narrative = ''
  let options = []

  try {
    const parsed = JSON.parse(content)
    narrative = parsed.narrative || 'The story continues...'
    options = parsed.options || []
  } catch (err) {
    console.error('⚠️ Failed to parse JSON from Groq response. Raw content:', content)
    narrative = content.trim()
  }

  return { narrative, options }
}
