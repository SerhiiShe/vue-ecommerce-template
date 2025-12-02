import axios from 'axios'

const productsAxios = axios.create({
  baseURL: process.env.VITE_PRODUCTS_URL
})

export default productsAxios
