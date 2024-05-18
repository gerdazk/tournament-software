import { Participant } from '../../types'

import { BlankCell } from './BlankCell'
import { Cell } from './Cell'
import { PlayerSelectDropdown } from './PlayerSelectDropdown'

type RowProps = {
  drawPositions: number[]
  participantIds: number[]
  drawPositionNo: number
  players: Participant[]
  handlePlayerChange: (player: Participant) => void
  drawId: number
}

export const Row: React.FC<RowProps> = ({
  participantIds,
  drawPositions,
  drawPositionNo,
  players = [],
  handlePlayerChange,
  drawId
}) => {
  return (
    <div className={`grid grid-cols-${drawPositions?.length + 1} grid-rows-1`}>
      <PlayerSelectDropdown
        players={players}
        handleChange={handlePlayerChange}
        drawId={drawId}
        drawOrderNo={drawPositionNo}
      />
      {drawPositions.map(position => {
        const shouldBeBlank = position === drawPositionNo
        return shouldBeBlank ? (
          <BlankCell key={position} />
        ) : (
          <Cell key={position} />
        )
      })}
    </div>
  )
}
