import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  
  {
    path : '/homePage',
    name : 'homePage',
    component : () => import('../views/HomePage.vue')
  },

  {
    path : '/login',
    name : 'loginPage',
    component : () => import('../views/LoginPage.vue')
  },
  {
    path : '/register',
    name : 'registerPage',
    component : () => import('../views/RegisterPage.vue')
  },

  {
    path : '/postDetail:newsId',
    name : 'postDetail',
    component : () => import('../views/NewsDetail.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
