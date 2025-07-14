// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    baseURL: '/mythbit/'
  },
    modules: ['@nuxt/ui'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
    css: [
    'primevue/resources/themes/aura-light-teal/theme.css',
    'primevue/resources/primevue.min.css',
    'primeicons/primeicons.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css'
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
      port: 3001,
      preset: 'node-server',
      externals:{
        allow: ['https']
      }
    }
})
