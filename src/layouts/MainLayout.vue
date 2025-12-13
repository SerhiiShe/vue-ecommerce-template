<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import BaseHeader from '@/components/header/BaseHeader.vue'
import CartModal from '@/components/cart/CartModal.vue'

defineOptions({
  name: 'MainLayout'
})

const authStore = useAuthStore()
</script>

<template>
  <div>
    <BaseHeader />
    <CartModal v-if="authStore.isAuth" />
    <main class="pt-40">
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>