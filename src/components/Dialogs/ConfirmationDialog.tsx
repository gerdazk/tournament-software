'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'

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
  const [isLoading, setLoading] = useState(false)
  const handleSubmit = async e => {
    try {
      setLoading(true)
      await onSubmit(e)
    } catch {}
    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-between min-h-[200px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <Button
            type="submit"
            onClick={e => handleSubmit(e)}
            isLoading={isLoading}
          >
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
