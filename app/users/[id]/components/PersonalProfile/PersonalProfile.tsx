import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User } from '@prisma/client'

import { Header } from '../Header'

import { PersonalDataForm } from './components/PersonalDataForm'

export const PersonalProfile: React.FC<User> = ({ name, role, ...rest }) => {
  return (
    <>
      <Card>
        <CardContent>
          <CardHeader className="pl-0">
            <Header name={name} role={role} />
          </CardHeader>
          {name && <PersonalDataForm defaultValues={{ name, role, ...rest }} />}
        </CardContent>
      </Card>
    </>
  )
}
