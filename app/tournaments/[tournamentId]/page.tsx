'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import { PageHeader } from "@/src/components/PageHeader"
import { useEffect, useState } from "react"
import { getTournamentById } from "@/src/utils/getTournamentById"

import { GeneralInfoTab } from "./components/GeneralInfoTab"

export default function Page({params}) {
    const [tournament, setTournament] = useState([]);


    // VEIKIA
    console.log({tournament})

	const getTournament = async () => {
		const allTournaments = await getTournamentById({id: params.tournamentId});
		allTournaments && setTournament(allTournaments.tournaments);
	};

	useEffect(() => {
		getTournament();
	}, []);
  return (
    <>
    <PageHeader title={params.tournamentId} />
    <Tabs defaultValue="general">
      <TabsList className="flex gap-2 justify-start w-fit mb-6">
        <TabsTrigger value="general">General information</TabsTrigger>
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="draws">Draws</TabsTrigger>
        <TabsTrigger value="order">Order of play</TabsTrigger>
        <TabsTrigger value="results">Results</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="grid grid-cols-3 gap-x-4 gap-y-3">
        <GeneralInfoTab />

      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  )
}
