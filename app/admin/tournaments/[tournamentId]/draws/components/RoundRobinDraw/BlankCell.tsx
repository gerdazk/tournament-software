'use client'

import { normalizeScore } from '@/src/utils/normalizeScore'
import { useEffect, useState } from 'react'

export const BlankCell: React.FC<React.PropsWithChildren> = ({
  children
  // players,
  // drawId
}) => {
  // const [score, setScore] = useState('')

  // console.log({ players, drawId })

  // const getScore = async () => {
  //   const playerIds = players.map(({ id }) => id).concat(',')
  //   const res = await fetch(
  //     `/api/tournament/1/matches/score?drawId=${drawId}&participants=${playerIds}`
  //   )
  //   if (!res.ok) return
  //   const data = await res.json()
  //   const normalizedScore =
  //     data?.res?.ScoreUnit && normalizeScore({ scores: data?.res?.ScoreUnit })
  //   normalizedScore && setScore(normalizedScore)

  //   console.log({ normalizedScore })
  // }

  // useEffect(() => {
  //   getScore()
  // }, [])

  return <div className="p-3 border bg-secondary">{children}</div>
}
