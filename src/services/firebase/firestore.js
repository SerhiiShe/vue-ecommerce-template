import { db } from './config'
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export const firestoreService = {
  async addCollectionItem (path, item) {
    const docRef = await addDoc(collection(db, path), item)
    return docRef.id
  },
  async getCollectionItems (pathArray) {
    const querySnapshot = await getDocs(collection(db, ...pathArray))
    const docsData = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    return docsData
  },
  async updateCollectionItem (pathArray, newData) {
    await updateDoc(doc(db, ...pathArray), newData, { merge: true })
  },
  async deleteCollectionItem (pathArray) {
    await deleteDoc(doc(db, ...pathArray))
  }
}
