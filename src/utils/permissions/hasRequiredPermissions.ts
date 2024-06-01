import { UserRoles, permissionMap } from './permissionMap'

type Props = {
  role: UserRoles
  permission: PermissionName
}

export const hasRequiredPermissions = ({ role, permission }: Props) => {
  const rolePermissions = permissionMap[role]
  return rolePermissions && rolePermissions.includes(permission)
}
