type Props = {
    message: string
}

export const ErrorMessage: React.FC<Props> = ({message}) => {
    return (
      <div className="text-sm text-destructive">{message}</div>
    )
}