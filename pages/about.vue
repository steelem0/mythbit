<template>
  <div class="max-w-3xl mx-auto space-y-6 py-10 px-6">
    <PrimeCard>
      <template #title>About Mythbit</template>
      <template #content>
        <p class="mb-4">
          <strong>Mythbit</strong> is a lightweight, AI-guided storytelling game built with Nuxt, PrimeVue, and Groq.
          Choose your hero, embark on a fantastical journey, and interact with an AI Game Master that adapts to your choices in real time.
        </p>
        <p class="mb-4">
          This is a playful experiment in blending classic D&D mechanics with generative AI, all in a fast, responsive web app.
          Whether you're a seasoned adventurer or a curious newcomer, Mythbit invites you to explore a world of dice and destiny.
        </p>
        <p class="mb-4">
          The project is open to expansion, featuring animated sprites, dynamic encounters, and future integrations with more AI tooling.
        </p>
        <p>
          Built by <strong>Marcy Steele</strong> using Nuxt, Vue, PrimeVue, and Groq’s blazing-fast large language models.
        </p>
      </template>
    </PrimeCard>

    <PrimeCard>
      <template #title>About the Creator</template>
      <template #content>
        <p class="mb-4">
          Marcy is a digital innovation lead and mobile developer with a passion for games, storytelling, and making tech delightful.
          When she’s not writing code or wrangling microservices, she’s dreaming up ways to bring AI to life in creative ways.
        </p>
        <p>
          You might spot a cameo from her Cane Corso, Lexi 🐾, if you’re lucky.
        </p>
      </template>
    </PrimeCard>

    <PrimeCard>
      <template #title>Creative Director: Lexi</template>
      <template #content>
        <div class="flex flex-col md:flex-row items-center gap-4">
          <img
            src="assets/images/lexi.jpg"
            alt="Lexi the Creative Director"
            class="rounded-full w-32 h-32 object-cover shadow-md"
          />
          <p>
            Lexi is the official Creative Director of Mythbit. With a keen nose for adventure and a love for comfy napping spots,
            she ensures every idea gets her paw of approval before going live. If something makes you smile, she probably signed off on it.
          </p>
        </div>
      </template>
    </PrimeCard>
  </div>
</template>

<script setup>
import PrimeCard from 'primevue/card'
</script>
