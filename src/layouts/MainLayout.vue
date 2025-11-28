<script setup>
import BaseHeader from '@/components/header/BaseHeader.vue'

defineOptions({
  name: 'MainLayout'
})
</script>

<template>
  <div class="">
    <BaseHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>

</style>