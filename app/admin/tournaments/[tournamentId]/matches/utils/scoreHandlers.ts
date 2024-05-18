interface User {
  id: string
}

interface Player {
  user: User
}

interface MatchEntry {
  matchId: string
  index: number
  participantId: string
  score: number
}

type BuildInitialEntriesProps = {
  matchId: string
  players: Player[]
}

export const buildInitialEntries = ({
  matchId,
  players
}: BuildInitialEntriesProps): MatchEntry[] => {
  const entries: MatchEntry[] = []
  players.forEach(player => {
    for (let index = 1; index <= 3; index++) {
      entries.push({
        matchId: matchId,
        index: index,
        participantId: player.id,
        score: 0
      })
    }
  })
  return entries
}

type UpdateScoreProps = {
  entries: MatchEntry[]
  participantId: string
  index: number
  score: number
}

export const updateScore = ({
  entries,
  participantId,
  index,
  score
}: UpdateScoreProps): void => {
  const entry = entries.find(
    e => e.participantId === participantId && e.index === index
  )
  if (entry) {
    entry.score = Number(score)
  } else {
    console.error(
      `Entry not found for participantId: ${participantId} and index: ${index}`
    )
  }
}
