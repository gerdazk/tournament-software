const generateCombinations = (players: number[]): { id: number }[][] => {
  const combinations: { id: number }[][] = []

  for (let i = 0; i < players.length - 1; i++) {
    for (let j = i + 1; j < players.length; j++) {
      combinations.push([{ id: players[i] }, { id: players[j] }])
    }
  }

  return combinations
}

export const publishDraw = async ({ tournamentId, id, participants }) => {
  const playerIds = participants.map(({ id }) => id)
  const matchCombinations = generateCombinations(playerIds)

  const bodyData = matchCombinations.map(combination => ({
    drawId: id,
    participants: {
      connect: combination
    }
  }))

  const response = await fetch(`/api/tournament/${tournamentId}/matches`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })

  const data = await response.json()
  return data
}
