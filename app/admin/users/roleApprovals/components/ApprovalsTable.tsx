import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ManageRoleProps, manageRole } from '@/src/utils/users/manageRole'
import { User } from '@prisma/client'
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'

export function ApprovalsTable({ requests }: { requests: User[] }) {
  const handleRoleUpdate = async ({
    role,
    isApproved,
    id
  }: ManageRoleProps) => {
    await manageRole({ role, isApproved, id })
  }

  return (
    <Table>
      <TableCaption>A list of all role requests.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Requested role</TableHead>
          <TableHead>Approve/Disapprove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map(request => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.name}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell>{request.proposed_role}</TableCell>
            <TableCell className="flex gap-2 items-center">
              <CheckIcon
                className="h-5 w-5"
                onClick={() =>
                  handleRoleUpdate({
                    isApproved: true,
                    role: request.proposed_role,
                    id: request.id
                  })
                }
              />
              <Cross2Icon
                onClick={() =>
                  handleRoleUpdate({
                    isApproved: false,
                    role: request.proposed_role,
                    id: request.id
                  })
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
