import { apiRequest } from '../api/client'
import type { TokenResponse, User } from './types'

export function register(email: string, password: string): Promise<User> {
  return apiRequest<User>('/auth/register', {
    method: 'POST',
    auth: false,
    body: { email, password },
  })
}

export function login(email: string, password: string): Promise<TokenResponse> {
  return apiRequest<TokenResponse>('/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  })
}

export function fetchMe(): Promise<User> {
  return apiRequest<User>('/auth/me')
}
