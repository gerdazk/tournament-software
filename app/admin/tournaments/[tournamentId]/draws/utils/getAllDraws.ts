export async function getAllDraws({ tournamentId }: { tournamentId: string }) {
  const response = await fetch(`/api/tournament/${tournamentId}/draws`)

  const data = await response.json()
  return data?.draws
}
