'use client'

import { PlayersTable } from '@/app/tournaments/[tournamentId]/components/PlayersTable'
import { Loader } from '@/components/ui/loader'
import { PageHeader } from '@/src/components/PageHeader'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Tournament } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function Page({ params }) {
  const [tournament, setTournament] = useState<Tournament>({})
  const [isLoading, setLoading] = useState(false)

  const getTournament = async () => {
    setLoading(true)
    const tournaments = await getTournamentById({ id: params.tournamentId })
    tournaments && setTournament(tournaments.tournaments)
    setLoading(false)
  }

  useEffect(() => {
    getTournament()
  }, [])

  return (
    <div className="w-full">
      <PageHeader
        title="Players"
        subtitle="All players registered to this tournament"
        isSmall
      />
      {isLoading ? (
        <Loader className="h-10 w-10" />
      ) : (
        <PlayersTable players={tournament.participants} className="w-full" />
      )}
    </div>
  )
}
