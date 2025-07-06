<template>
  <div class="py-10 max-w-4xl mx-auto space-y-6 text-white font-serif">
    <!-- Header -->
    <section class="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 class="text-3xl font-bold mb-3 text-amber-400">
        Adventure Awaits, {{ player.name }}
      </h2>
      <p>
        You are a <strong class="text-teal-300">{{ player.race?.name }}</strong>
        <strong class="text-indigo-300">{{ player.class?.name }}</strong>.
        Your story begins...
      </p>
    </section>

    <!-- Story Log -->
    <section class="bg-gray-800 p-6 rounded-lg shadow-inner space-y-4 h-[60vh] overflow-y-auto border border-gray-700">
      <GameLog :entries="storyLog" />
    </section>

    <!-- Action Buttons or End -->
    <section class="bg-gray-900 p-6 rounded-lg shadow border border-gray-700 space-y-4">
       <ActionInput
        v-if="options.length > 0"
        :options="options"
        @submit="handleAction"
      />

      <div v-else class="text-center space-y-4">
        <p class="text-lg text-amber-300">Your tale has come to an end.</p>
        <button
          @click="startNewGame"
          class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Start New Adventure
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { sendToMCP } from '@/composables/useMCP'
import { onMounted, watch } from 'vue'
import { usePlayerState } from '@/composables/usePlayerState'
import { useStoryState } from '@/composables/useStoryState'
import { useRouter } from 'vue-router'
import GameLog from '@/components/GameLog.vue'
import ActionInput from '@/components/ActionInput.vue'
import { getRandomMonster } from '@/composables/useDnDMonsters'

const { player } = usePlayerState()
const { options, storyLog, timeRemaining, restartGame, turns, incrementTurns, monster } = useStoryState()
const router = useRouter()

onMounted(async () => {
  if (!player.value.class || !player.value.race) {
    router.push('/')
    return
  }

  if (storyLog.value.length > 0) {
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

  function startNewGame() {
    restartGame()
    sendToMCP('[BEGIN]')
  }

  // Restart everything
  restartGame()

  monster.value = await getRandomMonster()

  // Start new game with AI opening
  await sendToMCP('[BEGIN]')
})



async function handleAction(input) {
  await sendToMCP(input)

  if (timeRemaining() <= 0) {
    options.value = []
    storyLog.value.push({ from: 'system', text: "Your tale comes to an end..." })
  }


  if (incrementTurns() >= 15) {
    options.value = []
    storyLog.value.push({ from: 'system', text: "Your journey has reached its end..." })
  }


}

watch(options, (val) => {
  console.log('Updated options:', val)
})
</script>
