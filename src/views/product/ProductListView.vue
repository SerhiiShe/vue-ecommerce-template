<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import ProductCard from '@/components/product/ProductCard.vue'

defineOptions({
  name: 'ProductListView',
})

const productStore = useProductStore()

onMounted(async () => {
  try {
    await productStore.loadProducts()
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div>
    <div class="container">
      <div class="grid grid-cols-4 gap-x-6 gap-y-16">
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
