<script setup>
defineOptions({
  name: 'BaseButton'
})
 
defineProps({
  type: {
    type: String,
    required: false,
    default: 'button',
    validator: (value) => ['submit', 'button'].includes(value)
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['action'])
</script>

<template>
  <button
    class="px-2 py-1 border border-brand-blue rounded-lg hover:bg-brand-light-blue transition-all duration-300 ease-in-out cursor-pointer"
    :type="type"
    :disabled="disabled"
    @click="emit('action')"
  >
    <slot />
  </button>
</template>

<style scoped>

</style>
