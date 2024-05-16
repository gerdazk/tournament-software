import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Match, Participant } from '@prisma/client'

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
