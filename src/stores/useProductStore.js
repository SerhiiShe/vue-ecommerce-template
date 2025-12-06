import { defineStore } from 'pinia'
import { productService } from '@/services/fakestoreapi/product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: []
  }),
  actions: {
    async loadProducts () {
      try {
        const data = await productService.getProducts()
        this.products = data
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
})