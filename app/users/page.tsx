'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { getAllUsers } from '@/src/utils/users/getAllUsers'

import { PlayersList } from './components/PlayersList'

export default function Players() {
  const [players, setPlayers] = useState([])

  const getPlayers = async () => {
    const allPlayers = await getAllUsers()
    allPlayers && setPlayers(allPlayers)
  }

  useEffect(() => {
    getPlayers()
  }, [])
  return (
    <div>
      <PageHeader title="All players" />
      <PlayersList data={players} />
    </div>
  )
}
