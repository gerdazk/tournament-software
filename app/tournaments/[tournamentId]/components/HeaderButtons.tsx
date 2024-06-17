'use client'

import { Button } from '@/components/ui/button'
import { ConfirmationDialog } from '@/src/components/Dialogs/ConfirmationDialog'
import { addParticipant } from '@/src/utils/tournaments/addParticipant'
import { isAllowedToRegister } from '@/src/utils/tournaments/permissions/isAllowedToRegister'
import { isAllowedToWithdraw } from '@/src/utils/tournaments/permissions/isAllowedToWithdraw'
import { removeParticipant } from '@/src/utils/tournaments/removeParticipant'
import { Tournament } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type HeaderButtonsProps = Partial<Tournament> & {
  participants: any
}

export const HeaderButtons = ({
  participants,
  organizerId,
  is_registration_open,
  id,
  onUpdate
}: HeaderButtonsProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const { data: sessionData } = useSession()
  const isOrganizer = organizerId === sessionData?.user?.id
  const router = useRouter()

  const shouldShowRegisterButton =
    !isOrganizer &&
    isAllowedToRegister({
      is_registration_open,
      role: sessionData?.user?.role,
      participants,
      id: sessionData?.user?.id
    })

  const shouldShowWithdrawButton =
    !isOrganizer &&
    isAllowedToWithdraw({
      is_registration_open,
      id: sessionData?.user?.id,
      participants
    })

  const onParticipantRegistration = async () => {
    await addParticipant({
      userId: sessionData?.user?.id,
      tournamentId: id
    })
    setDialogOpen(false)
    onUpdate()
  }

  const onParticipantWithdrawal = async () => {
    const participant = participants.find(
      ({ user }) => user.id === sessionData?.user?.id
    )
    try {
      await removeParticipant({ id: participant?.id })
      setDialogOpen(false)
      onUpdate()
    } catch (e) {}
  }

  return (
    <div>
      {shouldShowRegisterButton && (
        <Button onClick={() => setDialogOpen(true)}>Register</Button>
      )}
      {shouldShowWithdrawButton && (
        <Button onClick={() => setDialogOpen(true)}>Withdraw</Button>
      )}
      {isOrganizer && (
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/tournaments/${id}/general`)}
          >
            Edit tournament
          </Button>
        </div>
      )}
      {(shouldShowRegisterButton || shouldShowWithdrawButton) && (
        <ConfirmationDialog
          title={
            shouldShowRegisterButton
              ? 'Are you sure you want to register?'
              : 'Are you sure you want to withdraw?'
          }
          isOpen={isDialogOpen}
          onOpenChange={setDialogOpen}
          onCancel={() => setDialogOpen(false)}
          onSubmit={
            shouldShowRegisterButton
              ? onParticipantRegistration
              : onParticipantWithdrawal
          }
        />
      )}
    </div>
  )
}
