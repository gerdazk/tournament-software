export enum PermissionName {
  MANAGE_TOURNAMENT = 'Manage tournament',
  ENTER_SCORE = 'Enter score',
  EDIT_SCORE = 'Edit score',
  EDIT_PROFILES = 'Edit profiles',
  MANAGE_MATCHES = 'Manage matches'
}

export type UserRoles = 'admin' | 'staffMember' | 'tournamentOrganizer'

export const permissionMap = {
  admin: [
    PermissionName.MANAGE_TOURNAMENT,
    PermissionName.ENTER_SCORE,
    PermissionName.EDIT_SCORE,
    PermissionName.EDIT_PROFILES,
    PermissionName.MANAGE_MATCHES
  ],
  referee: [
    PermissionName.ENTER_SCORE,
    PermissionName.EDIT_SCORE,
    PermissionName.MANAGE_MATCHES
  ],
  organizer: [
    PermissionName.MANAGE_TOURNAMENT,
    PermissionName.ENTER_SCORE,
    PermissionName.EDIT_SCORE,
    PermissionName.MANAGE_MATCHES
  ]
}
