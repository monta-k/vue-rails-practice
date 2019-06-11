<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-darkest">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Address </label>
          <input type="email" v-model="email" class="input" id="email" placeholder="example@email.com">
        </div>

        <div class="mb-6">
          <label for="password" class="label">Password </label>
          <input type="password" v-model="password" class="input" id="password" placeholder="Password">
        </div>

        <button type="submit" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 items-center justify-center">Sign Up</button>

        <div class="my-4"><router-link to="/" class="link-grey">Sign In</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signup() {
      try {
        const res = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        const idToken = await res.user.getIdToken(true)
        const postAxios = await axios.create({ headers: { Authorization: idToken } })
        const result = await postAxios.post('http://localhost:3000/signup')
        console.log('Create account: ', result)
      } catch (e) {
        console.log(e.message)
      }
    },
  }
}
</script>
