import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SimpleCard } from '@/src/components/SimpleCard'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Tournament } from '@prisma/client'
import {
  CalendarIcon,
  HomeIcon,
  InfoCircledIcon,
  TargetIcon
} from '@radix-ui/react-icons'

export const GeneralInfoTab: React.FC<Tournament> = ({
  name,
  city,
  description,
  start_date,
  end_date,
  country,
  address_additional_info,
  address_name,
  no_of_courts
}) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>General info</CardTitle>
          <InfoCircledIcon />
        </CardHeader>
        <CardContent className="space-y-2">
          <SimpleCard title="Name of the tournament" subtitle={name} />
          <SimpleCard title="Description" subtitle={description} />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>Tournament dates</CardTitle>
          <CalendarIcon />
        </CardHeader>
        <CardContent className="space-y-2">
          <SimpleCard title="Start date" subtitle={normalizeDate(start_date)} />
          <SimpleCard title="End date" subtitle={normalizeDate(end_date)} />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>Tournament location</CardTitle>
          <HomeIcon />
        </CardHeader>
        <CardContent className="space-y-2">
          <SimpleCard title="Country" subtitle={country} />
          <SimpleCard title="City" subtitle={city} />
          <SimpleCard
            title="Additional address info"
            subtitle={address_additional_info || '-'}
          />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>Tournament venue</CardTitle>
          <TargetIcon />
        </CardHeader>
        <CardContent className="space-y-2">
          <SimpleCard title="Venue name" subtitle={address_name} />
          <SimpleCard
            title="Number of courts/fields"
            subtitle={no_of_courts?.toString() || '-'}
          />
        </CardContent>
      </Card>
    </>
  )
}
