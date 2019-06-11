import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './firebaseInit'
import firebase from 'firebase'
import './assets/stylesheet/main.css'

Vue.config.productionTip = false



firebase.auth().onAuthStateChanged(() => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
})