import { RegistrationCard } from './RegistrationCard'

export const RegistrationsList = ({ participantions }) => {
  return (
    <div>
      {participantions.map(({ tournament, id }) => (
        <RegistrationCard key={id} {...tournament} />
      ))}
    </div>
  )
}
