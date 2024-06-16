'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { useRouter } from 'next/navigation'
import { TournamentList } from '@/app/tournaments/components/TournamentList'
import { useSession } from 'next-auth/react'

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([])
  const [isLoading, setLoading] = useState(false)
  const session = useSession()

  const router = useRouter()

  const getTournaments = async () => {
    try {
      const res = await fetch(
        `/api/tournament/organizer?id=${session?.data?.user?.id}`
      )
      const fetchedTournaments = await res?.json()
      fetchedTournaments?.tournaments?.length &&
        setTournaments(fetchedTournaments.tournaments)
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getTournaments()
  }, [])

  return (
    <div>
      <PageHeader
        title="Your tournaments"
        subtitle="All tournaments created by you"
        buttonText="Create new tournament"
        onButtonClick={() => router.push('/admin/tournaments/create')}
        buttonVariant="default"
      />
      <TournamentList data={tournaments} isLoading={isLoading} isAdmin={true} />
    </div>
  )
}
