export default defineEventHandler(async () => {
  const response = await $fetch('https://www.dnd5eapi.co/api/monsters')
  const fullList = response.results || []

  const random = fullList.sort(() => 0.5 - Math.random()).slice(0, 1)
  const monster = await $fetch(`https://www.dnd5eapi.co${random[0].url}`)

  return monster
})
