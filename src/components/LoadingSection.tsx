import { Loader } from '@/components/ui/loader'

export const LoadingSection = ({ className }) => {
  return (
    <div
      className={`flex w-full items-center justify-center ${className ? className : ''}`}
    >
      <Loader className="h-10 w-10" />
    </div>
  )
}
