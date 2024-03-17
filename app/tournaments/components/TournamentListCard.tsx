import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VercelLogoIcon , CalendarIcon, SewingPinIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

import { Tournament } from "./types"


export const TournamentListCard = ({name, city, country, start_date, end_date, id}: Tournament) => {
    const tournamentDates = `${start_date} - ${end_date}`
    const tournamentLocation = `${city}, ${country}`
    const router = useRouter()

    return <Card onClick={() => router.push(`/tournaments/${id}`)} className="cursor-pointer">
        <CardContent className=" p-0">
        <CardHeader className="flex flex-row items-center gap-7">
				<VercelLogoIcon className="w-6 h-6" />
				<div className="flex flex-col gap-3">
					<CardTitle className="text-primary">{name}</CardTitle>
					<CardDescription className="flex gap-1 flex-col">
                        <div className="flex gap-3 items-center">
                        <CalendarIcon /> {tournamentDates}
                        </div>
                        <div className="flex gap-3 items-center">
                        <SewingPinIcon /> {tournamentLocation}
                        </div>
                    </CardDescription>

                    <CardDescription className="flex gap-3 items-center">
                    </CardDescription>
				</div>
			</CardHeader>
        </CardContent>
        </Card>

}