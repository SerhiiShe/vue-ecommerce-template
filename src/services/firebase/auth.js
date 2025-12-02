import { auth } from './config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth'

export const authService = {
  async register (email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  },
  async signIn (email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  },
  async logout () {
    await signOut(auth)
  },
  async changeEmail (newEmail) {
    await updateEmail(auth.currentUser, newEmail)
  },
  async changePassword (newPassword) {
    await updatePassword(auth.currentUser, newPassword)
  }
}
