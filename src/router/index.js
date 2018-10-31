import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import Hello from '@/components/Hello'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import ForgotPassword from '@/components/ForgotPassword'
import Admin from '@/components/Admin'
import ProductView from '@/components/ProductView'
import RewardView from '@/components/RewardView'
import RequestView from '@/components/RequestView'
import Rewards from '@/components/Rewards'
import UserView from '@/components/UserView'
import Header from '@/components/Header'
import ReviewPage from '@/components/ReviewPage'

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
      path: '/review/:id',
      name: 'ReviewPage',
      component: ReviewPage,
      meta: {
        requiresAuth: true
      }
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
      path: '/rewards',
      name: 'Rewards',
      component: Rewards,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'products',
          component: ProductView
        },
        {
          path: 'rewards',
          component: RewardView
        },
        {
          path: 'requests',
          component: RequestView
        },
        {
          path: 'users',
          component: UserView
        }
      ]
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
