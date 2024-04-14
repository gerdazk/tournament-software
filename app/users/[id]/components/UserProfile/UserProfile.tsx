import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { User } from '@prisma/client'

import { Header } from '../Header'

import { PersonalDataSection } from './components/PersonalDataSection'

export const UserProfile: React.FC<User> = ({ name, role, ...rest }) => {
  return (
    <>
      <Card>
        <CardContent>
          <CardHeader className="pl-0">
            <Header name={name} role={role} />
          </CardHeader>
          {name && <PersonalDataSection {...rest} />}
        </CardContent>
      </Card>
    </>
  )
}
