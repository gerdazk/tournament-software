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
}

export const ListOfMatchesDraws: React.FC<ListOfMatchesDrawsProps> = ({
  draws
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {draws.map(({ name, id, matches }) => {
        return matches?.length ? (
          <AccordionItem value={name} key={id}>
            <AccordionTrigger>{name}</AccordionTrigger>
            <AccordionContent>
              <MatchesTable matches={matches} />
            </AccordionContent>
          </AccordionItem>
        ) : (
          ''
        )
      })}
    </Accordion>
  )
}
