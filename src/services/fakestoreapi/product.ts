import axios from './axios'
import { Product } from '@/types'

export const productService = {
  async getProducts(): Promise<Product[]> {
    const { data } = await axios.get<Product[]>('/products')
    return data
  },
  async getProductById (id: string): Promise<Product> {
    const { data } = await axios.get<Product>(`/products/${id}`)
    return data
  },
  async getProductsById (idArray: string[]): Promise<Product[]> {
    const products = await Promise.all(
      idArray.map(id => this.getProductById(id))
    )
    return products
  }
}
