import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Main from '../views/Main.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/users/self',
    name: 'userSelf',
    component: () => import('../views/UserSelf.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: NotFound
  },
  {
    path: '/users/:id/followers',
    name: 'users-follower',
    component: () => import('../views/UserFollowers')
  },
  {
    path: '/users/:id/followings',
    name: 'users-following',
    component: () => import('../views/UserFollowings')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
