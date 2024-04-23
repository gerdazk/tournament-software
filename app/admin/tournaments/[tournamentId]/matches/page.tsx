'use client'

import { Draw } from '@prisma/client'
import { useEffect, useState } from 'react'

import { getAllDraws } from '../draws/utils/getAllDraws'

import { ListOfMatchesDraws } from './components/ListOfMatchesDraws'

export default function Page({ params }) {
  const [draws, setDraws] = useState<Draw[]>([])

  const getDraws = async () => {
    const allDraws = await getAllDraws({ tournamentId: params.tournamentId })
    allDraws && setDraws(allDraws)
    console.log({ allDraws })
  }

  useEffect(() => {
    getDraws()
  }, [])
  return (
    <div className="w-full">
      <ListOfMatchesDraws draws={draws} />
    </div>
  )
}
