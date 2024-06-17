import { getAllDraws } from '@/app/admin/tournaments/[tournamentId]/draws/utils/getAllDraws'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Participant } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/ui/loader'

import { ListOfDraws } from './components/ListOfDraws'

export const DrawsTab = ({ tournamentId }) => {
  const [draws, setDraws] = useState([])
  const [isLoading, setLoading] = useState(false)

  const getDraws = async () => {
    const allDraws = await getAllDraws({ tournamentId })
    allDraws && setDraws(allDraws)
    setLoading(false)
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
    setLoading(true)
    getDraws()
    getPlayers()
  }, [])
  return isLoading ? (
    <Loader className="w-10 h-10" />
  ) : draws?.length ? (
    <ListOfDraws draws={draws} players={players} />
  ) : (
    <div>No draws to display.</div>
  )
}
