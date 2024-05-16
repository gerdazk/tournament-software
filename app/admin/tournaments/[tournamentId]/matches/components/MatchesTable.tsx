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
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Button } from '@/components/ui/button'

import { ScoreEntryDialog } from './ScoreEntryDialog'
import { MatchRow } from './MatchRow'

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
            <TableHead>Player 1</TableHead>
            <TableHead>Player 2</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map(({ participants, ...match }) => {
            return participants?.length ? (
              <MatchRow
                {...match}
                shouldAllowEditing={shouldAllowEditing}
                participants={participants}
              />
            ) : (
              ''
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
