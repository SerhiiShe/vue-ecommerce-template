<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import BaseButton from '@/components/ui/BaseButton.vue'
import ProductCounter from './ProductCounter.vue'

interface Props {
  productId: string
}

defineOptions({
  name: 'ProductOrderButtons'
})

const props = defineProps<Props>()

const cartStore = useCartStore()

const quantity = ref<number>(1)

const addProductToCart = async () => {
  await cartStore.addItemToCart({
    productId: props.productId,
    quantity: quantity.value
  })
}

const addOneItem = (): void => {
  quantity.value++
}

const removeOneItem = (): void => {
  if (quantity.value === 1) return
  quantity.value--
}
</script>

<template>
  <div class="flex gap-2">
    <ProductCounter :quantity="quantity" @remove="removeOneItem" @add="addOneItem"
      @update-quantity="value => quantity = value" />
    <div class="grow flex flex-col">
      <BaseButton @action="addProductToCart">Add to Cart</BaseButton>
    </div>
  </div>
</template>

<style scoped>
  
</style>
