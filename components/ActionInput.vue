<template>
  <form @submit.prevent="submitAction" class="space-y-4">
    <div class="flex gap-2">
      <InputText v-model="input" placeholder="What do you do?" class="flex-1" />
      <Button type="submit" label="Send" />
    </div>
    <div v-if="options?.length" class="flex flex-wrap gap-2">
      <Button
        v-for="(option, index) in options"
        :key="index"
        @click.prevent="emitOption(option)"
        :label="option"
        class="p-button-sm p-button-outlined"
      />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const input = ref('')
const emit = defineEmits(['submit'])

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  }
})

function submitAction() {
  if (input.value.trim()) {
    emit('submit', input.value.trim())
    input.value = ''
  }
}

function emitOption(option) {
  emit('submit', option)
}
</script>
