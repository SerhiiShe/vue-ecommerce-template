import type { User as FirebaseUser } from 'firebase/auth'

export type AuthUser = FirebaseUser | null

export interface AuthPayload {
  email: string
  password: string
}

export interface Product {
  id: number
  title: string
  image: string
  price: number
  description: string
  rating: {
    rate: number
  }
}
