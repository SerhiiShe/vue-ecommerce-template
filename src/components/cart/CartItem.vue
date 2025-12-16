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
  <div class="flex gap-8">
    <img :src="cartItem.product.image" :alt="cartItem.product.title" class="aspect-square object-contain w-1/3">
    <div class="">
      <h3 class="">
        {{ cartItem.product.title }}
      </h3>
      <div class="">
        Quantity: {{ cartItem.quantity }}
      </div>
      <div class="">
        Total: {{ total }}
      </div>
      <div class="">
        <BaseButton :disabled="cartItem.quantity === 1" appearance="danger" @action="deleteItem">-</BaseButton>
        <BaseButton appearance="primary" @action="addItem">+</BaseButton>
        <div class="">
          <BaseButton @action="removeItemFromCart">🗑</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
