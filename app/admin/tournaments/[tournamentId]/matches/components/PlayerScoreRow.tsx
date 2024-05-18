import { ScoreEntryItem } from './ScoreEntryItem'

type PlayerScoreRowProps = {
  playerName: string
  handleScoreChange: (e: any) => void
  participantId: number
}

export const PlayerScoreRow: React.FC<PlayerScoreRowProps> = ({
  playerName,
  handleScoreChange,
  participantId
}) => {
  const arr = [1, 2, 3]
  return (
    <div className="flex gap-3 justify-between">
      <div>{playerName}</div>
      <div className="flex gap-2">
        {arr.map(item => (
          <ScoreEntryItem
            key={item}
            handleScoreChange={handleScoreChange}
            participantId={participantId}
            index={item}
          />
        ))}
      </div>
    </div>
  )
}
