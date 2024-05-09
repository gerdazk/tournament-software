'use client'

import { getAllTournaments } from '@/src/utils/tournaments/getAllTournaments'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { useRouter } from 'next/navigation'

import { TournamentList } from '../components/TournamentList'

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([])

  const router = useRouter()

  const getTournaments = async () => {
    const allTournaments = await getAllTournaments({ isArchive: true })
    allTournaments && setTournaments(allTournaments.tournaments)
  }

  useEffect(() => {
    getTournaments()
  }, [])
  return (
    <div>
      <PageHeader
        title="Tournaments archive"
        subtitle="All past tournaments"
        buttonText="Upcoming tournaments"
        onButtonClick={() => router.push('/tournaments')}
        buttonVariant="outline"
      />
      <TournamentList data={tournaments} />
    </div>
  )
}
