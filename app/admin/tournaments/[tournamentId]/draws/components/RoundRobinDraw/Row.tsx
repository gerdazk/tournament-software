import { BlankCell } from './BlankCell'
import { Cell } from './Cell'
import { PlayerSelectDropdown } from './PlayerSelectDropdown'

type RowProps = {
  teams: number[]
  teamName: string | number
}

export const Row: React.FC<RowProps> = ({ teams, teamName }) => {
  return (
    <div className={`grid grid-cols-${teams?.length + 1} grid-rows-1`}>
      {/* <Cell>{teamName}</Cell> */}
      <PlayerSelectDropdown />
      {teams.map(name => {
        const shouldBeBlank = name === teamName
        return shouldBeBlank ? <BlankCell key={name} /> : <Cell key={name} />
      })}
    </div>
  )
}
