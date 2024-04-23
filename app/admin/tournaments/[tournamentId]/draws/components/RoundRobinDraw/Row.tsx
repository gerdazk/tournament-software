import { Participant } from '../../types'

import { BlankCell } from './BlankCell'
import { Cell } from './Cell'
import { PlayerSelectDropdown } from './PlayerSelectDropdown'

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
  return (
    <div className={`grid grid-cols-${teams?.length + 1} grid-rows-1`}>
      <PlayerSelectDropdown
        players={players}
        index={teamName}
        handleChange={handlePlayerChange}
        drawId={drawId}
        drawOrderNo={teamName}
      />
      {teams.map(name => {
        const shouldBeBlank = name === teamName
        return shouldBeBlank ? <BlankCell key={name} /> : <Cell key={name} />
      })}
    </div>
  )
}
