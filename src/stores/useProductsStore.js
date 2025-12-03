import { defineStore } from 'pinia'
import { productsService } from '@/services/fakestoreapi/products'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),
  actions: {
    async loadProducts () {
      try {
        const data = await productsService.getProducts()
        this.products = data
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
})