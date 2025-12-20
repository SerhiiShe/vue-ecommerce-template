import { defineStore } from 'pinia'
import { firestoreService } from '@/services/firebase/firestore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useProductStore } from '@/stores/useProductStore'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    isLoaded: false,
    isOpen: false
  }),
  actions: {
    async addItemToCart ({ productId, quantity = 1 }) {
      try {
        if (!this.isLoaded) await this.loadUserCart()

        const existingCartItem = this.cart.find(cartItem => cartItem.productId === productId)

        if (existingCartItem) {
          await this.updateCartItem({ existingCartItem, quantity })
          console.log('1:', { existingCartItem, quantity })
        } else {
          await this.createCartItem({ productId, quantity })
          console.log('2:', { productId, quantity })
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async updateCartItem ({ existingCartItem, quantity }) {
      try {
        const authStore = useAuthStore()
        const uid = authStore.uid
        const pathArray = ['users', uid, 'cart', existingCartItem.id]

        await firestoreService.updateCollectionItem(pathArray, {
          quantity: existingCartItem.quantity + quantity
        })

        existingCartItem.quantity += quantity
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async createCartItem ({ productId, quantity }) {
      try {
        const productStore = useProductStore()
        const authStore = useAuthStore()
        const uid = authStore.uid
        const collectionPath = `users/${uid}/cart`
        const newCartItem = {
          productId,
          quantity
        }

        const docId = await firestoreService.addCollectionItem(collectionPath, newCartItem)

        const product = await productStore.loadProductById(productId)

        this.cart.push({
          id: docId,
          ...newCartItem,
          product
        })
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async deleteCartItem (cartItem) {
      try {
        const authStore = useAuthStore()
        const uid = authStore.uid
        const pathArray = ['users', uid, 'cart', cartItem.id]

        await firestoreService.deleteCollectionItem(pathArray)

        this.cart = this.cart.filter(item => item.id !== cartItem.id)
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async loadUserCart () {
      try {
        const authStore = useAuthStore()
        const uid = authStore.uid
        const cartData = await firestoreService.getCollectionItems(['users', uid, 'cart'])

        const cart = await this.loadCartProducts(cartData)

        this.cart = cart
        this.isLoaded = true
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async loadCartProducts (cartData) {
      try {
        const productStore = useProductStore()
        const cartIdArray = cartData.map(cartItem => cartItem.productId)
        const cartProducts = await productStore.loadProductsById(cartIdArray)

        const updatedCart = cartData.map(cartItem => {
          return {
            ...cartItem,
            product: cartProducts.find(cartProduct => cartItem.productId === cartProduct.id)
          }
        })

        return updatedCart
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    openCart () {
      this.isOpen = true
    },
    closeCart () {
      this.isOpen = false
    }
  }
})