import Vue from 'vue';
import VueRouter from 'vue-router';
import SplashScreen from '../components/SplashScreen.vue'
import Register from '../views/Register.vue';
// import RegisterMentor from "../views/RegisterMentors.vue";
// import RegisterVolunteer from "../views/RegisterVolunteers.vue"
import RegistrationClosed from '../components/RegistrationClosed.vue'
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
    // component: RegistrationClosed,
    component: Register,
    props: (route) => ({ default_track: route.query.t, type: 'hacker' })
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
    props: (route) => ({ referralID: route.query.r })
  },
  {
    path: '/mentor',
    //name: 'MentorRegister',
    component: RegistrationClosed,
    // component: RegisterMentor,
    props: (route) => ({ default_track: route.query.t, type: 'mentor' })
  }, {
    path: '/volunteer',
    name: 'VolunteerRegister',
    component: RegistrationClosed,
    // component: RegisterVolunteer,
    props: (route) => ({ default_track: route.query.t, type: 'volunteer' })
  },
  {
    path: '/:referral',
    // component: Register,
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
