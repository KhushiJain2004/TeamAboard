import { createRouter, createWebHistory } from 'vue-router';

import ChatView from '@/views/ChatView.vue';
import Login from '@/views/Login.vue';
import RecoverAccount from '@/views/RecoverAccount.vue';
import Register from '@/views/Register.vue';

const routes = [
  { name: 'login', path: '/', component: Login },
  { name: 'register', path: '/register', component: Register },
  { name: 'recover', path: '/recover', component: RecoverAccount },
  { path: '/chat', redirect: '/chat/1' },
  { name: 'chat', path: '/chat/:id', component: ChatView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
