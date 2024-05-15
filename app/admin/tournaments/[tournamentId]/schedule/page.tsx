'use client'

import { Draw } from '@prisma/client'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'

import { getAllDraws } from '../draws/utils/getAllDraws'

import { OrderOfPlay } from './components/OrderOfPlay'

export default function Page({ params }) {
  const [schedules, setSchedules] = useState([])
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [tournament, setTournament] = useState()

  const getSchedules = async () => {
    const res = await fetch(`/api/tournament/${params.tournamentId}/schedules`)
    const allSchedules = await res.json()
    allSchedules && setSchedules(allSchedules.schedules)
  }

  const getTournaments = async () => {
    const allTournaments = await getTournamentById({ id: params.tournamentId })
    setTournament(allTournaments.tournaments)
  }

  useEffect(() => {
    getSchedules()
    getTournaments()
  }, [])
  return (
    <div className="w-full">
      <PageHeader
        title="Tournament schedule"
        subtitle="Order of play for all tournament matches"
        isSmall
        buttonText="Create new schedule"
        onButtonClick={() => setDialogOpen(!isDialogOpen)}
      />
      <OrderOfPlay
        schedules={schedules}
        tournament={tournament}
        tournamentId={params.tournamentId}
      />
    </div>
  )
}
