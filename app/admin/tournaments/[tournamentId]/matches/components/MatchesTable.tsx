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
  tournamentId: number
  shouldAllowAdminEditing?: boolean
}

export const MatchesTable: React.FC<MatchesTableProps> = ({
  matches = [],
  shouldAllowEditing,
  tournamentId,
  shouldAllowAdminEditing
}) => {
  return (
    <>
      <Table className={`w-full`}>
        <TableHeader className="w-full">
          <TableRow className="w-full cursor-default">
            {shouldAllowAdminEditing && <TableHead></TableHead>}
            {shouldAllowAdminEditing && <TableHead></TableHead>}
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
                shouldAllowAdminEditing={shouldAllowAdminEditing}
                participants={participants}
                tournamentId={tournamentId}
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
