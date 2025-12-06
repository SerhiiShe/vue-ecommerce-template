<script setup>
import BaseHeader from '@/components/header/BaseHeader.vue'

defineOptions({
  name: 'MainLayout'
})
</script>

<template>
  <div>
    <BaseHeader />
    <main class="pt-40">
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>