<script setup lang="ts">
import BaseFooter from '@/components/footer/BaseFooter.vue'
import BaseHeader from '@/components/header/BaseHeader.vue'

defineOptions({
  name: 'AuthLayout'
})
</script>

<template>
  <div class="h-screen flex flex-col">
    <BaseHeader />
    <main class="py-40">
      <router-view />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped>

</style>