'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useEffect } from 'react'

import { Participant } from '../../types'

type PlayersSelectDropdownProps = {
  players: Participant[]
  handleChange: (player: Participant) => void
  drawId: number
  drawOrderNo: number
  index: number
}

export const PlayerSelectDropdown: React.FC<PlayersSelectDropdownProps> = ({
  players = [],
  index,
  handleChange,
  drawId,
  drawOrderNo
}) => {
  const [selectedValue, setSelectedValue] = React.useState<Participant>({})

  useEffect(() => {
    const defaultValue = players.find(
      ({ drawOrderNo }) => drawOrderNo === index
    )
    defaultValue && setSelectedValue(defaultValue)
  }, [])

  const handleValueChange = e => {
    handleChange({ ...e, drawId, drawOrderNo })
    setSelectedValue(e)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedValue?.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Players</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedValue?.label}
          onValueChange={handleValueChange}
        >
          {players.map(({ label, value, drawOrderNo, ...rest }) => {
            return (
              <DropdownMenuRadioItem
                key={value}
                value={{
                  label,
                  value,
                  drawOrderNo,
                  ...rest
                }}
                disabled={!!drawOrderNo && index !== drawOrderNo}
              >
                {label}
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
