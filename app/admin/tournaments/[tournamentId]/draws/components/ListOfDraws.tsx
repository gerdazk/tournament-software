import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Draw } from '@prisma/client'

import { RoundRobinDraw } from './RoundRobinDraw/RoundRobinDraw'

export const ListOfDraws = ({ draws }: { draws: Draw[] }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {draws.map(({ numOfTeams, name }) => (
        <AccordionItem value={name} key={name}>
          <AccordionTrigger>{name}</AccordionTrigger>
          <AccordionContent>
            <RoundRobinDraw numOfTeams={numOfTeams} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
