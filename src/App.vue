<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

defineOptions({
  name: 'App'
})

const route = useRoute()
const layoutMap = {
  main: MainLayout,
  auth: AuthLayout
}
const viewLayout = computed(() => layoutMap[route.meta.layout] || MainLayout)
</script>

<template>
  <component :is="viewLayout" />
</template>

<style scoped>

</style>
