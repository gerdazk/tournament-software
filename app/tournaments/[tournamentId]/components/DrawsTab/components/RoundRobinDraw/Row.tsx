import { Participant } from '@/app/admin/tournaments/[tournamentId]/draws/types'
import { findPlayerByDrawOrderNo } from '@/src/utils/findPlayerByDrawOrderNo'

import { BlankCell } from './BlankCell'
import { Cell } from './Cell'

type RowProps = {
  drawPositions: number[]
  participantIds: number[]
  drawPositionNo: number
  players: Participant[]
  drawId: number
}

export const Row: React.FC<RowProps> = ({
  drawPositions,
  drawPositionNo,
  players = [],
  drawId
}) => {
  const participant = findPlayerByDrawOrderNo({
    players: players,
    orderNo: drawPositionNo
  })
  return (
    <div className={`grid grid-cols-${drawPositions?.length + 1} grid-rows-1`}>
      <Cell>{participant?.label}</Cell>
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
