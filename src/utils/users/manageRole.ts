export type ManageRoleProps = {
  id: string
  isApproved: boolean
  role: string | null
}

export async function manageRole({ id, isApproved, role }: ManageRoleProps) {
  const response = await fetch(`/api/users?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isApproved, role })
  })

  const data = await response.json()
  return data
}
