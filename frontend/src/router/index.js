import AppLayout from '@/components/AppLayout.vue'
import ChatView from '@/views/ChatView.vue'
import EditProfile from '@/views/EditProfile.vue'
import Feed from '@/views/Feed.vue'
import FriendsAndMentors from '@/views/FriendsAndMentors.vue'
import Home from '@/views/Home.vue'
import Landing from '@/views/Landing.vue'
import Login from '@/views/Login.vue'
import RecoverAccount from '@/views/RecoverAccount.vue'
import Register from '@/views/Register.vue'
import VisitorProfile from '@/views/VisitorProfile.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      // Landing page (no sidebar)
      {
        path: '',
        name: 'landing',
        component: Landing,
        meta: { hideSidebar: true, fullPage: true },
      },

      // Auth pages (no sidebar)
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: { hideSidebar: true },
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: { hideSidebar: true },
      },
      {
        path: 'recover',
        name: 'recover',
        component: RecoverAccount,
        meta: { hideSidebar: true },
      },

      // App pages (with sidebar)
      {
        path: 'home',
        name: 'home',
        component: Home,
      },
      {
        path: 'feed',
        name: 'feed',
        component: Feed,
      },
      {
        path: 'chat',
        redirect: '/chat/1',
      },
      {
        path: 'chat/:id',
        name: 'chat',
        component: ChatView,
      },
      {
        path: 'edit-profile',
        name: 'edit-profile',
        component: EditProfile,
      },
      {
        path: 'friends-and-mentors',
        name: 'friends-and-mentors',
        component: FriendsAndMentors,
      },
      {
        path: 'visitor',
        name: 'visitor-profile',
        component: VisitorProfile,
      },
      {
        path: '/profile/:username',
        name: 'UserProfile',
        component: VisitorProfile,
      },
    ],
  },
  // Catch-all route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 } // Always scroll to top on route change
  },
})

export default router
