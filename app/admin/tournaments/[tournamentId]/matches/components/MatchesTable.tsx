import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Match, Participant } from '@prisma/client'

type MatchesTableProps = {
  matches: (Match & {
    participants: Participant[]
  })[]
}

export const MatchesTable: React.FC<MatchesTableProps> = ({
  matches = []
}) => {
  return (
    <Table className={`w-full`}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Player 1</TableHead>
          <TableHead>Player 2</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map(({ participants, score, id }) =>
          participants?.length ? (
            <TableRow key={id} className="cursor-pointer">
              <TableCell className="font-medium">
                {participants?.[0]?.user?.name}
              </TableCell>
              <TableCell className="font-medium">
                {participants?.[1]?.user?.name}
              </TableCell>
              <TableCell className="font-medium">{score}</TableCell>
            </TableRow>
          ) : (
            ''
          )
        )}
      </TableBody>
    </Table>
  )
}
