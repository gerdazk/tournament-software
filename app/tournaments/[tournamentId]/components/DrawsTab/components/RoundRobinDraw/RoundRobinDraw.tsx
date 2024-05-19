import React from 'react'
import { Draw } from '@prisma/client'
import { Participant } from '@/app/admin/tournaments/[tournamentId]/draws/types'
import { findPlayerByDrawOrderNo } from '@/src/utils/findPlayerByDrawOrderNo'

import { Cell } from './Cell'
import { Row } from './Row'

type RoundRobinDrawProps = {
  draw: Draw
  players: Participant[]
}

export const RoundRobinDraw: React.FC<RoundRobinDrawProps> = ({
  draw,
  players
}) => {
  const arrayOfParticipants = Array.from(
    { length: draw.numOfTeams },
    (_, index) => index + 1
  )

  const participantIds = players.map(({ id }) => id)

  const drawPositions = Array.from(
    { length: draw.numOfTeams },
    (_, index) => index + 1
  )

  return (
    <div className="flex gap-3 flex-col align-start">
      <div className="flex gap-3 my-3"></div>
      <div className={`grid grid-rows-${draw.numOfTeams + 1}`}>
        <div className={`grid grid-cols-${draw.numOfTeams + 1}`}>
          <Cell></Cell>
          {arrayOfParticipants.map(name => {
            const participant = findPlayerByDrawOrderNo({
              players,
              orderNo: name
            })
            return <Cell key={name}>{participant?.label || name}</Cell>
          })}
        </div>
        {drawPositions.map(position => {
          return (
            <Row
              participantIds={participantIds}
              drawPositions={drawPositions}
              drawPositionNo={position}
              key={position}
              players={players}
              drawId={draw.id}
            />
          )
        })}
      </div>
    </div>
  )
}
