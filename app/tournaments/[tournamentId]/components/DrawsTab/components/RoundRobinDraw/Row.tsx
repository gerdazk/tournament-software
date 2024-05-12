import { Participant } from '@/app/admin/tournaments/[tournamentId]/draws/types'

import { BlankCell } from './BlankCell'
import { Cell } from './Cell'

type RowProps = {
  teams: number[]
  teamName: number
  players: Participant[]
  handlePlayerChange: (player: Participant) => void
  drawId: number
}

export const Row: React.FC<RowProps> = ({
  teams,
  teamName,
  players = [],
  handlePlayerChange,
  drawId
}) => {
  const findParticipant = (no: number) => {
    return (
      players.find(({ drawOrderNo }) => {
        return drawOrderNo === no
      }) || null
    )
  }
  const participant = findParticipant(teamName)
  return (
    <div className={`grid grid-cols-${teams?.length + 1} grid-rows-1`}>
      <Cell>{participant?.label}</Cell>
      {teams.map(name => {
        const shouldBeBlank = name === teamName
        return shouldBeBlank ? <BlankCell key={name} /> : <Cell key={name} />
      })}
    </div>
  )
}
