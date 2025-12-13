<script setup>
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

const total = computed(() => {
  return formatPrice(props.cartItem.product.price * props.cartItem.quantity)
})

const addItem = async () => {
  await useCartStore.updateCartItem({
    existingCartItem: props.cartItem,
    quantity: 1
  })
}

const deleteItem = async () => {
  await useCartStore.updateCartItem({
    existingCartItem: props.cartItem,
    quantity: -1
  })
}

const removeItemFromCart = async () => {
  await useCartStore.deleteCartItem(props.cartItem)
}
</script>

<template>
  <div class="">
    <div class="">
      <div class="">
        <img :src="cartItem.product.image" :alt="cartItem.product.title" class="">
      </div>
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
  </div>
</template>

<style scoped>

</style>
