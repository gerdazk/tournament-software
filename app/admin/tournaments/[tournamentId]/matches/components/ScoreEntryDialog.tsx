import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { SelectField } from '@/src/components/Input/SelectField'
import { Participant } from '@prisma/client'
import { useForm } from 'react-hook-form'

type ScoreEntryDialogProps = {
  matchId: number
  players: Participant[]
  isOpen: boolean
  setOpen: (val: boolean) => void
}

export const ScoreEntryDialog: React.FC<ScoreEntryDialogProps> = ({
  matchId,
  players = [],
  isOpen,
  setOpen
}) => {
  const [scoringUnits, setScoringUnits] = [
    {
      matchId,
      index: 0,
      participantId: players[0].user.id,
      score: 0
    },
    {
      matchId,
      index: 0,
      participantId: players[1].user.id,
      score: 0
    }
  ]

  const form = useForm({
    defaultValues: {}
  })

  const playersOptions = players.map(({ user }) => ({
    text: user?.name,
    value: user?.id?.toString()
  }))

  console.log({ playersOptions })

  const onSubmit = async (values: any) => {
    // const result = await signIn('credentials', {
    //   redirect: false,
    //   ...values
    // })

    console.log({ values })

    const result = {}

    if (!result?.error) {
      console.log('Successfully logged in:', result)
    } else {
      console.error('Login failed:', result?.error)
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter score of this match</DialogTitle>
          <DialogDescription>
            Enter the score of this match. This action can not be undone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SelectField
              control={form.control}
              label="Winner of this match"
              description=""
              placeholder=""
              name="winnerId"
              items={playersOptions}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
