'use client'

import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Tournament } from '@prisma/client'
import { useEffect, useState } from 'react'

import { RoundRobinDraw } from './components/RoundRobinDraw/RoundRobinDraw'
import { CreateDrawDialog } from './components/CreateDrawDialog'
import { ListOfDraws } from './components/ListOfDraws'
import { getAllDraws } from './utils/getAllDraws'

export default function Page({ params }) {
  const [draws, setDraws] = useState([])

  const getDraws = async () => {
    const allDraws = await getAllDraws({ tournamentId: params.tournamentId })
    allDraws && setDraws(allDraws)
    console.log({ allDraws })
  }

  useEffect(() => {
    getDraws()
  }, [])
  return (
    <div className="w-full overflow-x-auto">
      <CreateDrawDialog tournamentId={params.tournamentId} />
      <ListOfDraws draws={draws} />
    </div>
  )
}
