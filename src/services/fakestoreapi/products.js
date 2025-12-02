import axios from './axios'

export const productsService = {
  async getProducts () {
    const { data } = await axios.get('/products')
    return data
  },
  async getProductById (id) {
    const { data } = await axios.get(`/products/${id}`)
    return data
  },
  async getProductsById (idArray) {
    const products = await Promise.all(
      idArray.map(id => this.getProductById(id))
    )
    return products
  }
}
