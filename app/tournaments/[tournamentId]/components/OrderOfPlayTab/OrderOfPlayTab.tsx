'use client'

import { OrderOfPlay } from '@/app/admin/tournaments/[tournamentId]/schedule/components/OrderOfPlay'
import { Loader } from '@/components/ui/loader'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { useEffect, useState } from 'react'

export const OrderOfPlayTab = ({ tournamentId }) => {
  const [schedules, setSchedules] = useState([])
  const [tournament, setTournament] = useState()
  const [isLoading, setLoading] = useState(false)

  const getSchedules = async () => {
    const res = await fetch(
      `/api/tournament/${tournamentId}/schedules?isPublished=true`
    )
    const allSchedules = await res.json()
    allSchedules && setSchedules(allSchedules.schedules)
    setLoading(false)
  }

  const getTournaments = async () => {
    const allTournaments = await getTournamentById({ id: tournamentId })
    setTournament(allTournaments.tournaments)
  }

  useEffect(() => {
    setLoading(true)
    getSchedules()
    getTournaments()
  }, [])

  const onUpdate = () => {
    getSchedules()
    getTournaments()
  }

  return isLoading ? (
    <Loader className="w-10 h-10" />
  ) : (
    <OrderOfPlay
      schedules={schedules}
      tournament={tournament}
      tournamentId={tournamentId}
      shouldAllowEditing={false}
      onUpdate={onUpdate}
    />
  )
}
