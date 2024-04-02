import { TournamentListCard } from './TournamentListCard'
import { Tournament } from './types'

export const TournamentList = ({
  tournaments
}: {
  tournaments: Tournament[]
}) => (
  <div className="flex flex-col gap-4">
    {tournaments?.length ? (
      tournaments.map(tournament => (
        <TournamentListCard {...tournament} key={tournament.id} />
      ))
    ) : (
      <div>No tournaments to display</div>
    )}
  </div>
)
