import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Trash2Icon } from 'lucide-react'

export const StaffTable = ({ staffMembers = [], handleDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {staffMembers?.length ? (
          staffMembers.map(member => {
            return (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member?.name}</TableCell>
                <Trash2Icon
                  onClick={() => {
                    handleDelete(member.id)
                  }}
                  className="cursor-pointer h-5 w-5 mt-3"
                />
              </TableRow>
            )
          })
        ) : (
          <TableRow>
            <TableCell colSpan={2}>No members to display.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
