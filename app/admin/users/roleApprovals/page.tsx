'use client'

import { useEffect, useState } from 'react'
import { getAllUsers } from '@/src/utils/users/getAllUsers'
import { PageHeader } from '@/src/components/PageHeader'
import { Loader } from '@/components/ui/loader'

import { ApprovalsTable } from './components/ApprovalsTable'

export default function Page() {
  const [users, setUsers] = useState([])
  const [isLoading, setLoading] = useState(false)

  const getUsers = async () => {
    setLoading(true)
    const allUsers = await getAllUsers()
    const usersWithRequestedRoles = allUsers.filter(
      ({ proposed_role }: { proposed_role: string }) => !!proposed_role
    )
    usersWithRequestedRoles && setUsers(usersWithRequestedRoles)
    setLoading(false)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <PageHeader
        title="Role requests"
        subtitle="All users, who have requested a specific role are visible here. You can accept or deny their requests."
      />
      {isLoading ? (
        <Loader className="h-10 w-10" />
      ) : (
        <ApprovalsTable requests={users} />
      )}
    </div>
  )
}
