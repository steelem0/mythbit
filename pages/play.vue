<template>
  <div class="py-10 max-w-4xl mx-auto space-y-6">
    <section class="bg-gray-800 p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-2">Adventure Awaits</h2>
      <p class="text-gray-300">
        You are a <strong>{{ player.race?.name }}</strong> <strong>{{ player.class?.name }}</strong>. Your story begins...
      </p>
    </section>

    <section class="my-10 bg-gray-800 p-6 rounded-lg shadow">
      <GameLog :entries="storyLog" />
      <ActionInput :options="options" @submit="handleAction" />
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

const { player } = usePlayerState()
const { narrative, options, storyLog, timeRemaining } = useStoryState()
const router = useRouter()

onMounted(() => {
  if (!player.value.class || !player.value.race) {
    router.push('/')
  } else {
    storyLog.value.push({ from: 'system', text: `You are a brave ${player.value.race.name} ${player.value.class.name}.` })
    storyLog.value.push({ from: 'system', text: `You awaken in a quiet tavern. A fire crackles beside you.` })
  }
})

async function handleAction(input) {
  await sendToMCP(input)

  if (timeRemaining() <= 0) {
    options.value = []
    storyLog.value.push({ from: 'system', text: "Your tale comes to an end..." })
  }

  /*
  if (incrementTurns() >= 5) {
    options.value = []
    storyLog.value.push({ from: 'system', text: "Your journey has reached its end..." })
  }
    */

}

watch(options, (val) => {
  console.log('Updated options:', val)
})
</script>
