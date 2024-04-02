'use client'

import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { useEffect, useState } from 'react'

import { EditTournamentForm } from './components/EditTournamentForm'

export default function Page({ params }) {
  const [tournament, setTournament] = useState([])

  // VEIKIA
  console.log({ tournament })

  const getTournament = async () => {
    const allTournaments = await getTournamentById({ id: params.tournamentId })
    allTournaments && setTournament(allTournaments.tournaments)
  }

  useEffect(() => {
    getTournament()
  }, [])

  return (
    <div>
      <EditTournamentForm defaultValues={tournament} />
    </div>
  )
}
