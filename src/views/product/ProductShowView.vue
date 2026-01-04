<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCartStore } from '@/stores/useCartStore'
import { useProductStore } from '@/stores/useProductStore'
import { useRoute } from 'vue-router'
import { formatPrice } from '@/utils/formatPrice'
import BaseButton from '@/components/ui/BaseButton.vue'
import { Product } from '@/types'

defineOptions({
  name: 'ProductShowView'
})

const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()
const route = useRoute()
const product = ref<Product | null>(null)
const formattedPrice = ref<string | null>(null)

onMounted(async () => {
  try {
    const idParam = route.params['id']

    if (typeof idParam !== 'string') {
      throw new Error('Invalid route param id')
    }

    const id = idParam
    product.value = await productStore.loadProductById(id)
    formattedPrice.value = formatPrice(product.value.price)
  } catch (e: unknown) {
    console.error(e)
  }
})

const addProductToCart = async () => {
  if (!product.value) {
    throw new Error('Product is not loaded yet')
  }

  await cartStore.addItemToCart({
    productId: product.value.id
  })
}
</script>

<template>
  <div>
    <div class="container">
      <div v-if="product" class="flex md:flex-row md:gap-0 flex-col gap-8">
        <div class="flex justify-center items-center md:w-1/3 p-8 border-b md:pr-16 md:border-r md:border-b-0 border-brand-blue">
          <img class="" :src="product.image" :alt="product.title" />
        </div>
        <div class="md:w-2/3 md:p-8 md:pl-12">
          <h1 class="text-xl font-medium pb-4">{{ product.title }}</h1>
          <p class="pb-6">{{ product.description }}</p>
          <p class="pb-1">
            Price: <span class="font-medium">{{ formattedPrice }}</span>
          </p>
          <p class="pb-10">
            Rating: <span class="font-medium">{{ product.rating?.rate }} ☆</span>
          </p>
          <BaseButton v-if="authStore.isAuth" @action="addProductToCart">Add to Cart</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
