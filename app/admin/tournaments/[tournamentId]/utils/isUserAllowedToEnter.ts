import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'

export const isUserAllowedToEnter = async ({ tournamentId, userId }) => {
  const tournament = await getTournamentById({ id: tournamentId })
  const tournamentStaff = tournament?.tournaments?.tournamentStaff?.staffMembers
  const tournamentOrganizer = tournament?.tournaments?.organizerId
  const isStaffMember =
    userId === tournamentOrganizer ||
    tournamentStaff?.find(st => st.id === userId)
  return isStaffMember
}
