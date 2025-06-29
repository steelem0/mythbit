// plugins/primevue.ts
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(PrimeVue)

  nuxtApp.vueApp.component('PrimeButton', Button)
  nuxtApp.vueApp.component('PrimeDropdown', Dropdown)
})
