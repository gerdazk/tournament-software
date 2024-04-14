'use client'

import { getUserById } from '@/src/utils/users/getUserById'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { User } from '@prisma/client'

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
    <div className="pt-6">
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
