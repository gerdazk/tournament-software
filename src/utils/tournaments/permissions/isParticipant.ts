type IsParticipantProps = {
  id: number
  participants: {
    userId: number
    tournamentId: number
  }[]
}

export const isParticipant = ({ id, participants }: IsParticipantProps) => {
  return participants.find(({ userId }) => id === userId)
}
