<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useCartStore } from '@/stores/useCartStore'
import { useProductStore } from '@/stores/useProductStore'
import { useRoute } from 'vue-router'
import { formatPrice } from '@/utils/formatPrice'
import BaseButton from '@/components/ui/BaseButton.vue'

defineOptions({
  name: 'ProductShowView'
})

const authStore = useAuthStore()
const cartStore = useCartStore()
const productStore = useProductStore()
const route = useRoute()
const product = ref(null)
const price = ref(null)

onMounted(async () => {
  try {
    const id = route.params.id
    product.value = await productStore.loadProductById(id)
    price.value = formatPrice(product.value.price)
  } catch (e) {
    console.error(e)
  }
})

const addProductToCart = async () => {
  await cartStore.addItemToCart({
    productId: product.value.id
  })
}
</script>

<template>
  <div>
    <div class="container">
      <div v-if="product" class="flex">
        <div class="w-1/3 p-8 pr-16 border-r border-brand-blue">
          <img class="" :src="product.image" :alt="product.name" />
        </div>
        <div class="w-2/3 p-8 pl-12">
          <h1 class="text-xl font-medium pb-4">{{ product.title }}</h1>
          <p class="pb-6">{{ product.description }}</p>
          <p class="pb-1">
            Price: <span class="font-medium">{{ price }}</span>
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
