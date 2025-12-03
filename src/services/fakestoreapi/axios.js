import axios from 'axios'

const productsAxios = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_URL
})

export default productsAxios
