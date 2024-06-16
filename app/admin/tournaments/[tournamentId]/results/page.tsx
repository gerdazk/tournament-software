'use client'

import { PlayersTable } from '@/app/tournaments/[tournamentId]/components/PlayersTable'
import { Loader } from '@/components/ui/loader'
import { PageHeader } from '@/src/components/PageHeader'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Tournament } from '@prisma/client'
import { useEffect, useState } from 'react'

import { ResultsTable } from './components/ResultsTable'

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

  const places = Array.from(
    { length: tournament?.participants?.length },
    (_, i) => i + 1
  )

  const participantsToSelectInitialState = places.reduce((acc, place) => {
    const participant = tournament?.participants?.find(p => p.place === place)
    acc[place] = participant || null
    return acc
  }, {})

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
        <ResultsTable
          participants={tournament.participants}
          className="w-full"
          participantsToSelectInitialState={participantsToSelectInitialState}
        />
      )}
    </div>
  )
}
