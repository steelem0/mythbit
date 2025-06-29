import { ref } from 'vue'

const API_BASE = 'https://www.dnd5eapi.co/api'

export function useDndApi() {
  const classes = ref([])
  const races = ref([])

  const getClasses = async () => {
    try {
      const res = await fetch(`${API_BASE}/classes`)
      const data = await res.json()
      classes.value = data.results.map(c => ({ name: capitalize(c.name), index: c.index }))
    } catch (e) {
      console.error('Failed to fetch classes:', e)
    }
  }

  const getRaces = async () => {
    try {
      const res = await fetch(`${API_BASE}/races`)
      const data = await res.json()
      races.value = data.results.map(r => ({ name: capitalize(r.name), index: r.index }))
    } catch (e) {
      console.error('Failed to fetch races:', e)
    }
  }

  const getSpellsForClass = async (classIndex: string) => {
    try {
      const res = await fetch(`${API_BASE}/classes/${classIndex}/spells`)
      const data = await res.json()
      return data.results.map(s => ({ name: capitalize(s.name), index: s.index }))
    } catch (e) {
      console.error(`Failed to fetch spells for class ${classIndex}:`, e)
      return []
    }
  }

  function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return {
    classes,
    races,
    getClasses,
    getRaces,
    getSpellsForClass,
  }
}


// NOTE: Call getClasses() and getRaces() in index.vue onMounted()
// Then use `classes.value` and `races.value` for dropdowns
