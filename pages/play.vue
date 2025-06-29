
<template>
  <div class="py-10 max-w-4xl mx-auto space-y-6">
    <section class="bg-gray-800 p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-2">Adventure Awaits</h2>
      <p class="text-gray-300">
        You are a <strong>{{ player.race?.name }}</strong> <strong>{{ player.class?.name }}</strong>. Your story begins...
      </p>
    </section>

    <section class="my-10 bg-gray-800 p-6 rounded-lg shadow">
      <GameLog  :entries="log" />
      <ActionInput :options="options" @submit="handleAction" />
    </section>
  </div>
</template>

<script setup>
import { sendToMCP } from '@/composables/useMCP'
import { ref, onMounted } from 'vue'
import { usePlayerState } from '@/composables/usePlayerState'
import GameLog from '@/components/GameLog.vue'
import ActionInput from '@/components/ActionInput.vue'
import { useRouter } from 'vue-router'

const { player } = usePlayerState()
const router = useRouter()
const log = ref([])
const options = ref([])

onMounted(() => {
    if (!player.value.class || !player.value.race) {
        router.push('/')
    } else {
        log.value.push({ from: 'system', text: `You are a brave ${player.value.race.name} ${player.value.class.name}.` })
        log.value.push({ from: 'system', text: `You awaken in a quiet tavern. A fire crackles beside you.` })
    }
})

 

async function handleAction(input) {
  log.value.push({ from: 'player', text: input })

  const { narrative, nextOptions } = await sendToMCP(input, log)

  log.value.push({ from: 'system', text: narrative })

  options.value = nextOptions || [] // fallback to empty array if undefined
}
watch(options, (val) => {
  console.log('Updated options:', val)
})


</script>

<style scoped>
/* Optional page styling */
</style>
