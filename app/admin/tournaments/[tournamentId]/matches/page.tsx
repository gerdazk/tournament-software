'use client'

import { Draw } from '@prisma/client'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { Loader } from '@/components/ui/loader'

import { getAllDraws } from '../draws/utils/getAllDraws'

import { ListOfMatchesDraws } from './components/ListOfMatchesDraws'

export default function Page({ params }) {
  const [draws, setDraws] = useState<Draw[]>([])
  const [isLoading, setLoading] = useState(false)

  const getDraws = async () => {
    setLoading(true)
    const allDraws = await getAllDraws({ tournamentId: params.tournamentId })
    allDraws && setDraws(allDraws)
    setLoading(false)
  }

  useEffect(() => {
    getDraws()
  }, [])

  return (
    <div className="w-full">
      <PageHeader title="All tournament matches" isSmall />
      {isLoading ? (
        <Loader className="h-10 w-10" />
      ) : (
        <ListOfMatchesDraws
          draws={draws}
          onUpdate={getDraws}
          shouldAllowEditing={true}
          shouldAllowAdminEditing={true}
          tournamentId={params.tournamentId}
        />
      )}
    </div>
  )
}
