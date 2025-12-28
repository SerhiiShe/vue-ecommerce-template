<script setup lang="ts">
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
} as const

type LayoutKey = keyof typeof layoutMap

const viewLayout = computed(() => {
  const layout = route.meta.layout

  if (typeof layout === 'string' && layout in layoutMap) {
    return layoutMap[layout as LayoutKey]
  }

  return MainLayout
})
</script>

<template>
  <component :is="viewLayout" />
</template>

<style scoped>

</style>
