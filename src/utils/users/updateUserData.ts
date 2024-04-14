import { User } from '@prisma/client'

export const updateUserData = async ({ id, ...body }: User) => {
  const response = await fetch(`/api/users?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return data
}
