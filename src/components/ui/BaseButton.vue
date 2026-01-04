<script setup lang="ts">
type ButtonType = 'button' | 'submit'

interface Props {
  type?: ButtonType
  disabled?: boolean
}

defineOptions({
  name: 'BaseButton'
})

const props = withDefaults(
  defineProps<Props>(),
  {
    type: 'button',
    disabled: false
  })

const emit = defineEmits<{
  (e: 'action'): void
}>()
</script>

<template>
  <button
    class="px-2 py-1 border border-brand-blue rounded-lg hover:bg-brand-light-blue transition-all duration-300 ease-in-out cursor-pointer disabled:pointer-events-none disabled:grayscale-100 disabled:opacity-50"
    :type="type"
    :disabled="disabled"
    @click="emit('action')"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
