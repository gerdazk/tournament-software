'use client'

import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Tournament } from '@prisma/client'
import { useEffect, useState } from 'react'

import { RoundRobinDraw } from './components/RoundRobinDraw/RoundRobinDraw'
import { CreateDrawDialog } from './components/CreateDrawDialog'
import { ListOfDraws } from './components/ListOfDraws'
import { getAllDraws } from './utils/getAllDraws'
import { Participant } from './types'

export default function Page({ params }) {
  const [draws, setDraws] = useState([])

  const getDraws = async () => {
    const allDraws = await getAllDraws({ tournamentId: params.tournamentId })
    allDraws && setDraws(allDraws)
  }

  const [players, setPlayers] = useState<Participant[]>([])

  const getPlayers = async () => {
    const tournaments = await getTournamentById({ id: params.tournamentId })
    const allParticipants = tournaments && tournaments.tournaments.participants
    const participantOptions = allParticipants?.map(
      ({ id, drawId, drawOrderNo, userId, tournamentId, user: { name } }) => ({
        value: id,
        label: name,
        drawId,
        drawOrderNo,
        userId,
        tournamentId
      })
    )
    participantOptions && setPlayers(participantOptions)
  }

  useEffect(() => {
    getDraws()
    getPlayers()
  }, [])
  return (
    <div className="w-full overflow-x-auto">
      <CreateDrawDialog tournamentId={params.tournamentId} />
      <ListOfDraws draws={draws} players={players} />
    </div>
  )
}