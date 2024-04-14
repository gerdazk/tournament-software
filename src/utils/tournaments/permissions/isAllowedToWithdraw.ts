import { isParticipant } from './isParticipant'

type IsAllowedToWithdrawProps = {
  id: number
  participants: {
    userId: number
    tournamentId: number
  }[]
  is_registration_open?: boolean
}

export const isAllowedToWithdraw = ({
  participants,
  id,
  is_registration_open
}: IsAllowedToWithdrawProps) => {
  const isRegistered = isParticipant({ participants, id })
  return is_registration_open && isRegistered
}
