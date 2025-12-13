<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import { useSignupForm } from '@/use/auth-form'

defineOptions({
  name: 'RegisterView'
})

const {
  submitForm,
  email,
  emailBlur,
  emailError,
  password,
  passwordBlur,
  passwordError
} = useSignupForm()
</script>

<template>
  <form class="form" @submit.prevent="submitForm">
    <h1 class="text-2xl font-medium pb-6">Sign up</h1>
    <div class="form-field-wrap">
      <label class="form-label" for="email">Email</label>
      <input class="form-input" name="email" type="email" id="email" v-model="email" @blur="emailBlur">
      <small v-if="emailError" class="text-red-400 pt-1">{{ emailError }}</small>
    </div>
    <div class="form-field-wrap">
      <label class="form-label" for="password">Password</label>
      <input class="form-input" name="password" type="password" id="password" v-model="password" @blur="passwordBlur">
      <small v-if="passwordError" class="text-red-400 pt-1">{{ passwordError }}</small>
    </div>
    <BaseButton type="submit">Sign up</BaseButton>
    <p class="pt-4">Already have an account? <router-link :to="{ name: 'Login' }" class="text-brand-blue underline">Login</router-link></p>
  </form>
</template>

<style scoped>

</style>
