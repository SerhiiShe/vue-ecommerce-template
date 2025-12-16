import { useForm, useField } from 'vee-validate'
import { useAuthStore } from '@/stores/useAuthStore'
import * as yup from 'yup'

const PASSWORD_MIN_LENGTH = 6

export function useSignupForm () {
  const authStore = useAuthStore()
  const { handleSubmit } = useForm()

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur
  } = useField('email', yup
    .string()
    .trim()
    .email('Enter email')
    .required('Please enter a valid email address')
  )

  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
  } = useField('password', yup
    .string()
    .required('Enter password')
    .min(PASSWORD_MIN_LENGTH, 'Password must be at least 6 characters')
  )

  const submitForm = handleSubmit(async values => {
    try {
      await authStore.signUp(values)      
    } catch (e) {
      console.error(e)
    }
  })

  return {
    submitForm,
    email,
    emailBlur,
    emailError,
    password,
    passwordBlur,
    passwordError
  }
}

export function useLoginForm () {
  const authStore = useAuthStore()
  const { handleSubmit } = useForm()

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur
  } = useField('email', yup
    .string()
    .trim()
    .email('Enter email')
    .required('Please enter a valid email address')
  )

  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
  } = useField('password', yup
    .string()
    .required('Enter password')
    .min(PASSWORD_MIN_LENGTH, 'Password must be at least 6 characters')
  )

  const submitForm = handleSubmit(async values => {
    try {
      console.log(values)
      await authStore.login(values.email, values.password)
    } catch (e) {
      console.error(e)
    }
  })

  return {
    submitForm,
    email,
    emailBlur,
    emailError,
    password,
    passwordBlur,
    passwordError
  }
}
