<script setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import { useLoginForm } from '@/use/auth-form'

defineOptions({
  name: 'LoginView'
})

const {
  submitForm,
  email,
  emailBlur,
  emailError,
  password,
  passwordBlur,
  passwordError
} = useLoginForm()
</script>

<template>
  <form class="" @submit.prevent="submitForm">
    <h1>Login</h1>
    <div class="">
      <label class="" for="email">Email</label>
      <input class="" name="email" type="email" id="email" v-model="email" @blur="emailBlur">
      <small v-if="emailError">{{ emailError }}</small>
    </div>
    <div class="">
      <label class="" for="password">Password</label>
      <input class="" name="password" type="password" id="password" v-model="password" @blur="passwordBlur">
      <small v-if="passwordError">{{ passwordError }}</small>
    </div>
    <BaseButton type="submit">Login</BaseButton>
    <!-- <p>Don't have an account? <router-link :to="{ name: 'Signup' }">Sign up</router-link></p> -->
  </form>
</template>

<style scoped>

</style>
