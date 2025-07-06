export async function useGroq(messages, retries = 95) {
  try {
    const data = await $fetch('/api/groq', {
      method: 'POST',
      timeout: 20000,
      body: {
        model: 'llama3-8b-8192',
        messages,
        temperature: 0.8
      }
    })

    const content = data?.choices?.[0]?.message?.content

    if (!content) {
      console.warn('⚠️ No content returned from Groq, retrying...')
      if (retries > 0) {
        return await useGroq(messages, retries - 1)
      }
      return failedResponse()
    }

    let narrative = ''
    let options = []

    try {
      const parsed = JSON.parse(content)
      narrative = parsed.narrative
      options = parsed.options
    } catch (err) {
      console.error('❌ Failed to parse Groq response:', err)
      narrative = content || ''
      if (!narrative && retries > 0) {
        return await useGroq(messages, retries - 1)
      }
    }

    // Still failed to produce narrative?
    if (!narrative.trim()) {
      return failedResponse()
    }

    return { narrative, options }
  } catch (error) {
    console.error('🔥 Groq request failed:', error)
    if (retries > 0) {
      return await useGroq(messages, retries - 1)
    }
    return failedResponse()
  }
}

function failedResponse() {
  return {
    narrative: "The world stutters and goes dim, as if some greater force hesitates... our storyteller is moving slowly.. ",
    options: ['Rouse the storyteller and try again']
  }
}
