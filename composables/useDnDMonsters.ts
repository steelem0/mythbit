export async function useDnDMonsters(limit = 10) {
  const response = await $fetch('https://www.dnd5eapi.co/api/monsters')
  const fullList = response.results || []

  const randomList = fullList.sort(() => 0.5 - Math.random()).slice(0, limit)
  const details = await Promise.all(
    randomList.map(m => $fetch(`https://www.dnd5eapi.co${m.url}`))
  )

  return details
}

export async function getRandomMonster() {
  const response = await $fetch('https://www.dnd5eapi.co/api/monsters')
  const fullList = response.results || []

  const randomMonster = fullList[Math.floor(Math.random() * fullList.length)]
  const details = await $fetch(`https://www.dnd5eapi.co${randomMonster.url}`)

  return details
}
