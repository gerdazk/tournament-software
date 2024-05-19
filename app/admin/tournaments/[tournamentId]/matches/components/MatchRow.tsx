'use client'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Pencil, Users } from 'lucide-react'
import { useState } from 'react'
import { OrderOfPlay, Participant, ScoreUnit, Tournament } from '@prisma/client'
import { normalizeScore } from '@/src/utils/normalizeScore'

import { EditMatchAssignmentDialog } from '../../schedule/components/EditMatchAssignmentDialog'
import { getDaysBetweenDates } from '../../schedule/utils/getDaysBetweenDates'

import { ScoreEntryDialog } from './ScoreEntryDialog'

type MatchRowProps = {
  participants: Participant[]
  score: string
  id: number
  startTime: Date
  OrderOfPlay: OrderOfPlay
  shouldAllowEditing?: boolean
  winnerId?: number
  tournamentId: number
  ScoreUnit: ScoreUnit[]
  shouldAllowAdminEditing?: boolean
  tournament?: Tournament
}

export const MatchRow: React.FC<MatchRowProps> = ({
  participants,
  id,
  winnerId,
  startTime,
  OrderOfPlay,
  shouldAllowEditing,
  tournamentId,
  ScoreUnit,
  shouldAllowAdminEditing,
  tournament
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const hasScore = ScoreUnit?.length
  const dates = getDaysBetweenDates({ ...tournament })
  return (
    <>
      <TableRow
        key={id}
        className="cursor-default hover:bg-transparent"
        onClick={e => e.preventDefault()}
      >
        {shouldAllowAdminEditing && (
          <TableCell
            className="font-medium cursor-pointer"
            onClick={() => setEditDialogOpen(true)}
          >
            <Pencil className="w-4 h-4 hover:opacity-50" />
          </TableCell>
        )}
        {shouldAllowAdminEditing && (
          <TableCell className="font-medium cursor-pointer">
            <Users className="w-4 h-4 hover:opacity-50" />
          </TableCell>
        )}
        <TableCell className="font-medium">
          {(startTime && normalizeDate(startTime, true)) || 'TBD'}
        </TableCell>
        <TableCell className="font-medium">
          {OrderOfPlay?.Location?.name || 'TBD'}
        </TableCell>
        <TableCell
          className={`font-medium ${winnerId === participants?.[0]?.id && `text-primary font-bold`}`}
        >
          {participants?.[0]?.user?.name}
        </TableCell>
        <TableCell
          className={`font-medium ${winnerId === participants?.[1]?.id && `text-primary font-bold`}`}
        >
          {participants?.[1]?.user?.name}
        </TableCell>
        {hasScore ? (
          <TableCell className="font-medium">
            {normalizeScore(ScoreUnit)}
          </TableCell>
        ) : shouldAllowEditing ? (
          <TableCell
            className="cursor-pointer"
            onClick={() => setDialogOpen(true)}
          >
            <Button variant="outline"> Enter match score</Button>
          </TableCell>
        ) : (
          <TableCell className="font-medium">-</TableCell>
        )}
      </TableRow>
      <ScoreEntryDialog
        matchId={id}
        players={participants}
        isOpen={isDialogOpen}
        setOpen={setDialogOpen}
        tournamentId={tournamentId}
      />
      {shouldAllowAdminEditing && (
        <EditMatchAssignmentDialog
          isOpen={isEditDialogOpen}
          setOpen={setEditDialogOpen}
          tournamentId={tournamentId}
          matchId={id}
          date={startTime}
          dates={dates}
          initialLocationId={OrderOfPlay.locationId}
        />
      )}
    </>
  )
}
