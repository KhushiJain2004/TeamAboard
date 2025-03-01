import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import RecoverAccount from '@/views/RecoverAccount.vue'
import Register from '@/views/Register.vue'

const routes = [
  { name: 'login', path: '/', component: Login },
  { name: 'register', path: '/register', component: Register },
  { name: 'recover', path: '/recover', component: RecoverAccount },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
