// composables/useStoryState.ts
import { ref } from 'vue'

const narrative = ref('')
const options = ref([])
const storyLog = ref([])
const startTime = ref(Date.now())

export function useStoryState() {
  function resetStory() {
    narrative.value = ''
    options.value = []
    storyLog.value = []
    startTime.value = Date.now()
  }

  function timeRemaining() {
    const elapsed = Date.now() - startTime.value
    return Math.max(0, 180000 - elapsed) // 3 min limit
  }

const turns = ref(0)

function incrementTurns() {
    turns.value++
    return turns.value
}


  return {
    narrative,
    options,
    storyLog,
    startTime,
    timeRemaining,
    resetStory
  }
}
