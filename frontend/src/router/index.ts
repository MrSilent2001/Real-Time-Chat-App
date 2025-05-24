import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';
import ChatView from '@/views/ChatView.vue';

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
      component: ChatView 
    },
  ],
})

export default router
