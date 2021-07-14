import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/feed',
    name: 'Home',
    meta: {requiresAuth: true},
    component: Home
  },
  {
    path: '/register',
    name: 'Registration',
    component: () => import('../views/Authentication/Registration.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Authentication/Login.vue'),
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    meta: {requiresAuth: true},
    component: () => import('../views/Profile/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next({name: "Home"})
  } else if (to.meta.requiresAuth && !store.getters["authModule/isAuthenticated"]) {
    next({name: "Login"})
  } else {
    next();
  }
})

export default router
