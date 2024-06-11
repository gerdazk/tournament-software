import { RegistrationCard } from './RegistrationCard'

export const RegistrationsList = ({ participantions }) => {
  return (
    <div className="flex flex-col gap-2">
      {participantions.map(({ tournament, id }) => (
        <RegistrationCard key={id} {...tournament} />
      ))}
    </div>
  )
}
