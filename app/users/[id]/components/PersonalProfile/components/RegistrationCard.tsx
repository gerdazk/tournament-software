import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { normalizeDate } from '@/src/utils/normalizeDate'
import { Tournament } from '@prisma/client'
import {
  ArrowRightIcon,
  CalendarIcon,
  SewingPinIcon
} from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

export const RegistrationCard: React.FC<Tournament> = ({
  name,
  city,
  country,
  start_date,
  id
}) => {
  const router = useRouter()
  return (
    <Card
      className="flex justify-between items-center cursor-pointer"
      onClick={() => router.push(`/tournaments/${id}`)}
    >
      <div>
        <CardHeader className="flex flex-row items-center p-3">
          <div className="pl-3 text-xl">
            <Label>{name}</Label>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex gap-1">
            <SewingPinIcon />
            <CardDescription>{`${city}, ${country}`}</CardDescription>
          </div>
          <div className="flex gap-3 items-center">
            <CalendarIcon />
            <CardDescription>
              {normalizeDate(start_date.toString())}
            </CardDescription>
          </div>
        </CardContent>
      </div>
      <ArrowRightIcon className="mr-3" />
    </Card>
  )
}
