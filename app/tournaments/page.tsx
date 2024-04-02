'use client'

import { getAllTournaments } from '@/src/utils/getAllTournaments'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'

import { TournamentList } from './components/TournamentList'

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([])

  const getTournaments = async () => {
    const allTournaments = await getAllTournaments()
    allTournaments && setTournaments(allTournaments.tournaments)
  }

  useEffect(() => {
    getTournaments()
  }, [])
  return (
    <div>
      <PageHeader title="All tournaments" />
      <TournamentList tournaments={tournaments} />
    </div>
  )
}
