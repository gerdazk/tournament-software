import React, { useState } from 'react'
import { Draw } from '@prisma/client'
import { useRouter } from 'next/navigation'
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
  const [participants, setParticipants] = useState(players)
  const [isSaved, setSaved] = useState(true)
  const router = useRouter()
  const arrayOfParticipants = Array.from(
    { length: draw.numOfTeams },
    (_, index) => index + 1
  )

  const handlePlayerChange = ({
    value: newValue,
    drawId: newDrawId,
    drawOrderNo: newDrawOrderNo,
    label,
    ...rest
  }: Participant) => {
    setSaved(false)
    const filteredParticipants = participants.filter(
      ({ drawOrderNo, drawId, value }) =>
        (newDrawId !== drawId && newDrawOrderNo !== drawOrderNo) ||
        value !== newValue
    )

    const newParticipantEntry = {
      value: newValue,
      drawId: newDrawId,
      drawOrderNo: newDrawOrderNo,
      label,
      ...rest
    }

    setParticipants([...filteredParticipants, newParticipantEntry])
  }

  return (
    <div className="flex gap-3 flex-col align-start">
      <div className="flex gap-3 my-3"></div>
      <div className={`grid grid-rows-${draw.numOfTeams + 1}`}>
        <div className={`grid grid-cols-${draw.numOfTeams + 1}`}>
          <Cell></Cell>
          {arrayOfParticipants.map(name => {
            const participant = findPlayerByDrawOrderNo({
              players: participants,
              orderNo: name
            })
            return <Cell key={name}>{participant?.label || name}</Cell>
          })}
        </div>
        {arrayOfParticipants.map(name => (
          <Row
            teams={arrayOfParticipants}
            teamName={name}
            key={name}
            players={participants}
            handlePlayerChange={handlePlayerChange}
            drawId={draw.id}
          />
        ))}
      </div>
    </div>
  )
}
