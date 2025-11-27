import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'public.home.index'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
