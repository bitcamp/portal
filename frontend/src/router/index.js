import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../views/Register.vue';
import RegisterGoogle from '../views/RegisterGoogle.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Register',
    component: RegisterGoogle,
  },
  {
    path: '/manual',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
  },
  {
    path: '/:referral',
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
