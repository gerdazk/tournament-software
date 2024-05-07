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
import { Location } from '@prisma/client'
import { Trash2Icon } from 'lucide-react'

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
  return (
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
                onClick={() => handleDelete(location.id)}
                className="cursor-pointer h-5 w-5"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
