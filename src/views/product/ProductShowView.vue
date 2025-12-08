<script setup>
defineOptions({
  name: 'ProductShowView'
})


</script>

<template>
  <div>
    <div class="container">
      <div v-if="product" class="">
        <div class="">
          <img class="" :src="poduct.image" :alt="product.name" />
        </div>
        <div class="">
          <h1 class="">{{ product.name }}</h1>
          <p class="">{{ product.description }}</p>
          <p>
            Price: <span class="">{{ price }}</span>
          </p>
          <p>
            Rating: <span class="">{{ product.rating?.rate }} ☆</span>
          </p>
          <app-button v-if="isAuth" @action="addProductToCart">Add to Cart</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
