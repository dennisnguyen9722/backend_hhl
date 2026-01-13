import { ROLE_PERMISSIONS } from '../config/rbac'

export function getRBACConfig() {
  return Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => ({
    role,
    permissions
  }))
}
