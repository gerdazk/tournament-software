import React from 'react'

import { Cell } from './Cell'
import { Row } from './Row'

type RoundRobinDrawProps = {
  numOfTeams: number
}

export const RoundRobinDraw: React.FC<RoundRobinDrawProps> = ({
  numOfTeams
}) => {
  const arrayOfParticipants = Array.from(
    { length: numOfTeams },
    (_, index) => index + 1
  )

  return (
    numOfTeams && (
      <div className={`grid grid-rows-${numOfTeams + 1}`}>
        <div className={`grid grid-cols-${numOfTeams + 1}`}>
          <Cell></Cell>
          {arrayOfParticipants.map(name => (
            <Cell key={name}>{name}</Cell>
          ))}
        </div>
        {arrayOfParticipants.map(name => (
          <Row teams={arrayOfParticipants} teamName={name} key={name} />
        ))}
      </div>
    )
  )
}
