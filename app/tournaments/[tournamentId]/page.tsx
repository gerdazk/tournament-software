'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Separator } from '@/components/ui/separator'
import { Tournament } from '@prisma/client'

import { GeneralInfoTab } from './components/GeneralInfoTab'
import { PlayersTable } from './components/PlayersTable'
import { HeaderButtons } from './components/HeaderButtons'

export default function Page({ params }) {
  const [tournament, setTournament] = useState<Tournament>({})

  const getTournament = async () => {
    const tournaments = await getTournamentById({ id: params.tournamentId })
    tournaments && setTournament(tournaments.tournaments)
    console.log({ t: tournaments.tournaments })
  }

  useEffect(() => {
    getTournament()
  }, [])
  return (
    <>
      <div className="hidden space-y-6 pb-16 pt-8 md:block">
        <div className="flex flex-row justify-between items-center">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {tournament?.name || ''}
            </h2>
          </div>
          {tournament && <HeaderButtons {...tournament} />}
        </div>
        <Separator className="my-6" />
      </div>
      <Tabs defaultValue="general">
        <TabsList className="flex gap-2 justify-start w-fit mb-6">
          <TabsTrigger value="general">General information</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="draws">Draws</TabsTrigger>
          <TabsTrigger value="order">Order of play</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent
          value="general"
          className="grid grid-cols-3 gap-x-4 gap-y-3"
        >
          <GeneralInfoTab {...tournament} />
        </TabsContent>
        <TabsContent
          value="players"
          className="grid grid-cols-3 gap-x-4 gap-y-3"
        >
          <PlayersTable />
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
