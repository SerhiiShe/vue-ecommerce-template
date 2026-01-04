<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import BaseFooter from '@/components/footer/BaseFooter.vue'
import BaseHeader from '@/components/header/BaseHeader.vue'
import CartModal from '@/components/cart/CartModal.vue'

defineOptions({
  name: 'MainLayout'
})

const authStore = useAuthStore()
</script>

<template>
  <div class="h-screen flex flex-col">
    <BaseHeader />
    <CartModal v-if="authStore.isAuth" />
    <main class="py-40">
      <router-view />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped>

</style>