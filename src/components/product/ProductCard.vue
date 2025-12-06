<script setup>
defineOptions({
  name: 'ProductCard'
})

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <router-link to="{}" class="rounded-3xl overflow-hidden border border-brand-gray hover:border-brand-blue hover:shadow-lg duration-300 transition-all ease-in-out">
    <img class="px-15 py-7 bg-brand-light-gray h-60 w-full object-contain" :src="product.image" :alt="product.title">
    <div class="p-4 flex flex-col gap-2">
      <h2 class="pb-2 border-b border-brand-gray font-medium">{{ product.title }}</h2>
      <div class="text-sm flex flex-col gap-1">
        <p>
          Price: <span class="font-medium">{{ price }}</span>
        </p>  
        <p>
          Rating: <span class="font-medium">{{ product.rating.rate }} ☆</span>
        </p>  
      </div>  
      <!-- <div class="">
        <router-link
          v-slot="{ navigate }"
          custom
          :to="{
            name: 'Product',
            params: { id: product.id }
          }"  
        >  
          <app-button @action="navigate">Learn more</app-button>
        </router-link>  
        <app-button v-if="isAuth" @action="addProductToCart">Add to Cart</app-button>
      </div> -->  
    </div>  
  </router-link>    
</template>

<style scoped>

</style>
