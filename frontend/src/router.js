import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Artists from '@/components/Artists'
import Records from '@/components/Records'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/artists',
      name: 'Artists',
      component: Artists,
      meta: { requiresAuth: true }
    },
    {
      path: '/records',
      name: 'Records',
      component: Records,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const currentUser = await firebase.auth().currentUser
  const requiresAuth = await to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/')
  } else if (!requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router