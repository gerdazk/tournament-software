import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { SimpleCard } from "@/src/components/SimpleCard"
import { CalendarIcon, HomeIcon, InfoCircledIcon } from "@radix-ui/react-icons"

export const GeneralInfoTab = () => {
    return (
        <>
        <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>General info</CardTitle>
          <InfoCircledIcon />
        </CardHeader>
        <CardContent className="space-y-2">
        <SimpleCard title="Name of the tournament" subtitle="Lithuanian championships" />
        <SimpleCard title="Gender" subtitle="Women" />
        <SimpleCard title="Description" subtitle="Vilnius" />
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
      <Card className="w-full">
        <CardHeader className="flex justify-between flex-row">
          <CardTitle>Tournament venue</CardTitle>
          <HomeIcon />
        </CardHeader>
        <CardContent className="space-y-2">
        <SimpleCard title="Country" subtitle="Lithuania" />
        <SimpleCard title="City" subtitle="Vilnius" />
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