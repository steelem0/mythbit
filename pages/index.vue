<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <section class="bg-gray-800 p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Welcome to Mythbit</h2>
      <p class="text-gray-300">Choose your hero and begin your AI-guided journey through a land of dice and destiny.</p>
    </section>

    <section class="bg-gray-800 p-6 rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">Begin Your Adventure</h3>
      <div class="flex flex-col md:flex-row gap-4">
        <PrimeDropdown v-model="selectedClass" :options="classes" optionLabel="name" placeholder="Select Class" class="w-full md:w-1/2" />
        <PrimeDropdown v-model="selectedRace" :options="races" optionLabel="name" placeholder="Select Race" class="w-full md:w-1/2" />
      </div>
      <div class="mt-4">
        <PrimeButton label="Start Game" @click="startGame" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PrimeDropdown from 'primevue/dropdown'
import PrimeButton from 'primevue/button'
import { useDndApi } from '@/composables/useDndApi'
import { usePlayerState } from '@/composables/usePlayerState'

const router = useRouter()
const { setPlayer } = usePlayerState()

const selectedClass = ref(null)
const selectedRace = ref(null)
const { classes, races, getClasses, getRaces } = useDndApi()

onMounted(() => {
  getClasses()
  getRaces()
})

function startGame() {
  if (selectedClass.value && selectedRace.value) {
    setPlayer({
      class: selectedClass.value,
      race: selectedRace.value
    })
    router.push('/play')
  }
}
</script>

<style scoped>
/* Optional page styling */
</style>