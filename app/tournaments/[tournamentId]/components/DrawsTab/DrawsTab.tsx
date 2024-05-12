import { getAllDraws } from '@/app/admin/tournaments/[tournamentId]/draws/utils/getAllDraws'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Participant } from '@prisma/client'
import { useEffect, useState } from 'react'

import { ListOfDraws } from './components/ListOfDraws'

export const DrawsTab = ({ tournamentId }) => {
  const [draws, setDraws] = useState([])

  const getDraws = async () => {
    const allDraws = await getAllDraws({ tournamentId })
    allDraws && setDraws(allDraws)
  }

  const [players, setPlayers] = useState<Participant[]>([])

  const getPlayers = async () => {
    const tournaments = await getTournamentById({ id: tournamentId })
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
  return <ListOfDraws draws={draws} players={players} />
}
