import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import Hello from '@/components/Hello'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import ForgotPassword from '@/components/ForgotPassword'
import Admin from '@/components/Admin'
import firebase from 'firebase'

Vue.use(Router)
Vue.use(BootstrapVue);

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/hello'
    },
    {
      path: '/',
      redirect: '/hello'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (currentUser && !currentUser.emailVerified) next('login')
  //else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router
