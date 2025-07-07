// server/api/groq.ts
import https from 'https'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const agent = new https.Agent({ keepAlive: true })

  let dndContext = ''
  try {
    const [monsters, spells] = await Promise.all([
      $fetch('https://www.dnd5eapi.co/api/monsters?limit=5', { agent }),
      $fetch('https://www.dnd5eapi.co/api/spells?limit=5', { agent })
    ])

    dndContext = `
      You have access to the following monsters and spells from the D&D API.
      Monsters: ${monsters.results.map(m => m.name).join(', ')}
      Spells: ${spells.results.map(s => s.name).join(', ')}
      Use them creatively in a fantasy story.
    `
  } catch (err) {
    console.warn('⚠️ Failed to fetch D&D API data:', err)
    // You may still want to continue without D&D data.
  }

  const modifiedMessages = [
    { role: 'system', content: (body.messages?.[0]?.content || '') + '\n\n' + dndContext },
    ...body.messages?.slice(1) || []
  ]

  let retries = 3
  while (retries > 0) {
    try {
      const response = await $fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: {
          model: 'llama3-8b-8192',
          messages: modifiedMessages,
          temperature: 0.8
        },
        timeout: 20000,
        agent
      })

  
    const content = response?.choices?.[0]?.message?.content
      if (!content) throw new Error('No content from Groq')

      const parsed = safeParseJSON(content)

      if (parsed && parsed.narrative) {
        return {
          narrative: parsed.narrative,
          options: parsed.options || []
        }
      } else {
        console.warn('⚠️ JSON parse failed, fallback to raw content.')
        return {
          narrative: content,
          options: []
        }
      }


    } catch (err) {
      console.warn(`Groq request failed (retries left: ${retries - 1}):`, err)
      retries--
    }
  }

  function safeParseJSON(content: string) {
    try {
      return JSON.parse(content)
    } catch (err) {
      // Try to fix common issues
      const cleaned = content
        .trim()
        .replace(/(\r\n|\r|\n)/g, '') // remove newlines
        .replace(/,\s*}/g, '}')       // remove trailing commas
        .replace(/,\s*]/g, ']')       // remove trailing commas
        .replace(/[\u2018\u2019]/g, "'") // fancy quotes to straight quotes
        .replace(/[\u201C\u201D]/g, '"') // fancy double quotes to regular
      try {
        return JSON.parse(cleaned)
      } catch (e2) {
        console.warn('⚠️ Still failed to parse Groq content.')
        return null
      }
    }
  }


  // Fallback if all retries fail
  return {
    narrative: "The world stutters and goes dim, as if some greater force hesitates... our storyteller is moving slowly...",
    options: ['Rouse the storyteller and try again']
  }
})
