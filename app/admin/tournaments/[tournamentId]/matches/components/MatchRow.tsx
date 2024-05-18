'use client'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { CheckIcon, ClockIcon } from 'lucide-react'
import { useState } from 'react'
import { OrderOfPlay, Participant, ScoreUnit } from '@prisma/client'
import { normalizeScore } from '@/src/utils/normalizeScore'

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
}

export const MatchRow: React.FC<MatchRowProps> = ({
  participants,
  id,
  winnerId,
  startTime,
  OrderOfPlay,
  shouldAllowEditing,
  tournamentId,
  ScoreUnit
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const hasScore = ScoreUnit?.length
  return (
    <>
      <TableRow
        key={id}
        className="cursor-pointer"
        onClick={e => e.preventDefault()}
      >
        <TableCell className="font-medium">
          {hasScore ? (
            <CheckIcon className="w-3 h-3" />
          ) : (
            <ClockIcon className="w-3 h-3" />
          )}
        </TableCell>
        <TableCell className="font-medium">
          {(startTime && normalizeDate(startTime, true)) || 'TBD'}
        </TableCell>
        <TableCell className="font-medium">
          {OrderOfPlay?.Location?.name || 'TBD'}
        </TableCell>
        <TableCell
          className={`font-medium ${winnerId === participants?.[0]?.id ? `text-primary font-bold` : `text-muted-foreground`}`}
        >
          {participants?.[0]?.user?.name}
        </TableCell>
        <TableCell
          className={`font-medium ${winnerId === participants?.[1]?.id ? `text-primary font-bold` : `text-muted-foreground`}`}
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
    </>
  )
}
