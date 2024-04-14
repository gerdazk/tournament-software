type IsAllowedToRegisterProps = {
  is_registration_open: boolean
  role: string
}

export const isAllowedToRegister = ({
  is_registration_open,
  role
}: IsAllowedToRegisterProps): boolean => is_registration_open && role === 'user'
