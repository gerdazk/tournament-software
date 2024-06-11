'use client'

import { getUserById } from '@/src/utils/users/getUserById'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'
import { PageHeader } from '@/src/components/PageHeader'
import { OverviewCard } from '@/src/components/OverviewCard'
import { Calendar, CalendarCheck2Icon, TrophyIcon } from 'lucide-react'
import { normalizeDate } from '@/src/utils/normalizeDate'

import { UserProfile } from './components/UserProfile/UserProfile'
import { PersonalProfile } from './components/PersonalProfile/PersonalProfile'

export default function Page({ params }) {
  const [user, setUser] = useState<User | null>(null)
  const [isPersonalProfile, setPersonalProfile] = useState(false)
  const session = useSession()

  const getUser = async () => {
    const fetchedUser = await getUserById({ id: params.id })
    fetchedUser && setUser(fetchedUser)
    const isProfile = fetchedUser?.email === session?.data?.user?.email
    isProfile && setPersonalProfile(true)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <PageHeader title="Player profile" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <OverviewCard
          label="Tournament participations"
          title={user?.participant?.length || 0}
          subtitle="Total number of tournament participations"
          Icon={TrophyIcon}
        />
        {user?.createdAt && (
          <OverviewCard
            label="A member since"
            title={normalizeDate(user.createdAt)}
            subtitle="Date of registration"
            Icon={Calendar}
          />
        )}
        {user?.updatedAt && (
          <OverviewCard
            label="Last profile update"
            title={normalizeDate(user.updatedAt)}
            subtitle="Last update of user profile"
            Icon={CalendarCheck2Icon}
          />
        )}
      </div>
      {user ? (
        isPersonalProfile ? (
          <PersonalProfile {...user} />
        ) : (
          <UserProfile {...user} />
        )
      ) : (
        <div>User not found</div>
      )}
    </div>
  )
}
