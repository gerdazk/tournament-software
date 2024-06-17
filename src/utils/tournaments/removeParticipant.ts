export async function removeParticipant({
  id,
  tournamentId
}: {
  id: string
  tournamentId: string
}) {
  const response = await fetch(
    `/api/tournament/${tournamentId}/participants?id=${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await response.json()
  return data
}
