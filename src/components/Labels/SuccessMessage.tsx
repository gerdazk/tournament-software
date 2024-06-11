import { CheckIcon } from '@radix-ui/react-icons'

type Props = {
  message: string
}

export const SuccessMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center gap-3 text-sm text-emerald-700 bg-emerald-100 rounded-md p-3 border border-emerald-700">
      <CheckIcon />
      {message}
    </div>
  )
}
