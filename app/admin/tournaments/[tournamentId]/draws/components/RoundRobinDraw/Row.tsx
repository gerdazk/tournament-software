import { findPlayerByDrawOrderNo } from '@/src/utils/findPlayerByDrawOrderNo'

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
        const participant1 = findPlayerByDrawOrderNo({
          players,
          orderNo: drawPositionNo
        })
        const participant2 = findPlayerByDrawOrderNo({
          players,
          orderNo: position
        })

        const participants = `${participant1?.value},${participant2?.value}`

        return shouldBeBlank ? (
          <BlankCell key={position} />
        ) : (
          <Cell key={position} drawId={drawId} participants={participants} />
        )
      })}
    </div>
  )
}
