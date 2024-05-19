import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Draw } from '@prisma/client'

import { MatchesTable } from './MatchesTable'

type ListOfMatchesDrawsProps = {
  draws: Draw[]
  shouldAllowEditing?: boolean
  tournamentId: number
  shouldAllowAdminEditing?: boolean
}

export const ListOfMatchesDraws: React.FC<ListOfMatchesDrawsProps> = ({
  draws,
  shouldAllowEditing,
  tournamentId,
  shouldAllowAdminEditing
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {draws.map(({ name, id, matches }) => {
        return matches?.length ? (
          <AccordionItem value={name} key={id}>
            <AccordionTrigger>{name}</AccordionTrigger>
            <AccordionContent>
              <MatchesTable
                matches={matches}
                shouldAllowEditing={shouldAllowEditing}
                shouldAllowAdminEditing={shouldAllowAdminEditing}
                tournamentId={tournamentId}
              />
            </AccordionContent>
          </AccordionItem>
        ) : (
          ''
        )
      })}
    </Accordion>
  )
}
