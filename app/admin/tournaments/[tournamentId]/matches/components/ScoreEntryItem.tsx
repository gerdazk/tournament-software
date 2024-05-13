import { InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

export const ScoreEntryItem = () => {
  return (
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
    </InputOTPGroup>
  )
}
