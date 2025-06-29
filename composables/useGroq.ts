export async function useGroq(messages) {
    const data = await $fetch('/api/groq', {
    method: 'POST',
    body: {
        model: 'llama3-8b-8192',
        messages,
        temperature: 0.8
    }
    })

    let content = data.choices?.[0]?.message?.content

    let narrative = ''
    let options = []

    try {
    const parsed = JSON.parse(content)
        narrative = parsed.narrative
        options = parsed.options
    } catch (err) {
        console.error('Failed to parse Groq response:', err)
        narrative = content || 'Something happened...'
    }

    return { narrative, options }

}