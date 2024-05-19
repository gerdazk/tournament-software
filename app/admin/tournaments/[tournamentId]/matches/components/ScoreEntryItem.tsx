import { Input } from '@/components/ui/input'

type ScoreEntryItemProps = {
  handleScoreChange: (e: any) => void
  participantId: number
  index: number
  defaultValue?: string
}

export const ScoreEntryItem: React.FC<ScoreEntryItemProps> = ({
  handleScoreChange,
  participantId,
  index,
  defaultValue
}) => {
  return (
    <div>
      <Input
        type="number"
        className="w-9 remove-arrow"
        max="99"
        min="0"
        defaultValue={defaultValue}
        onChange={e =>
          handleScoreChange({ score: e.target.value, participantId, index })
        }
      ></Input>
    </div>
  )
}
