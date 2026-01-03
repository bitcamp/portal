import Vue from 'vue';
import VueRouter from 'vue-router';

import SplashScreen from '../components/SplashScreen.vue';
import RegistrationFormParent from '../components/RegistrationFormParent.vue';
import RegistrationClosed from '../components/RegistrationClosed.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Splash Screen',
    component: SplashScreen,
  },
  {
    path: '/hacker',
    name: 'Register',
    component: RegistrationFormParent,
    props: (route) => ({
      default_track: route.query.t,
      type: 'hacker'
    })
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
    props: (route) => ({
      referralID: route.query.r
    })
  },
  {
    path: '/mentor',
    name: 'MentorRegister',
    component: RegistrationClosed,
    // component: RegisterMentor,
    props: (route) => ({
      default_track: route.query.t,
      type: 'mentor'
    })
  },
  {
    path: '/volunteer',
    name: 'VolunteerRegister',
    component: RegistrationClosed,
    // component: RegisterVolunteer,
    props: (route) => ({
      default_track: route.query.t,
      type: 'volunteer'
    })
  },
  {
    path: '/:referral',
    // intentionally left empty
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
