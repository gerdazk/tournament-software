'use client'

import { Draw } from '@prisma/client'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'

import { getAllDraws } from '../draws/utils/getAllDraws'

import { ListOfMatchesDraws } from './components/ListOfMatchesDraws'
import { ScoreEntryDialog } from './components/ScoreEntryDialog'

export default function Page({ params }) {
  const [draws, setDraws] = useState<Draw[]>([])

  const getDraws = async () => {
    const allDraws = await getAllDraws({ tournamentId: params.tournamentId })
    allDraws && setDraws(allDraws)
  }

  useEffect(() => {
    getDraws()
  }, [])
  return (
    <div className="w-full">
      <PageHeader title="All tournament matches" isSmall />
      <ListOfMatchesDraws draws={draws} />
    </div>
  )
}
