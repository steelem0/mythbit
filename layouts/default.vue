<template>
  <div class="layout-wrapper">
    <Menubar :model="menuItems" class="bg-gray-800 text-white border-none">
      <template #start>
        <NuxtLink to="/" class="text-xl font-bold text-white hover:text-teal-300">Mythbit</NuxtLink>
      </template>
    </Menubar>

    <main class="main-content">
      <NuxtPage />
    </main>

    <footer class="footer">
      <Panel class="text-gray-400 text-center border-none shadow-none rounded-none" :toggleable="false">
        <template #header>
          <span class="text-sm">Footer</span>
        </template>
        &copy; 2025 Mythbit. All rights reserved.
      </Panel>
    </footer>
  </div>
</template>


<script setup>
import Menubar from 'primevue/menubar'
import Panel from 'primevue/panel'

const menuItems = [
  { label: 'Home', to: '/' },
  { label: 'Play', to: '/play' },
  { label: 'About', to: '/about' }
]
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111827; /* Tailwind's gray-900 */
  color: white;
}

.main-content {
  flex: 1;
  padding: 1rem;
}

.footer {
  background-color: #1f2937; /* Tailwind's gray-800 */
}

</style>