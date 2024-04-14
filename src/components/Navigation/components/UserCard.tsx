'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

type UserCardProps = {
  name: string
  id: number
}

export const UserCard: React.FC<UserCardProps> = ({ name, id }) => {
  const router = useRouter()
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <Avatar>
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div onClick={() => router.push(`/users/${id}`)}>{name}</div>
    </div>
  )
}
