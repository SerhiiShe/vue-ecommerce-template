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
  <div v-if="cartStore.isOpen" @click.self="cartStore.closeCart" class="fixed inset-0 bg-[#000000b3] z-5001 flex justify-center items-center">
    <div class="rounded-2xl overflow-hidden relative">
      <div class="bg-brand-white max-w-3xl h-[70vh] p-9 overflow-auto">
        <div class="text-2xl font-medium absolute top-3 right-6 cursor-pointer" @click="cartStore.closeCart">×</div>
        <h2 class="text-2xl font-medium pb-6">Cart</h2>
        <div class="flex flex-col gap-6">
          <CartItem v-for="cartItem in cartStore.cart" :key="cartItem.id" :cartItem="cartItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
