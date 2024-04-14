'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type ConfirmationDialogProps = {
  onSubmit: (data: any) => void
  onCancel: () => void
  title: string
  subtitle?: string
  isOpen: boolean
  onOpenChange: (state: boolean) => void
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onSubmit,
  onCancel,
  title,
  subtitle,
  isOpen,
  onOpenChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button type="submit" onClick={onSubmit}>
            Confirm
          </Button>
          <Button type="submit" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
