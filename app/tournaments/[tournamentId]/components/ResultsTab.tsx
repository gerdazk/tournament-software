import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Participant, User } from '@prisma/client'
import { useRouter } from 'next/navigation'

type ResultsTableProps = {
  participants: (Participant & {
    user: User
  })[]
  className?: string
}

export const ResultsTab: React.FC<ResultsTableProps> = ({
  participants = [],
  className
}) => {
  const router = useRouter()
  const places = Array.from({ length: participants?.length }, (_, i) => i + 1)

  return (
    <>
      <Table className={`w-1/2 ${className || ''}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Place</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.map(place => {
            const participantInPlace = participants?.find(
              p => p.place === place
            )

            return (
              <TableRow
                className={participantInPlace?.user?.id ? 'cursor-pointer' : ''}
                key={place}
                onClick={() =>
                  participantInPlace?.user?.id &&
                  router.push(`/users/${participantInPlace?.user?.id}`)
                }
              >
                <TableCell>{place}</TableCell>
                <TableCell>{participantInPlace?.user?.name || '-'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
