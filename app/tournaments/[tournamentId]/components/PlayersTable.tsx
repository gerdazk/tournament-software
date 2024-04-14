import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Participant, User } from '@prisma/client'
import { useRouter } from 'next/navigation'

type PlayersTableProps = {
  players: (Participant & {
    user: User
  })[]
  className?: string
}

export const PlayersTable: React.FC<PlayersTableProps> = ({
  players = [],
  className
}) => {
  const router = useRouter()
  return (
    <Table className={`w-1/2 ${className || ''}`}>
      <TableCaption>A list of registered players.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date of birth</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map(player => (
          <TableRow
            key={player.userId}
            className="cursor-pointer"
            onClick={() => router.push(`/users/${player.user.id}`)}
          >
            <TableCell className="font-medium">{player.id}</TableCell>
            <TableCell className="font-medium">{player.user.name}</TableCell>
            <TableCell className="font-medium">
              {normalizeDate(player.user.date_of_birth.toString())}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
