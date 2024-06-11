'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Match, Participant } from '@prisma/client'
import { useEffect, useState } from 'react'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Loader } from '@/components/ui/loader'

import { MatchRow } from './MatchRow'

type MatchesTableProps = {
  matches: (Match & {
    participants: Participant[]
  })[]
  shouldAllowEditing?: boolean
  tournamentId: number
  shouldAllowAdminEditing?: boolean
  onUpdate: () => void
}

export const MatchesTable: React.FC<MatchesTableProps> = ({
  matches = [],
  shouldAllowEditing,
  tournamentId,
  shouldAllowAdminEditing,
  onUpdate
}) => {
  const [tournament, setTournament] = useState()
  const [isLoading, setLoading] = useState(false)

  const getTournament = async () => {
    setLoading(true)
    const allTournaments = await getTournamentById({ id: tournamentId })
    setTournament(allTournaments.tournaments)
    setLoading(false)
  }

  useEffect(() => {
    getTournament()
  }, [])

  return (
    <>
      {isLoading ? (
        <Loader className="w-10 h-10" />
      ) : (
        <Table className={`w-full`}>
          <TableHeader className="w-full">
            <TableRow className="w-full cursor-default">
              {shouldAllowAdminEditing && <TableHead></TableHead>}
              {shouldAllowAdminEditing && <TableHead></TableHead>}
              <TableHead>Date and Time</TableHead>
              <TableHead>Draw name</TableHead>
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
                  tournament={tournament}
                  onUpdate={onUpdate}
                />
              ) : (
                ''
              )
            })}
          </TableBody>
        </Table>
      )}
    </>
  )
}
