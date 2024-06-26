import { findPlayerByDrawOrderNo } from '@/src/utils/findPlayerByDrawOrderNo'

import { Participant } from '../../types'

import { BlankCell } from './BlankCell'
import { Cell } from './Cell'
import { PlayerSelectDropdown } from './PlayerSelectDropdown'

type RowProps = {
  drawPositions: number[]
  drawPositionNo: number
  players: Participant[]
  handlePlayerChange: (player: Participant) => void
  drawId: number
  isPublished?: boolean
}

export const Row: React.FC<RowProps> = ({
  drawPositions,
  drawPositionNo,
  players = [],
  handlePlayerChange,
  drawId,
  isPublished
}) => {
  return (
    <div className={`grid grid-cols-${drawPositions?.length + 1} grid-rows-1`}>
      <PlayerSelectDropdown
        players={players}
        disabled={isPublished}
        handleChange={handlePlayerChange}
        drawId={drawId}
        drawOrderNo={drawPositionNo}
      />
      {drawPositions.map(position => {
        const shouldBeBlank = position === drawPositionNo
        const participant1 = findPlayerByDrawOrderNo({
          players,
          orderNo: drawPositionNo
        })
        const participant2 = findPlayerByDrawOrderNo({
          players,
          orderNo: position
        })

        return shouldBeBlank ? (
          <BlankCell key={position} />
        ) : (
          <Cell
            key={position}
            drawId={drawId}
            targetParticipantId={participant1?.value}
            opponentParticipantId={participant2?.value}
          />
        )
      })}
    </div>
  )
}
