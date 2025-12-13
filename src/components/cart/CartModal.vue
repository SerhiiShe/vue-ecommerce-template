<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import CartItem from '@/components/cart/CartItem.vue'

defineOptions({
  name: 'CartModal'
})

const cartStore = useCartStore()

onMounted(async () => {
  try {
    if (!cartStore.isLoaded) {
      await cartStore.loadUserCart()
    }
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div v-if="isOpen" class="">
    <div class="">
      <div class="" @click="cartStore.closeCart">×</div>
      <h2>Cart</h2>
      <div class="">
        <CartItem v-for="cartItem in cart" :key="cartItem.id" :cartItem="cartItem" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
