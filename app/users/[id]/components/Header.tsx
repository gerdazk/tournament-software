import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type HeaderProps = {
  name: string
  role: string
}

export const Header: React.FC<HeaderProps> = ({ name, role }) => {
  return (
    <div className="">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          {name && (
            <Avatar className="w-12 h-12">
              <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          <div className="space-y-1">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
