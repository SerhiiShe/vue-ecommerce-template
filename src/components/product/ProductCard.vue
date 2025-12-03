<template>
  <div>ProductCard</div>
</template>

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

<style scoped>

</style>
