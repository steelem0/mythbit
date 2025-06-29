// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
    css: [
    'primevue/resources/themes/aura-light-teal/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    '@/assets/css/tailwind.css'
  ],
  build: {
    transpile: ['primevue']
  },
    runtimeConfig: {
      GROQ_API_KEY: process.env.GROQ_API_KEY,
      public: {
        GROQ_API_KEY: process.env.GROQ_API_KEY
      }
    },
    nitro: {
      preset: 'node' 
    }
})
