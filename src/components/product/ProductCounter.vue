<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  quantity: number
}

defineOptions({
  name: 'ProductCounter'
})

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'add'): void
  (e: 'update-quantity', value: number): void
}>()

const normalizeQuantity = (value: unknown): number => {
  const num = Number(value)

  if (!Number.isInteger(num) || num < 1) return 1
  return num
}

const validateValue = (e: Event): void => {
  const input = e.target as HTMLInputElement
  input.value = String(normalizeQuantity(input.value))
  emit('update-quantity', Number(input.value)) 
}
</script>

<template>
  <div class="flex gap-1">
    <BaseButton @action="$emit('remove')" :disabled="quantity === 1">-</BaseButton>
    <input type="number" min="1" step="1" inputmode="numeric" :value="quantity" @input="validateValue"
      class="w-8 p-1 text-center border border-brand-blue outline-0 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0">
    <BaseButton @action="$emit('add')">+</BaseButton>
  </div>
</template>

<style scoped>

</style>
