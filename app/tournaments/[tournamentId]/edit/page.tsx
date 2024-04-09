'use client'

import { PageHeader } from '@/src/components/PageHeader'
import { useEffect, useState } from 'react'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'

import { EditTournamentForm } from './components/EditTournamentForm'

export default function Page({ params }) {
  const [tournament, setTournament] = useState([])

  const getTournament = async () => {
    const allTournaments = await getTournamentById({ id: params.tournamentId })
    allTournaments && setTournament(allTournaments.tournaments)
  }

  useEffect(() => {
    getTournament()
  }, [])
  return (
    <>
      {tournament?.name && (
        <EditTournamentForm tournament={tournament} id={params.tournamentId} />
      )}
    </>
  )
}
