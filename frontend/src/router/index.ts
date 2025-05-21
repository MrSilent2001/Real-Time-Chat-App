import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';
import Chat from '@/components/Chat.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login 
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup 
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat 
    },
  ],
})

export default router
