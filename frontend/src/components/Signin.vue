<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-grey-darkset">Sign In</h3>
      <form @submit.prevent="signin">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="label">E-mail Address </label>
          <input type="email" v-model="email" class="input" id="email" placeholder="example@email.com">
        </div>
        <div class="mb-6">
          <label for="password" class="label">Password </label>
          <input type="password" v-model="password" class="input" id="password" placeholder="Password">
        </div>

        <button type="submit" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 items-center justify-center">Sign In</button>

        <div class="my-4"><router-link to="/signup" class="link-grey">Sign up</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signin() {
      try {
        const res = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        const idToken = await res.user.getIdToken()
        localStorage.setItem("jwt", idToken.toString());
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>