import { isParticipant } from './isParticipant'

type IsAllowedToRegisterProps = {
  is_registration_open?: boolean
  role: string
  id: number
  participants: {
    userId: number
    tournamentId: number
  }[]
}

export const isAllowedToRegister = ({
  is_registration_open,
  role,
  participants,
  id
}: IsAllowedToRegisterProps): boolean => {
  const isParticipating = isParticipant({ id, participants })
  return !isParticipating && !!(is_registration_open && role === 'user')
}
