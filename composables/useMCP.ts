import { systemPrompt } from './mcpSystem'
import { usePlayerState } from './usePlayerState'
import { useGroq } from './useGroq'

export async function sendToMCP(userInput, log) {
  const { player } = usePlayerState()

  const playerData = player?.value || {}

  const playerClass = playerData.class?.name || 'Unknown Class'
  const playerRace = playerData.race?.name || 'Unknown Race'

  const memoryContext =
    `You are guiding a ${playerRace} ${playerClass} through a fantasy world.\n\n` +
    log.value
      .map(entry => `${entry.from === 'player' ? 'Player' : 'System'}: ${entry.text}`)
      .join('\n')

   const messages = [
    systemPrompt,
    { role: 'user', content: `${memoryContext}\nPlayer: ${userInput}` }
  ]

  const aiResponse = await useGroq(messages)

  const text = aiResponse?.narrative.trim() || '[No response]'


  return {
    narrative: text,
    nextOptions:  aiResponse?.options
  }
}
