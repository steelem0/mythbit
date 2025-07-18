import { usePlayerState } from './usePlayerState'
import { useStoryState } from './useStoryState'
import { systemPrompt } from './mcpSystem'

export async function sendToMCP(userInput: string) {
  const { player } = usePlayerState()
  const {
    storyLog,
    options,
    startTime,
    timeRemaining,
    turns,
    endGame,
    isGameOver,
    monster
  } = useStoryState()

  const narrative = ref('')
  const playerRace = player.value.race?.name || 'Unknown Race'
  const playerClass = player.value.class?.name || 'Unknown Class'
  const playerName = player.value.name || 'Unnamed Hero'
  const elapsed = Math.floor((Date.now() - startTime.value) / 1000)
  const timeLeft = Math.max(0, 180 - elapsed)

  const monsterDescription = monster.value
    ? `You are destined to encounter a terrifying creature: ${monster.value.name}. It is known for ${monster.value.size?.toLowerCase()} size, and classified as a ${monster.value.type}.`
    : ''

  const memoryContext =
    `You are guiding ${playerName} a ${playerRace} ${playerClass} through a fantasy world.\n` +
    `${monsterDescription}\n` +
    `There are ${Math.ceil(timeRemaining() / 1000)} seconds remaining.\n\n` +
    storyLog.value.map(entry => `${entry.from === 'player' ? 'Player' : 'System'}: ${entry.text}`).join('\n')

  const promptInput = userInput === '[BEGIN]'
    ? `Start the game. Set the scene in a tavern named Big Bobs Draft Hovel. Begin the adventure in an epic way. Greeting the player using their name ${playerName} .`
    : userInput

  const messages = [
    systemPrompt,
    { role: 'user', content: `${memoryContext}\nPlayer: ${promptInput}` }
  ]

  const data = await $fetch('/api/groq', {
    method: 'POST',
    body: { messages }
  })

  const parsed = data

  narrative.value = parsed.narrative
  options.value = parsed.options || []
  storyLog.value.push({ from: 'player', text: userInput })
  storyLog.value.push({ from: 'system', text: parsed.narrative })
}
