import { usePlayerState } from './usePlayerState'
import { useStoryState } from './useStoryState'

export function getSessionContext() {
  const { player } = usePlayerState()
  const { narrative, options, timeRemaining, storyLog } = useStoryState()

  const playerRace = player.value.race?.name || 'Unknown Race'
  const playerClass = player.value.class?.name || 'Unknown Class'

  const context = {
    player: {
      name: 'Unnamed Hero',
      race: playerRace,
      class: playerClass,
    },
    currentNarrative: narrative.value,
    availableOptions: options.value,
    storyLog: storyLog.value,
    timeRemaining: Math.ceil(timeRemaining() / 1000), // in seconds
  }

  return context
}
