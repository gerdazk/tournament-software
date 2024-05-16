import { Input } from '@/components/ui/input'

export const ScoreEntryItem = () => {
  return (
    <div>
      <Input
        type="number"
        className="w-9 remove-arrow"
        max="99"
        min="0"
        defaultValue="0"
      ></Input>
    </div>
  )
}
