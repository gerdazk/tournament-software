'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { getTournamentById } from '@/src/utils/tournaments/getTournamentById'
import { Separator } from '@/components/ui/separator'
import { Draw, Tournament } from '@prisma/client'
import { getAllDraws } from '@/app/admin/tournaments/[tournamentId]/draws/utils/getAllDraws'
import { ListOfMatchesDraws } from '@/app/admin/tournaments/[tournamentId]/matches/components/ListOfMatchesDraws'
import { LoadingSection } from '@/src/components/LoadingSection'

import { GeneralInfoTab } from './components/GeneralInfoTab'
import { PlayersTable } from './components/PlayersTable'
import { HeaderButtons } from './components/HeaderButtons'
import { DrawsTab } from './components/DrawsTab/DrawsTab'
import { OrderOfPlayTab } from './components/OrderOfPlayTab/OrderOfPlayTab'
import { ResultsTab } from './components/ResultsTab'

export default function Page({ params }) {
  const [tournament, setTournament] = useState<Tournament>({})
  const [isLoading, setLoading] = useState(true)
  const [draws, setDraws] = useState<Draw[]>([])

  const getTournament = async () => {
    const tournaments = await getTournamentById({ id: params.tournamentId })
    tournaments && setTournament(tournaments.tournaments)
    setLoading(false)
  }

  const getDraws = async () => {
    const allDraws = await getAllDraws({ tournamentId: params.tournamentId })
    allDraws && setDraws(allDraws)
  }

  useEffect(() => {
    getTournament()
    getDraws()
  }, [])

  return isLoading ? (
    <LoadingSection className="h-screen" />
  ) : (
    <>
      <div className="space-y-6 pb-16 pt-8 md:block">
        <div className="flex flex-row justify-between items-center">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {tournament?.name || ''}
            </h2>
          </div>
          {tournament && (
            <HeaderButtons {...tournament} onUpdate={getTournament} />
          )}
        </div>
        <Separator className="my-6" />
      </div>
      <Tabs defaultValue="general">
        <TabsList className="flex gap-2 justify-start w-fit mb-6">
          <TabsTrigger value="general">General information</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="draws">Draws</TabsTrigger>
          <TabsTrigger value="schedules">Order of play</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent
          value="general"
          className="grid grid-cols-3 gap-x-4 gap-y-3"
        >
          <GeneralInfoTab {...tournament} />
        </TabsContent>
        <TabsContent value="players" className="">
          {tournament && <PlayersTable players={tournament.participants} />}
        </TabsContent>
        <TabsContent value="draws">
          <DrawsTab tournamentId={params.tournamentId} />
        </TabsContent>
        <TabsContent value="matches">
          {draws?.length ? (
            <ListOfMatchesDraws draws={draws} onUpdate={() => getDraws()} />
          ) : (
            <div>No matches to display.</div>
          )}
        </TabsContent>
        <TabsContent value="schedules">
          <OrderOfPlayTab tournamentId={params.tournamentId} />
        </TabsContent>
        <TabsContent value="results">
          {tournament.participants?.length ? (
            <ResultsTab participants={tournament.participants} />
          ) : (
            <div>No results to display.</div>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}
