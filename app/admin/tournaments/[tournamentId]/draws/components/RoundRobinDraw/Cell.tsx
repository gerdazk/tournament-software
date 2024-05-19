import { normalizeScore } from '@/src/utils/normalizeScore'
import { useEffect, useState } from 'react'

export const Cell: React.FC<React.PropsWithChildren> = ({
  children,
  drawId,
  targetParticipantId,
  opponentParticipantId
}) => {
  const [score, setScore] = useState('')
  const [winnerId, setWinnerId] = useState(null)

  const participants =
    targetParticipantId &&
    opponentParticipantId &&
    `${targetParticipantId},${opponentParticipantId}`

  const getScore = async () => {
    if (!participants || !drawId) return
    const res = await fetch(
      `/api/tournament/1/matches/score?drawId=${drawId}&participants=${participants}`
    )
    if (!res.ok) return
    const data = await res.json()
    const normalizedScore =
      data?.res?.ScoreUnit && normalizeScore(data.res.ScoreUnit)
    normalizedScore && setScore(normalizedScore)
    data?.res?.winnerId && setWinnerId(data.res.winnerId)
  }

  useEffect(() => {
    getScore()
  }, [])
  return (
    <div
      className={`p-3 border border-secondary ${winnerId === targetParticipantId && `font-bold`}`}
    >
      {score || ''}
      {children}
    </div>
  )
}
