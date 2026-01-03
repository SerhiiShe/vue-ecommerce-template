import type { User as FirebaseUser } from 'firebase/auth'

export type AuthUser = FirebaseUser | null

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

export interface CartItemPayload {
  productId: number
  quantity: number
}

export interface CartItemDoc extends CartItemPayload  {
  id: string
}

export interface CartItem extends CartItemDoc {
  product: Product
}

export interface AddToCartPayload {
  productId: number
  quantity?: number
}

export interface UpdateCartItemPayload {
  existingCartItem: CartItem
  quantity: number
}
