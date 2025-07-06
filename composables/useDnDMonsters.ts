export async function useDnDMonsters(limit = 10) {
  const response = await $fetch('https://www.dnd5eapi.co/api/monsters')
  const fullList = response.results || []

  const random = fullList.sort(() => 0.5 - Math.random()).slice(0, limit)
  const details = await Promise.all(
    random.map(m => $fetch(`https://www.dnd5eapi.co${m.url}`))
  )

  return details
}
