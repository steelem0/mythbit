import { usePlayerState } from './usePlayerState'
import { useStoryState } from './useStoryState'
import { useGroq } from './useGroq'
import { systemPrompt } from './mcpSystem'

export async function sendToMCP(userInput: string) {
  const { player } = usePlayerState()
  const { narrative, options, storyLog, timeRemaining } = useStoryState()

  const playerRace = player.value.race?.name || 'Unknown Race'
  const playerClass = player.value.class?.name || 'Unknown Class'
  const playerName = player.value.name || 'Unnamed Hero'

  const memoryContext =
    `You are guiding a ${playerRace} ${playerClass} through a fantasy world.\n` +
    `There are ${Math.ceil(timeRemaining() / 1000)} seconds remaining.\n\n` +
    storyLog.value.map(entry => `${entry.from === 'player' ? 'Player' : 'System'}: ${entry.text}`).join('\n')

  const messages = [
    systemPrompt,
    { role: 'user', content: `${memoryContext}\nPlayer: ${userInput}` }
  ]

  const { narrative: responseText, options: nextOptions } = await useGroq(messages)

  narrative.value = responseText
  options.value = nextOptions || []
  storyLog.value.push({ from: 'player', text: userInput })
  storyLog.value.push({ from: 'system', text: responseText })
}
