import type { User as FirebaseUser } from 'firebase/auth'

export type AuthUser = FirebaseUser | null

export interface Product {
  id: string
  title: string
  image: string
  price: number
  description: string
  rating: {
    rate: number
  }
}

export interface CartItemPayload {
  productId: string
  quantity: number
}

export interface CartItemDoc extends CartItemPayload  {
  id: string
}

export interface CartItem extends CartItemDoc {
  product: Product
}

export interface AddToCartPayload {
  productId: string
  quantity?: number
}

export interface UpdateCartItemPayload {
  existingCartItem: CartItem
  quantity: number
}

export interface SignupFormValues {
  email: string
  password: string
}

export interface LoginFormValues {
  email: string
  password: string
}
