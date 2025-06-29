<template>
  <div class="gamelog-container py-10">
    <div v-for="(entry, index) in entries" :key="index" class="entry">
      <p :class="entry.from">{{ entry.text }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  entries: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.gamelog-container {
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
  background-color: #1f2937; /* gray-800 */
  border-radius: 0.5rem;
}

.entry {
  margin-bottom: 1rem;
}

.system {
  color: #9ca3af; /* gray-400 */
  font-style: italic;
}

.player {
  color: #34d399; /* teal-400 */
  text-align: right;
}
</style>
