'use client'

import { PageHeader } from '@/src/components/PageHeader'
import { useEffect, useState } from 'react'
import { Tournament } from '@prisma/client'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { getAllUsers } from '@/src/utils/users/getAllUsers'

import { StaffTable } from './components/StaffTable'
import { AddStaffMemberDialog } from './components/AddStaffMemberDialog'

export default function Page({ params }) {
  const [tournament, setTournament] = useState<Tournament>({})
  const [isLoading, setLoading] = useState(false)
  const [players, setPlayers] = useState([])
  const [isDialogOpen, setDialogOpen] = useState(false)

  const getTournament = async () => {
    setLoading(true)
    const tournaments = await getTournamentById({ id: params.tournamentId })
    tournaments && setTournament(tournaments.tournaments)
    console.log(tournaments.tournaments)
    setLoading(false)
  }

  const getPlayers = async () => {
    setLoading(true)
    const allPlayers = await getAllUsers()
    allPlayers && setPlayers(allPlayers)
    setLoading(false)
  }

  useEffect(() => {
    getTournament()
    getPlayers()
  }, [])

  const handleDelete = async id => {
    try {
      await fetch(`/api/tournament/${params.tournamentId}/staff?id=${id}`, {
        method: 'DELETE'
      })
      getTournament()
    } catch (e) {
      console.log({ e })
    }
  }

  return (
    <div className="w-full">
      <PageHeader
        title="Tournament staff"
        subtitle="All tournament staff members allowed to edit scores."
        buttonText="Add new member"
        onButtonClick={() => setDialogOpen(true)}
        isSmall
      />
      <StaffTable
        staffMembers={tournament?.tournamentStaff?.staffMembers}
        tournamentId={params.tournamentId}
        handleDelete={handleDelete}
      />
      <AddStaffMemberDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        tournamentId={params.tournamentId}
        players={players}
        onUpdate={getTournament}
      />
    </div>
  )
}
