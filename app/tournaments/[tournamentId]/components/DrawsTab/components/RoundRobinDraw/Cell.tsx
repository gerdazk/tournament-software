import { normalizeScore } from '@/src/utils/normalizeScore'
import { useEffect, useState } from 'react'

export const Cell: React.FC<React.PropsWithChildren> = ({
  children,
  participants,
  drawId
}) => {
  const [score, setScore] = useState('')

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
  }

  useEffect(() => {
    getScore()
  }, [])
  return (
    <div className="p-3 border border-secondary">
      {score || ''}
      {children}
    </div>
  )
}
