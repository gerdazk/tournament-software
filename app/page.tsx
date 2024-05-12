'use client'

import { HomeHero } from '@/src/components/HomeHero'
import { OverviewCard } from '@/src/components/OverviewCard'
import { NotebookText, Trophy, UserIcon, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [overview, setOverview] = useState({
    tournamentsCount: 0,
    matchesCount: 0,
    usersCount: 0,
    organizersCount: 0
  })

  const getOverview = async () => {
    const res = await fetch('/api/overview')

    const { data } = await res.json()

    console.log({ data })

    data && setOverview(data)
  }

  useEffect(() => {
    getOverview()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <HomeHero />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard
          label="Total users"
          title={overview?.usersCount || 0}
          subtitle="Total number of users using the system"
          Icon={UserIcon}
        />
        <OverviewCard
          label="Total tournaments organized"
          title={overview?.tournamentsCount || 0}
          subtitle="Total number of tournaments in the system"
          Icon={Trophy}
        />
        <OverviewCard
          label="Total matches played"
          title={overview?.matchesCount || 0}
          subtitle="Total number of matches in the system"
          Icon={Users}
        />
        <OverviewCard
          label="Total tournament organizers"
          title={overview?.organizersCount || 0}
          subtitle="Total of organizers for the tournaments"
          Icon={NotebookText}
        />
      </div>
    </main>
  )
}
