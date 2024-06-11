import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User } from '@prisma/client'

import { Header } from '../Header'
import { RegistrationsList } from '../PersonalProfile/components/RegistrationsList'

import { PersonalDataSection } from './components/PersonalDataSection'

export const UserProfile: React.FC<User> = ({
  name,
  role,
  participant,
  ...rest
}) => {
  return (
    <div className="flex gap-6 w-full">
      <Card className="w-full">
        <CardContent>
          <CardHeader className="pl-0">
            <Header name={name} role={role} />
          </CardHeader>
          {name && <PersonalDataSection {...rest} />}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="">
          <h2 className="text-xl font-bold">Most recent tournaments</h2>
        </CardHeader>
        <CardContent>
          {participant && <RegistrationsList participantions={participant} />}
        </CardContent>
      </Card>
    </div>
  )
}
