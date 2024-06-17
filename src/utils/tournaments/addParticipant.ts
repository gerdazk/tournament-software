export async function addParticipant({ userId, tournamentId }) {
  const response = await fetch(`/api/tournament/${tournamentId}/participants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId })
  })

  const data = await response.json()
  return data
}
