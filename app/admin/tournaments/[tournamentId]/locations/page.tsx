'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Tournament } from '@prisma/client'

import { LocationsTable } from './components/LocationsTable'
import { CreateLocationDialog } from './components/CreateLocationDialog'

export default function Page({ params }) {
  const [tournament, setTournament] = useState<Tournament>({})
  const [isDialogOpen, setDialogOpen] = useState(false)

  const getTournament = async () => {
    const tournaments = await getTournamentById({ id: params.tournamentId })
    tournaments && setTournament(tournaments.tournaments)
  }

  const handleDelete = async (id: number) => {
    id &&
      (await fetch(
        `/api/tournament/${params.tournamentId}/locations?id=${id}`,
        {
          method: 'DELETE'
        }
      ))

    await getTournament()
  }

  useEffect(() => {
    getTournament()
  }, [isDialogOpen])

  return (
    <div className="w-full">
      <PageHeader
        title="Locations"
        subtitle="All tournament locations where matches will be played (courts, fields, sports halls, etc)"
        isSmall
      />
      <div className="flex flex-col gap-2">
        <CreateLocationDialog
          tournamentId={params.tournamentId}
          open={isDialogOpen}
          onOpenChange={setDialogOpen}
        />
        <LocationsTable
          locations={tournament.Location}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  )
}
