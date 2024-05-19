import { ScoreUnit } from '@prisma/client'

import { ScoreEntryItem } from './ScoreEntryItem'

type PlayerScoreRowProps = {
  playerName: string
  handleScoreChange: (e: any) => void
  participantId: number
  playerScoringUnits: ScoreUnit[]
}

export const PlayerScoreRow: React.FC<PlayerScoreRowProps> = ({
  playerName,
  handleScoreChange,
  participantId,
  playerScoringUnits
}) => {
  return (
    <div className="flex gap-3 justify-between">
      <div>{playerName}</div>
      <div className="flex gap-2">
        {playerScoringUnits.map(item => (
          <ScoreEntryItem
            key={item.id}
            handleScoreChange={handleScoreChange}
            participantId={participantId}
            index={item.index}
            defaultValue={item.score?.toString()}
          />
        ))}
      </div>
    </div>
  )
}
