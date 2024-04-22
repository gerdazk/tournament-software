export async function createDraw({ tournamentId, ...props }) {
  const response = await fetch(`/api/tournament/${tournamentId}/draws`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...props })
  })

  const data = await response.json()
  return data
}
