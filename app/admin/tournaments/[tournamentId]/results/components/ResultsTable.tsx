import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ErrorMessage } from '@/src/components/Labels/ErrorMessage'
import { SuccessMessage } from '@/src/components/Labels/SuccessMessage'
import { Participant, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type ResultsTableProps = {
  participants: (Participant & {
    user: User
  })[]
  className?: string
}

export const ResultsTable: React.FC<ResultsTableProps> = ({
  participants = [],
  className,
  participantsToSelectInitialState
}) => {
  const router = useRouter()

  const [selectedParticipants, setSelectedParticipants] = useState(
    participantsToSelectInitialState
  )
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setLoading] = useState(false)

  const places = Array.from({ length: participants?.length }, (_, i) => i + 1)

  const handleSelectChange = (place, id) => {
    const participant = participants.find(p => p.id === id)
    const newSelectedParticipants = {
      ...selectedParticipants,
      [place]: participant || null
    }
    setSelectedParticipants(newSelectedParticipants)
  }

  const selectedParticipantIds = Object.values(selectedParticipants).map(
    participant => participant?.id
  )

  const handleSave = async () => {
    setSuccessMessage('')
    setErrorMessage('')
    setLoading(true)
    const finalValues = []
    participants.map(participant => {
      const placeOfParticipant = places.find(
        place => selectedParticipants[place]?.id === participant.id
      )
      finalValues.push({
        place: placeOfParticipant || null,
        id: participant.id
      })
    })

    if (!finalValues?.length) {
      setLoading(false)
      return
    }

    const res = await fetch('/api/tournament/1/participants', {
      method: 'PUT',
      body: JSON.stringify(finalValues)
    })

    if (res?.ok) {
      setLoading(false)
      setSuccessMessage('Results saved.')
    } else {
      setErrorMessage('Failed to save results. Please try again.')
    }
  }

  return (
    <>
      <Table className={`w-1/2 ${className || ''}`}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Place</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.map(place => {
            const participantInPlace = selectedParticipants?.[place]

            return (
              <TableRow key={place}>
                <TableCell>{place}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={e => handleSelectChange(place, e)}
                    value={participantInPlace?.id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a player" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>...</SelectItem>
                      {participants?.length &&
                        participants.map(participant => (
                          <SelectItem
                            value={participant.id}
                            key={participant.id}
                            disabled={selectedParticipantIds?.includes(
                              participant.id
                            )}
                          >
                            {participant?.user?.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Button onClick={handleSave} isLoading={isLoading} className="mt-4">
        Save and publish changes
      </Button>
      <div className="mt-5">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {successMessage && <SuccessMessage message={successMessage} />}
      </div>
    </>
  )
}
