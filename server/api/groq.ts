export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  // Fetch D&D data
  const [monsters, spells] = await Promise.all([
    $fetch('https://www.dnd5eapi.co/api/monsters?limit=5'),
    $fetch('https://www.dnd5eapi.co/api/spells?limit=5')
  ])

  // Inject into system message
  const dndContext = `
You have access to the following monsters and spells from the D&D API.
Monsters: ${monsters.results.map(m => m.name).join(', ')}
Spells: ${spells.results.map(s => s.name).join(', ')}
Use them creatively in a fantasy story.
`

  const modifiedMessages = [
    { role: 'system', content: body.messages[0].content + '\n\n' + dndContext },
    ...body.messages.slice(1)
  ]

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      temperature: 0.8,
      messages: modifiedMessages
    })
  })

  const data = await res.json()
  return data
})
