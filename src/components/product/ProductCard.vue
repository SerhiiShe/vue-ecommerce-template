<script setup lang="ts">
import { formatPrice } from '@/utils/formatPrice'
import { useAuthStore } from '@/stores/useAuthStore'
import { Product } from '@/types'
import ProductOrderButtons from './ProductOrderButtons.vue'

interface Props {
  product: Product
}

defineOptions({
  name: 'ProductCard'
})

const props = defineProps<Props>()

const authStore = useAuthStore()
</script>

<template>
  <div class="flex flex-col gap-2">
    <router-link :to="{ name: 'ProductShow', params: { id: product.id } }"
      class="rounded-lg overflow-hidden border border-brand-gray hover:border-brand-blue duration-300 transition-all ease-in-out flex flex-col items-stretch grow">
      <img class="px-6 py-6 bg-brand-light-gray h-60 w-full object-contain" :src="product.image" :alt="product.title">
      <div class="p-4 flex flex-col gap-2 grow">
        <h2 class="pb-2 border-b border-brand-gray font-medium">{{ product.title }}</h2>
        <div class="text-sm flex flex-col gap-1">
          <p>
            Price: <span class="font-medium">{{ formatPrice(product.price) }}</span>
          </p>
          <p>
            Rating: <span class="font-medium">{{ product.rating.rate }} ☆</span>
          </p>
        </div>
      </div>
    </router-link>
    <ProductOrderButtons v-if="authStore.isAuth" :product-id="product.id" />
  </div>
</template>

<style scoped>

</style>
