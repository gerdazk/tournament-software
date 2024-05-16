'use client'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { CheckIcon, ClockIcon } from 'lucide-react'
import { useState } from 'react'

import { ScoreEntryDialog } from './ScoreEntryDialog'

export const MatchRow = ({
  participants,
  score,
  id,
  winnerId,
  startTime,
  OrderOfPlay,
  shouldAllowEditing
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  return (
    <>
      <TableRow
        key={id}
        className="cursor-pointer"
        onClick={e => e.preventDefault()}
      >
        <TableCell className="font-medium">
          {score ? (
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
        {score ? (
          <TableCell className="font-medium">{score}</TableCell>
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
      />
    </>
  )
}
