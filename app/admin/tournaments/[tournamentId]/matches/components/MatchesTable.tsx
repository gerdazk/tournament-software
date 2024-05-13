import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Match, Participant } from '@prisma/client'
import { CheckIcon, ClockIcon } from 'lucide-react'
import { useState } from 'react'

import { ScoreEntryDialog } from './ScoreEntryDialog'

type MatchesTableProps = {
  matches: (Match & {
    participants: Participant[]
  })[]
}

export const MatchesTable: React.FC<MatchesTableProps> = ({ matches = [] }) => {
  const [isScoreEntryModalOpen, setScoreEntryModalOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState({})

  const handleRowClick = match => {
    console.log({ match })
    setSelectedMatch(match)
    setScoreEntryModalOpen(true)
  }

  return (
    <>
      <Table className={`w-full`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[100px]">Player 1</TableHead>
            <TableHead>Player 2</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map(({ participants, score, id, winnerId }) =>
            participants?.length ? (
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
                <TableCell className="font-medium">{score}</TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() =>
                    handleRowClick({ players: participants, matchId: id })
                  }
                >
                  Enter match score
                </TableCell>
              </TableRow>
            ) : (
              ''
            )
          )}
        </TableBody>
      </Table>
      <ScoreEntryDialog
        {...selectedMatch}
        isOpen={isScoreEntryModalOpen}
        setOpen={setScoreEntryModalOpen}
      />
    </>
  )
}
