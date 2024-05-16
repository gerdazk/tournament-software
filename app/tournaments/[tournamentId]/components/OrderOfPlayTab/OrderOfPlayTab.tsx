'use client'

import { OrderOfPlay } from '@/app/admin/tournaments/[tournamentId]/schedule/components/OrderOfPlay'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { useEffect, useState } from 'react'

export const OrderOfPlayTab = ({ tournamentId }) => {
  const [schedules, setSchedules] = useState([])
  const [tournament, setTournament] = useState()

  const getSchedules = async () => {
    const res = await fetch(`/api/tournament/${tournamentId}/schedules`)
    const allSchedules = await res.json()
    allSchedules && setSchedules(allSchedules.schedules)
  }

  const getTournaments = async () => {
    const allTournaments = await getTournamentById({ id: tournamentId })
    setTournament(allTournaments.tournaments)
  }

  useEffect(() => {
    getSchedules()
    getTournaments()
  }, [])
  return (
    <OrderOfPlay
      schedules={schedules}
      tournament={tournament}
      tournamentId={tournamentId}
      shouldAllowEditing={false}
    />
  )
}
