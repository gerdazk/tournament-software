'use client'

import { useEffect, useState } from 'react'
import { getAllUsers } from '@/src/utils/getAllUsers'
import { PageHeader } from '@/src/components/PageHeader'

import { ApprovalsTable } from './components/ApprovalsTable'

export default function Page() {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const allUsers = await getAllUsers()
    const usersWithRequestedRoles = allUsers.filter(
      ({ proposed_role }) => !!proposed_role
    )
    usersWithRequestedRoles && setUsers(usersWithRequestedRoles)

    console.log({ usersWithRequestedRoles, allUsers })
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
      <ApprovalsTable requests={users} />
    </div>
  )
}
