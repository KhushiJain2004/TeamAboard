import { createRouter, createWebHistory } from 'vue-router';

import AppLayout from '@/components/AppLayout.vue';
import ChatView from '@/views/ChatView.vue';
import EditProfile from '@/views/EditProfile.vue';
import Login from '@/views/Login.vue';
import RecoverAccount from '@/views/RecoverAccount.vue';
import Register from '@/views/Register.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', redirect: '/chat/1' },
      { path: 'chat', redirect: '/chat/1' },
      { name: 'chat', path: 'chat/:id', component: ChatView },
      { name: 'edit-profile', path: 'edit-profile', component: EditProfile },
      { name: 'login', path: '/login', component: Login },
      { name: 'register', path: '/register', component: Register },
      { name: 'recover', path: '/recover', component: RecoverAccount },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
