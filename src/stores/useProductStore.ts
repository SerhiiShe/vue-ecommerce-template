import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productService } from '@/services/fakestoreapi/product'
import { Product } from '@/types'

export const useProductStore = defineStore('product', () => {
  // state
  const products = ref<Product[]>([])

  // actions
  async function loadProducts() {
    try {
      const data = await productService.getProducts()
      products.value = data
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async function loadProductById(id: number) {
    try {
      const data = await productService.getProductById(id)
      return data
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  async function loadProductsById(idArray: number[]) {
    try {
      const products = await productService.getProductsById(idArray)
      return products
    } catch (e: any) {
      console.error(e)
      throw e
    }
  }

  return {
    products,
    loadProducts,
    loadProductById,
    loadProductsById
  }
})


// export const useProductStore = defineStore('product', {
//   state: () => ({
//     products: []
//   }),
//   actions: {
//     async loadProducts () {
//       try {
//         const data = await productService.getProducts()
//         this.products = data
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     async loadProductById (id) {
//       try {
//         const data = await productService.getProductById(id)
//         return data
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     async loadProductsById (idArray) {
//       try {
//         const products = await productService.getProductsById(idArray)
//         return products
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     }
//   }
// })
