export async function updateParticipants({ tournamentId, data }) {
  const response = await fetch(`/api/tournament/${tournamentId}/participants`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const responseData = await response.json()
  return responseData
}
