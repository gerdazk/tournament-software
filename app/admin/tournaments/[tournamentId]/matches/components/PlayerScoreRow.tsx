import { ScoreEntryItem } from './ScoreEntryItem'

export const PlayerScoreRow = ({ playerName }) => {
  const arr = [1, 2, 3]
  return (
    <div className="flex gap-3 justify-between">
      <div>{playerName}</div>
      <div className="flex gap-2">
        {arr.map(item => (
          <ScoreEntryItem key={item} />
        ))}
      </div>
    </div>
  )
}
