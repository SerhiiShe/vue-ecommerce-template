<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { formatPrice } from '@/utils/formatPrice'
import BaseButton from '@/components/ui/BaseButton.vue'

defineOptions({
  name: 'CartItem'
})

const props = defineProps({
  cartItem: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const total = computed(() => {
  return formatPrice(props.cartItem.product.price * props.cartItem.quantity)
})

const addItem = async () => {
  await cartStore.updateCartItem({
    existingCartItem: props.cartItem,
    quantity: 1
  })
}

const deleteItem = async () => {
  await cartStore.updateCartItem({
    existingCartItem: props.cartItem,
    quantity: -1
  })
}

const removeItemFromCart = async () => {
  await cartStore.deleteCartItem(props.cartItem)
}
</script>

<template>
  <div class="flex sm:flex-row flex-col gap-8 border-b border-brand-blue pb-8">
    <img :src="cartItem.product.image" :alt="cartItem.product.title" class="aspect-square object-contain sm:w-1/3">
    <div class="flex flex-col gap-2 grow">
      <h3 class="text-lg font-medium">
        {{ cartItem.product.title }}
      </h3>
      <div>
        Quantity: {{ cartItem.quantity }}
      </div>
      <div>
        Total: {{ total }}
      </div>
      <div class="flex gap-2 pt-4">
        <BaseButton :disabled="cartItem.quantity === 1" appearance="danger" @action="deleteItem">-</BaseButton>
        <BaseButton appearance="primary" @action="addItem">+</BaseButton>
        <div class="ml-auto">
          <BaseButton @action="removeItemFromCart">🗑</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
