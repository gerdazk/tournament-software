'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { getAllUsers } from '@/src/utils/users/getAllUsers'
import { Loader } from '@/components/ui/loader'

import { PlayersList } from './components/PlayersList'

export default function Players() {
  const [players, setPlayers] = useState([])
  const [isLoading, setLoading] = useState(false)

  const getPlayers = async () => {
    setLoading(true)
    const allPlayers = await getAllUsers()
    allPlayers && setPlayers(allPlayers)
    setLoading(false)
  }

  useEffect(() => {
    getPlayers()
  }, [])

  return (
    <div>
      <PageHeader title="All players" />
      {isLoading ? (
        <Loader className="h-10 w-10" />
      ) : (
        <PlayersList data={players} />
      )}
    </div>
  )
}
