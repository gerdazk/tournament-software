export const getUserById = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`/api/users?id=${id}`)

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const error = await response.json()
      console.log({ error })
      return
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return
  }
}
