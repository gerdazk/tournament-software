'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'

import { OrderOfPlay } from './components/OrderOfPlay'

export default function Page({ params }) {
  const [schedules, setSchedules] = useState([])
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

  const onUpdate = () => {
    getSchedules()
    getTournaments()
  }

  return (
    <div className="w-full">
      <PageHeader
        title="Tournament schedule"
        subtitle="Order of play for all tournament matches"
        isSmall
      />
      <OrderOfPlay
        schedules={schedules}
        tournament={tournament}
        tournamentId={params.tournamentId}
        shouldAllowEditing={true}
        onUpdate={onUpdate}
      />
    </div>
  )
}
