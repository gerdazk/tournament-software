export const getAllTournamentMatches = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`/api/tournament/${id}/matches`)

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = await response.json()
      console.log({ error })
      return
    }
  } catch (error) {
    console.error('Error fetching matches:', error)
    return
  }
}
