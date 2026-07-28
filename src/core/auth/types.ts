export type User = {
  id: number
  email: string
  created_at: string
}

export type TokenResponse = {
  access_token: string
  token_type: string
}
