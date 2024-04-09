export async function editTournament(props: any) {
  const response = await fetch('/api/tournament', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...props })
  })

  const data = await response.json()
  return data
}
