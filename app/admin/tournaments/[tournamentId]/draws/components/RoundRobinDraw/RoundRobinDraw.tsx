import React, { useState } from 'react'
import { Draw } from '@prisma/client'
import { Button } from '@/components/ui/button'

import { Participant } from '../../types'
import { updateParticipants } from '../../utils/updateParticipants'
import { publishDraw } from '../../utils/publishDraw'

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
  const [isLoading, setLoading] = useState(false)
  const [isSaved, setSaved] = useState(true)
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

  const handleSave = async () => {
    const normalizedParticipants = participants.map(
      ({ drawId, tournamentId, drawOrderNo, value, userId }) => ({
        id: value,
        drawId,
        tournamentId,
        drawOrderNo,
        userId
      })
    )

    await updateParticipants({
      tournamentId: draw.tournamentId,
      data: normalizedParticipants
    })
    setSaved(true)
  }

  const handlePublish = async () => {
    await publishDraw(draw)
  }

  const findParticipant = (no: number) => {
    return (
      participants.find(({ drawOrderNo }) => {
        return drawOrderNo === no
      }) || null
    )
  }

  return (
    <div className="flex gap-3 flex-col align-start">
      <div className="flex gap-3 my-3">
        <Button
          disabled={isSaved}
          variant="default"
          onClick={() => handleSave()}
        >
          Save your changes
        </Button>
        <Button
          disabled={!isSaved || draw.isPublished}
          variant="outline"
          onClick={() => handlePublish()}
        >
          Publish the draw
        </Button>
      </div>
      <div className={`grid grid-rows-${draw.numOfTeams + 1}`}>
        <div className={`grid grid-cols-${draw.numOfTeams + 1}`}>
          <Cell></Cell>
          {arrayOfParticipants.map(name => {
            const participant = findParticipant(name)
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
