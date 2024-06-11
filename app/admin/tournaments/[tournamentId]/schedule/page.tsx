'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Loader } from '@/components/ui/loader'

import { OrderOfPlay } from './components/OrderOfPlay'

export default function Page({ params }) {
  const [schedules, setSchedules] = useState([])
  const [tournament, setTournament] = useState()
  const [isLoading, setLoading] = useState(false)

  const getSchedules = async () => {
    const res = await fetch(`/api/tournament/${params.tournamentId}/schedules`)
    const allSchedules = await res.json()
    allSchedules && setSchedules(allSchedules.schedules)
  }

  const getTournaments = async () => {
    const allTournaments = await getTournamentById({ id: params.tournamentId })
    setTournament(allTournaments.tournaments)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getSchedules()
    getTournaments()
  }, [])

  const onUpdate = () => {
    setLoading(true)
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
      {isLoading ? (
        <Loader className="w-10 h-10" />
      ) : (
        <OrderOfPlay
          schedules={schedules}
          tournament={tournament}
          tournamentId={params.tournamentId}
          shouldAllowEditing={true}
          onUpdate={onUpdate}
        />
      )}
    </div>
  )
}
