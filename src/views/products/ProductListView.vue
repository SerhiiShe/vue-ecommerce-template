<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/useProductsStore'
import ProductCard from '@/components/product/ProductCard.vue'

defineOptions({
  name: 'ProductListView'
})

const productsStore = useProductsStore()

onMounted(async () => {
  try {
    await productsStore.loadProducts()
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="">
    <div class="">
      <div class="">
        <product-card v-for="product in productsStore.products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
