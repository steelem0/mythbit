export async function useDnDSpells(limit = 10) {
  const response = await $fetch('https://www.dnd5eapi.co/api/spells')
  const fullList = response.results || []

  const random = fullList.sort(() => 0.5 - Math.random()).slice(0, limit)
  const details = await Promise.all(
    random.map(s => $fetch(`https://www.dnd5eapi.co${s.url}`))
  )

  return details
}
