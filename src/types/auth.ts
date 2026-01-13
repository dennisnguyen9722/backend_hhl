export type JwtAdminPayload = {
  id: string
  email: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR'
}
