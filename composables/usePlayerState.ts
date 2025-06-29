// File: composables/usePlayerState.ts
import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

const player = useStorage('mythbit-player', {
  class: null,
  race: null,
})

export function usePlayerState() {
  const setPlayer = (data: { class: any, race: any }) => {
    player.value = {
      class: data.class,
      race: data.race
    }
  }

  const clearPlayer = () => {
    player.value = { class: null, race: null }
  }

  return {
    player,
    setPlayer,
    clearPlayer
  }
}
