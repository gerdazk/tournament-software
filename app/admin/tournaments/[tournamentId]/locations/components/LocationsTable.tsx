'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ConfirmationDialog } from '@/src/components/Dialogs/ConfirmationDialog'
import { Location } from '@prisma/client'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

type LocationsTableProps = {
  locations: Location[]
  className?: string
  handleDelete: (id: number) => void
}

export const LocationsTable: React.FC<LocationsTableProps> = ({
  locations = [],
  className,
  handleDelete
}) => {
  const [isDeleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] =
    useState(false)
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  )
  const [isLoading, setLoading] = useState(false)

  const onDelete = async (id: number) => {
    setLoading(true)
    await handleDelete(id)
    setLoading(false)
    setDeleteConfirmationDialogOpen(false)
  }

  return (
    <>
      <Table className={`w-full ${className || ''}`}>
        <TableCaption>A list of tournament locations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map(location => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">{location.id}</TableCell>
              <TableCell className="font-medium">{location.name}</TableCell>
              <TableCell className="font-medium">
                <Trash2Icon
                  onClick={() => {
                    setSelectedLocationId(location.id)
                    setDeleteConfirmationDialogOpen(true)
                  }}
                  className="cursor-pointer h-5 w-5"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isDeleteConfirmationDialogOpen && selectedLocationId && (
        <ConfirmationDialog
          onSubmit={() => onDelete(selectedLocationId)}
          onCancel={() => setDeleteConfirmationDialogOpen(false)}
          title="Are you sure you want to delete this location?"
          subtitle="This action can not be undone."
          isOpen={isDeleteConfirmationDialogOpen}
          onOpenChange={setDeleteConfirmationDialogOpen}
          isLoading={isLoading}
        />
      )}
    </>
  )
}
