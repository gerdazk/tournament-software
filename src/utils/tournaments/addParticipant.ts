export async function addParticipant(props: any) {
  const response = await fetch('/api/tournament/participants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...props })
  })

  const data = await response.json()
  return data
}
