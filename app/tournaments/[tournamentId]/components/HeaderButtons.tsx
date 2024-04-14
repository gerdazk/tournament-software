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
  id
}: HeaderButtonsProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const { data: sessionData } = useSession()
  const isOrganizer = organizerId === sessionData?.user?.id
  const router = useRouter()

  const shouldShowRegisterButton =
    !isOrganizer &&
    isAllowedToRegister({
      is_registration_open,
      role: sessionData?.user?.role
    })

  const shouldShowWithdrawButton =
    !isOrganizer &&
    isAllowedToWithdraw({
      is_registration_open,
      id: sessionData?.user?.id,
      participants
    })

  const onParticipantRegistration = async ({ data }) => {
    try {
      await addParticipant({ ...data })
      setDialogOpen(false)
    } catch (e) {}
  }

  const onParticipantWithdrawal = async ({ data }) => {
    try {
      await removeParticipant({ ...data })
      setDialogOpen(false)
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
            onClick={() => router.push(`/tournaments/${id}/edit`)}
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
