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
    <div class="rounded-2xl overflow-hidden relative w-full max-w-3xl mx-4">
      <div class="bg-brand-white h-[70vh] p-9 overflow-auto">
        <div class="text-2xl font-medium absolute top-3 right-4 cursor-pointer" @click="cartStore.closeCart">×</div>
        <h2 class="text-3xl font-medium pb-14">Cart</h2>
        <div class="flex flex-col gap-8">
          <CartItem v-for="cartItem in cartStore.cart" :key="cartItem.id" :cartItem="cartItem" />
        </div>
        <div v-if="!cartStore.cart.length" class="text-xl text-center p-8">Cart is Empty</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
