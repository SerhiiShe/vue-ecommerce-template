import type { User as FirebaseUser } from 'firebase/auth'

export type AuthUser = FirebaseUser | null

export interface AuthPayload {
  email: string
  password: string
}
