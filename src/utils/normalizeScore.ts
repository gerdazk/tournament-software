import { ScoreUnit } from '@prisma/client'

export const normalizeScore = (
  scores: ScoreUnit[],
  leadParticipantId?: number
): string => {
  if (!scores) return ''
  scores.sort((a, b) => a.index - b.index)

  const participantScores = new Map<number, number[]>()
  scores.forEach(score => {
    const scores = participantScores.get(score.participantId) || []
    scores[score.index - 1] = score.score
    participantScores.set(score.participantId, scores)
  })

  const leadId = leadParticipantId || participantScores.keys().next().value
  const leadScores = participantScores.get(leadId)
  const opponentScores = participantScores.get(
    [...participantScores?.keys()].find(key => key !== leadId)
  )

  const formattedScores = leadScores?.map((leadScore, index) => {
    const opponentScore = opponentScores?.[index]
    return `${leadScore}/${opponentScore}`
  })

  return formattedScores?.join(' ')
}
