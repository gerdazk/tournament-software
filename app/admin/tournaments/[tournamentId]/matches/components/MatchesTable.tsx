import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Match, Participant } from '@prisma/client'
import { CheckIcon, ClockIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Button } from '@/components/ui/button'

import { ScoreEntryDialog } from './ScoreEntryDialog'

type MatchesTableProps = {
  matches: (Match & {
    participants: Participant[]
  })[]
  shouldAllowEditing?: boolean
}

export const MatchesTable: React.FC<MatchesTableProps> = ({
  matches = [],
  shouldAllowEditing
}) => {
  const [isScoreEntryModalOpen, setScoreEntryModalOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState({})

  const handleRowClick = match => {
    setSelectedMatch(match)
    setScoreEntryModalOpen(true)
  }

  return (
    <>
      <Table className={`w-full`}>
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>Match time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-[100px]">Player 1</TableHead>
            <TableHead>Player 2</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map(
            ({ participants, score, id, winnerId, startTime, OrderOfPlay }) => {
              return participants?.length ? (
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
                      onClick={() =>
                        handleRowClick({ players: participants, matchId: id })
                      }
                    >
                      <Button variant="outline"> Enter match score</Button>
                    </TableCell>
                  ) : (
                    <TableCell className="font-medium">-</TableCell>
                  )}
                </TableRow>
              ) : (
                ''
              )
            }
          )}
        </TableBody>
      </Table>
      {/* <ScoreEntryDialog
        {...selectedMatch}
        isOpen={isScoreEntryModalOpen}
        setOpen={setScoreEntryModalOpen}
      /> */}
    </>
  )
}
