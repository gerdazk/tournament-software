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
import { findPlayerByDrawOrderNo } from '@/src/utils/findPlayerByDrawOrderNo'

import { Participant } from '../../types'

type PlayersSelectDropdownProps = {
  players: Participant[]
  handleChange: (player: Participant) => void
  drawId: number
  drawOrderNo: number
  disabled?: boolean
}

export const PlayerSelectDropdown: React.FC<PlayersSelectDropdownProps> = ({
  players = [],
  handleChange,
  drawId,
  drawOrderNo,
  disabled
}) => {
  const [selectedValue, setSelectedValue] = React.useState<Participant>({})

  useEffect(() => {
    const defaultValue = findPlayerByDrawOrderNo({
      players,
      orderNo: drawOrderNo
    })
    setSelectedValue(defaultValue)
  }, [players, drawOrderNo])

  const handleValueChange = e => {
    if (e?.value === selectedValue?.value) {
      handleChange({ ...e, drawId: null, drawOrderNo: null })
      setSelectedValue(null)
    } else {
      handleChange({ ...e, drawId, drawOrderNo })
      setSelectedValue(e)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className="h-full min-h-[38px]"
        >
          {selectedValue?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Players</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedValue?.label}
          onValueChange={handleValueChange}
        >
          {players.map(
            ({ label, value, drawOrderNo: playerDrawOrderNo, ...rest }) => {
              return (
                <DropdownMenuRadioItem
                  key={value}
                  value={{
                    label,
                    value,
                    drawOrderNo,
                    ...rest
                  }}
                >
                  {label}
                </DropdownMenuRadioItem>
              )
            }
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
