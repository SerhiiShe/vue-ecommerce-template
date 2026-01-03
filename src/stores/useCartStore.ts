import { defineStore } from 'pinia'
import { ref } from 'vue'
import { firestoreService } from '@/services/firebase/firestore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useProductStore } from '@/stores/useProductStore'
import { CartItemDoc, CartItem, AddToCartPayload, UpdateCartItemPayload, Product } from '@/types'


export const useCartStore = defineStore('cart', () => {
  // state
  const cart = ref<CartItem[]>([])
  const isLoaded = ref<boolean>(false)
  const isOpen = ref<boolean>(false)

  // actions
  async function addItemToCart({ productId, quantity = 1 }: AddToCartPayload): Promise<void> {
    try {
      if (!isLoaded.value) await loadUserCart()

      const existingCartItem = cart.value.find((cartItem) => cartItem.productId === productId)

      if (existingCartItem) {
        await updateCartItem({ existingCartItem, quantity })
      } else {
        await createCartItem({ productId, quantity })
      }
    } catch (e: unknown) {
      console.error('addItemToCart failed:', e)
      throw e
    }
  }

  async function updateCartItem({ existingCartItem, quantity }: UpdateCartItemPayload): Promise<void> {
    try {
      const authStore = useAuthStore()
      const uid = authStore.uid

      if (!uid) {
        throw new Error('User is not authenticated')
      }

      const pathArray = ['users', uid, 'cart', existingCartItem.id]

      await firestoreService.updateCollectionItem(pathArray, {
        quantity: existingCartItem.quantity + quantity,
      })

      existingCartItem.quantity += quantity
    } catch (e: unknown) {
      console.error('updateCartItem failed:', e)
      throw e
    }
  }

  async function createCartItem({ productId, quantity = 1 }: AddToCartPayload): Promise<void> {
    try {
      const productStore = useProductStore()
      const authStore = useAuthStore()
      const uid = authStore.uid

      if (!uid) {
        throw new Error('User is not authenticated')
      }

      const collectionPath = `users/${uid}/cart`
      const newCartItem = {
        productId,
        quantity,
      }

      const docId: string = await firestoreService.addCollectionItem(collectionPath, newCartItem)

      const product = await productStore.loadProductById(productId)

      if (!product) {
        throw new Error('Product not found')
      }

      cart.value.push({
        id: docId,
        ...newCartItem,
        product,
      })
    } catch (e: unknown) {
      console.error('createCartItem failed:', e)
      throw e
    }
  }

  async function deleteCartItem(cartItem: CartItem): Promise<void> {
    try {
      const authStore = useAuthStore()
      const uid = authStore.uid

      if (!uid) {
        throw new Error('User is not authenticated')
      }

      const pathArray = ['users', uid, 'cart', cartItem.id]

      await firestoreService.deleteCollectionItem(pathArray)

      cart.value = cart.value.filter((item) => item.id !== cartItem.id)
    } catch (e: unknown) {
      console.error('deleteCartItem failed:', e)
      throw e
    }
  }

  async function loadUserCart(): Promise<void> {
    try {
      const authStore = useAuthStore()
      const uid = authStore.uid

      if (!uid) {
        throw new Error('User is not authenticated')
      }

      const cartData: CartItemDoc[] = await firestoreService.getCollectionItems(['users', uid, 'cart'])

      const updatedCart: CartItem[] = await loadCartProducts(cartData)

      cart.value = updatedCart
      isLoaded.value = true
    } catch (e: unknown) {
      console.error('loadUserCart failed:', e)
      throw e
    }
  }

  async function loadCartProducts(cartData: CartItemDoc[]): Promise<CartItem[]> {
    try {
      const productStore = useProductStore()
      const cartIdArray = cartData.map((cartItem) => cartItem.productId)
      const cartProducts: Product[] = await productStore.loadProductsById(cartIdArray)

      const updatedCart = cartData.map((cartItem) => {
        const product = cartProducts.find((cartProduct) => cartItem.productId === cartProduct.id)
        if (!product) {
          throw new Error(`Product with id ${cartItem.productId} not found`)
        }
        return {
          ...cartItem,
          product: product
        }
      })

      return updatedCart
    } catch (e: unknown) {
      console.error('loadCartProducts failed:', e)
      throw e
    }
  }

  function openCart(): void {
    isOpen.value = true
  }

  function closeCart(): void {
    isOpen.value = false
  }

  return {
    cart,
    isLoaded,
    isOpen,
    addItemToCart,
    updateCartItem,
    createCartItem,
    deleteCartItem,
    loadUserCart,
    loadCartProducts,
    openCart,
    closeCart,
  }
})



// export const useCartStore = defineStore('cart', {
//   state: () => ({
//     cart: [],
//     isLoaded: false,
//     isOpen: false
//   }),
//   actions: {
//     async addItemToCart ({ productId, quantity = 1 }) {
//       try {
//         if (!this.isLoaded) await this.loadUserCart()

//         const existingCartItem = this.cart.find(cartItem => cartItem.productId === productId)

//         if (existingCartItem) {
//           await this.updateCartItem({ existingCartItem, quantity })
//           console.log('1:', { existingCartItem, quantity })
//         } else {
//           await this.createCartItem({ productId, quantity })
//           console.log('2:', { productId, quantity })
//         }
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     async updateCartItem ({ existingCartItem, quantity }) {
//       try {
//         const authStore = useAuthStore()
//         const uid = authStore.uid
//         const pathArray = ['users', uid, 'cart', existingCartItem.id]

//         await firestoreService.updateCollectionItem(pathArray, {
//           quantity: existingCartItem.quantity + quantity
//         })

//         existingCartItem.quantity += quantity
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     async createCartItem ({ productId, quantity = 1 }) {
//       try {
//         const productStore = useProductStore()
//         const authStore = useAuthStore()
//         const uid = authStore.uid
//         const collectionPath = `users/${uid}/cart`
//         const newCartItem = {
//           productId,
//           quantity
//         }

//         const docId = await firestoreService.addCollectionItem(collectionPath, newCartItem)

//         const product = await productStore.loadProductById(productId)

//         this.cart.push({
//           id: docId,
//           ...newCartItem,
//           product
//         })
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     async deleteCartItem (cartItem) {
//       try {
//         const authStore = useAuthStore()
//         const uid = authStore.uid
//         const pathArray = ['users', uid, 'cart', cartItem.id]

//         await firestoreService.deleteCollectionItem(pathArray)

//         this.cart = this.cart.filter(item => item.id !== cartItem.id)
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     async loadUserCart () {
//       try {
//         const authStore = useAuthStore()
//         const uid = authStore.uid
//         const cartData = await firestoreService.getCollectionItems(['users', uid, 'cart'])

//         const cart = await this.loadCartProducts(cartData)

//         this.cart = cart
//         this.isLoaded = true
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     async loadCartProducts (cartData) {
//       try {
//         const productStore = useProductStore()
//         const cartIdArray = cartData.map(cartItem => cartItem.productId)
//         const cartProducts = await productStore.loadProductsById(cartIdArray)

//         const updatedCart = cartData.map(cartItem => {
//           return {
//             ...cartItem,
//             product: cartProducts.find(cartProduct => cartItem.productId === cartProduct.id)
//           }
//         })

//         return updatedCart
//       } catch (e) {
//         console.error(e)
//         throw e
//       }
//     },
//     openCart () {
//       this.isOpen = true
//     },
//     closeCart () {
//       this.isOpen = false
//     }
//   }
// })
