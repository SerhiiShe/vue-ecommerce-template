import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: () => import('@/views/product/ProductListView.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/products/:id',
    name: 'ProductShow',
    component: () => import('@/views/product/ProductShowView.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
