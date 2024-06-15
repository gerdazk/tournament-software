import React, { useState } from 'react'
import { Draw } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { findPlayerByDrawOrderNo } from '@/src/utils/findPlayerByDrawOrderNo'
import { ConfirmationDialog } from '@/src/components/Dialogs/ConfirmationDialog'

import { Participant } from '../../types'
import { updateParticipants } from '../../utils/updateParticipants'
import { publishDraw } from '../../utils/publishDraw'

import { Cell } from './Cell'
import { Row } from './Row'

type RoundRobinDrawProps = {
  draw: Draw
  players: Participant[]
  onUpdate: () => void
}

export const RoundRobinDraw: React.FC<RoundRobinDrawProps> = ({
  draw,
  players,
  onUpdate
}) => {
  const [participants, setParticipants] = useState(players)
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false)
  const [isSaved, setSaved] = useState(true)
  const [isSaveLoading, setSaveLoading] = useState(false)
  const [isPublishLoading, setPublishLoading] = useState(false)
  const participantIds = participants.map(({ id }) => id)

  const drawPositions = Array.from(
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
      ({ value }) => value !== newValue
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
    setSaveLoading(true)
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
    onUpdate()
    setSaveLoading(false)
  }

  const handlePublish = async () => {
    setPublishLoading(true)
    await publishDraw(draw)
    onUpdate()
    setPublishLoading(false)
  }

  const handleDelete = async () => {
    try {
      await fetch(`/api/tournament/1/draws?id=${draw.id}`, {
        method: 'DELETE'
      })
      onUpdate()
      setDeleteConfirmationDialogOpen(false)
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <div className="flex gap-3 flex-col align-start">
      <div className="flex gap-3 my-3 overflow-auto">
        <Button
          disabled={isSaved}
          variant="default"
          onClick={() => handleSave()}
          isLoading={isSaveLoading}
        >
          Save your changes
        </Button>
        <Button
          disabled={!isSaved || draw.isPublished}
          variant="outline"
          onClick={() => handlePublish()}
          isLoading={isPublishLoading}
        >
          {draw.isPublished ? 'Published' : 'Publish the draw'}
        </Button>
        <Button
          disabled={draw.isPublished}
          variant="destructive"
          onClick={() => setDeleteConfirmationDialogOpen(true)}
        >
          Delete the draw
        </Button>
      </div>
      <div className={`grid grid-rows-${draw.numOfTeams + 1}`}>
        <div className={`grid grid-cols-${draw.numOfTeams + 1}`}>
          <Cell></Cell>
          {drawPositions.map((position, i) => {
            const participant = findPlayerByDrawOrderNo({
              players: participants,
              orderNo: i + 1
            })
            return <Cell key={position}>{participant?.label || position}</Cell>
          })}
        </div>
        {drawPositions.map((position, i) => {
          return (
            <Row
              participantIds={participantIds}
              drawPositions={drawPositions}
              drawPositionNo={position}
              key={position}
              players={participants}
              handlePlayerChange={handlePlayerChange}
              drawId={draw.id}
              isPublished={draw.isPublished}
            />
          )
        })}
      </div>
      {isDeleteConfirmationDialogOpen && (
        <ConfirmationDialog
          onSubmit={handleDelete}
          onCancel={() => setDeleteConfirmationDialogOpen(false)}
          title="Are you sure you want to delete this draw?"
          subtitle="This action can not be undone."
          isOpen={isDeleteConfirmationDialogOpen}
          onOpenChange={setDeleteConfirmationDialogOpen}
        />
      )}
    </div>
  )
}
