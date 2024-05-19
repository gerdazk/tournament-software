import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User } from '@prisma/client'

import { Header } from '../Header'

import { PersonalDataForm } from './components/PersonalDataForm'
import { RegistrationsList } from './components/RegistrationsList'

export const PersonalProfile: React.FC<User> = ({
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
          {name && <PersonalDataForm defaultValues={{ name, role, ...rest }} />}
        </CardContent>
      </Card>
      {!!participant?.length && (
        <Card className="w-full">
          <CardHeader className="">
            <h1 className="text-2xl font-bold">Tournaments</h1>
          </CardHeader>
          <CardContent>
            {participant && <RegistrationsList participantions={participant} />}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
