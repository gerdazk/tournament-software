import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type UserCardProps = {
  name: string
}

export const UserCard: React.FC<UserCardProps> = ({ name, id }) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>{name}</div>
    </div>
  )
}
