import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import './firebaseInit'
import { securedAxiosInstance, plainAxiosInstance } from './modules/axios'
import './assets/stylesheet/main.css'

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

new Vue({
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
})
