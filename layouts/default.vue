<template>
  <div class="layout-wrapper">
  <header class="bg-gray-900 text-white shadow-md">
    <nav class="container mx-auto flex items-center justify-between px-4 py-4">
 
      <!-- Desktop Nav -->
    <div class="hidden md:flex space-x-4">
      <Button @click="navigateTo('/')" class="px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-teal-600 bg-teal-500">
        Home
      </Button>
      <Button @click="navigateTo('/play')" class="px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-teal-600 bg-teal-500">
        Play
      </Button>
      <Button @click="navigateTo('/about')" class="px-4 py-2 rounded-md text-sm font-semibold text-white hover:bg-teal-600 bg-teal-500">
        About
      </Button>
    </div>
    </nav>
  </header>


    <!-- MAIN -->
    <main class="main-content">
      <NuxtPage />
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-800 text-gray-400 text-center py-4">
      <p class="text-sm">&copy; 2025 Mythbit. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'

</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111827; 

}

.main-content {
  flex: 1;

}
</style>
