import firebase from 'firebase'
import http from './http'

export default {
  async signUp(email, password) {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const idToken = await res.user.getIdToken(true)
      const result = await http.tokenHttp(idToken).post('/signup')
      console.log('Create account: ', result)
    } catch (e) {
      console.log(e.message)
    }
  },

  async signIn(email, password) {
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(email, password)
      const idToken = await res.user.getIdToken(true)
      localStorage.setItem('token', idToken.toString())
      console.log('Login Success')
    } catch (e) {
      console.error(e)
    }
  },

  async signOut() {
    await firebase.auth().signOut()
    localStorage.removeItem('token')
  }
}