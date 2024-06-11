import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Draw } from '@prisma/client'

import { Participant } from '../types'

import { RoundRobinDraw } from './RoundRobinDraw/RoundRobinDraw'

type ListOfDrawsProps = {
  draws: Draw[]
  players: Participant[]
  onUpdate: () => void
}

export const ListOfDraws: React.FC<ListOfDrawsProps> = ({
  draws,
  players,
  onUpdate
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {draws.map(({ name, id, ...draw }) => {
        const filteredPlayers = players?.filter(({ drawId }) => {
          return !drawId || drawId === id
        })
        return (
          <AccordionItem value={name} key={name}>
            <AccordionTrigger>{name}</AccordionTrigger>
            <AccordionContent>
              <RoundRobinDraw
                draw={{ ...draw, name, id }}
                players={filteredPlayers}
                onUpdate={onUpdate}
              />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
