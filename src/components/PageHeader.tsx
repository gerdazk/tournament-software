import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Props = {
  title: string
  subtitle?: string
  buttonText?: string
  buttonVariant?: string
  onButtonClick?: () => void
  isSmall?: boolean
}

export const PageHeader: React.FC<Props> = ({
  title,
  subtitle,
  buttonText,
  buttonVariant,
  isSmall,
  onButtonClick
}) => {
  return (
    <div
      className={`hidden space-y-6 pb-16 pt-8 md:block ${isSmall && 'pb-3 pt-2'}`}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          {isSmall ? (
            <h3 className="text-lg font-medium">{title}</h3>
          ) : (
            <h2 className={`text-2xl font-bold tracking-tight`}>{title}</h2>
          )}
          <p className={`${isSmall && 'text-sm'} text-muted-foreground`}>
            {subtitle}
          </p>
        </div>
        {buttonText && (
          <Button variant={buttonVariant} onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </div>
      <Separator className="my-6" />
    </div>
  )
}
