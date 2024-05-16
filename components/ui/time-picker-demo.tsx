'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'

import { TimePickerInput } from './time-picker-input'

interface TimePickerDemoProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
}

export const TimePicker = ({
  date,
  setDate,
  className
}: TimePickerDemoProps) => {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Hours
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutes
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => hourRef.current?.focus()}
        />
      </div>
    </div>
  )
}
