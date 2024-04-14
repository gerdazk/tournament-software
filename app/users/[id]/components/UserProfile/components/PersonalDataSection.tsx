'use client'

import { SimpleCard } from '@/src/components/SimpleCard'
import { User } from '@prisma/client'

type PersonalDataSectionProps = Partial<User>

export const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({
  date_of_birth,
  email
}) => {
  return (
    <div className="flex flex-col gap-3">
      <SimpleCard title="Date of birth" subtitle={date_of_birth?.toString()} />
      <SimpleCard title="Email" subtitle={email?.toString()} />
    </div>
  )
}
