// composables/useStoryState.ts
import { useState } from '#app'
import { usePlayerState } from './usePlayerState'

export function useStoryState() {
  const { player } = usePlayerState()
  const storyLog = useState('storyLog', () => [])
  const options = useState('options', () => [])
  const turns = useState('turns', () => 0)
  const startTime = useState('startTime', () => Date.now())
  const narrative = ref('')
  const monster = ref(null)

  function timeRemaining() {
    const elapsed = Date.now() - startTime.value
    return Math.max(0, 180000 - elapsed)
  }

  function incrementTurns() {
    turns.value += 1
    return turns.value
  }

  function isGameOver() {
    return turns.value >= 15 || timeRemaining() <= 0 || options.value.length === 0
  }

  function endGame() {
    options.value = []
    storyLog.value.push({
      from: 'system',
      text: "Your tale has come to an end. The world fades to black..."
    })

  const finalRecord = {
      player: player.value,
      turns: turns.value,
      log: [...storyLog.value],
      timestamp: new Date().toISOString()
    }

  const pastGames = JSON.parse(localStorage.getItem('mythbit-history') || '[]')
    pastGames.push(finalRecord)
    localStorage.setItem('mythbit-history', JSON.stringify(pastGames))
  }

  function restartGame() {
    turns.value = 0
    storyLog.value = []
    options.value = []
    startTime.value = Date.now()
  }

  return {
    storyLog,
    options,
    turns,
    startTime,
    timeRemaining,
    isGameOver,
    endGame,
    restartGame,
    narrative,
    incrementTurns,
    monster 
  }
}
