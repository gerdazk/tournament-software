export async function removeParticipant({ id }: { id: string }) {
  const response = await fetch(`/api/tournament/participants?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  return data
}
