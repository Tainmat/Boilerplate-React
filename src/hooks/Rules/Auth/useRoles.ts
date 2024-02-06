import { useCallback } from 'react'

import { useAuthContext } from '@/contexts/Auth'

export function useAuthRoles() {
  const { user } = useAuthContext()

  const userRoles = user?.roles

  const checkIfUserHasRole = useCallback(
    (role: string): boolean => {
      return userRoles?.includes(role) || false
    },
    [userRoles]
  )

  const isUser = useCallback((): boolean => {
    return checkIfUserHasRole(String(process.env.REACT_APP_ROLE_USER))
  }, [checkIfUserHasRole])

  const handleUserRoles = useCallback(
    (roles: Array<{ sigla: string }>): string[] => {
      if (!roles || !roles.length) return []

      return roles.map(role => role.sigla)
    },
    []
  )

  return {
    checkIfUserHasRole,
    isUser,
    handleUserRoles
  }
}
