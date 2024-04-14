import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SimpleCard } from '@/src/components/SimpleCard'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Tournament } from '@prisma/client'
import { CalendarIcon, HomeIcon, InfoCircledIcon } from '@radix-ui/react-icons'

export const GeneralInfoTab: React.FC<Tournament> = ({
  name,
  city,
  description,
  start_date,
  end_date,
  country
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
          <SimpleCard title="Gender" subtitle="Women" />
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
          <CardTitle>Tournament venue</CardTitle>
          <HomeIcon />
        </CardHeader>
        <CardContent className="space-y-2">
          <SimpleCard title="Country" subtitle={country} />
          <SimpleCard title="City" subtitle={city} />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>Tournament dates</CardTitle>
          <CalendarIcon />
        </CardHeader>
        <CardContent className="space-y-2">
          <SimpleCard title="Start date" subtitle="Lithuania" />
          <SimpleCard title="End date" subtitle="Vilnius" />
        </CardContent>
      </Card>
    </>
  )
}
