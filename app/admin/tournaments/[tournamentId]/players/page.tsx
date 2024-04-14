'use client'

import { PlayersTable } from '@/app/tournaments/[tournamentId]/components/PlayersTable'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Tournament } from '@prisma/client'
import { useEffect, useState } from 'react'

export default function Page({ params }) {
  const [tournament, setTournament] = useState<Tournament>({})

  const getTournament = async () => {
    const tournaments = await getTournamentById({ id: params.tournamentId })
    tournaments && setTournament(tournaments.tournaments)
  }

  useEffect(() => {
    getTournament()
  }, [])
  return (
    <div className="w-full">
      <PlayersTable players={tournament.participants} className="w-full" />
    </div>
  )
}
