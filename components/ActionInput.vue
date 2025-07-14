<template>
  <form @submit.prevent="submitAction" class="space-y-4">
    <div class="flex gap-2 space-y-2">
      <InputText v-model="input" placeholder="What do you do?" class="flex-1" />
      <Button type="submit" label="Send" />
    </div>
      <div v-if="options?.length" class="w-full space-y-2">
        <p>.. or choose: </p>
        <div v-for="(option, idx) in options" :key="idx">
          <Button
            @click="$emit('submit', option)"
            :label="option"
            class="p-button-sm p-button-outlined w-full"
          />
        </div>
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
