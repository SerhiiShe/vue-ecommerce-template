import { defineStore } from 'pinia'
import { authService } from '@/services/firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase/config'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    uid (state) {
      return state.user ? state.user.uid : null
    },
    isAuth (state) {
      return !!state.user
    },
    email (state) {
      return state.user.email
    },
  },
  actions: {
    async signUp (email, password) {
      try {
        const user = await authService.register(email, password)
        this.user = user
        router.push('/')
      } catch (e) {
        console.error(e.code)
        throw e
      }
    },
    async login (email, password) {
      try {
        const user = await authService.signIn(email, password)
        this.user = user
        router.push('/')
      } catch (e) {
        console.error(e.code)
        throw e
      }
    },
    async logout () {
      try {
        await authService.logout()
        this.user = null
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    init () {
      onAuthStateChanged(auth, user => {
        this.user = user
      })
    }
  },
})
