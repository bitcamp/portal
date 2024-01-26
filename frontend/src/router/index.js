import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../views/Register.vue';
import RegistrationClosed from '../components/RegistrationClosed.vue'
import RegisterMentor from "../views/RegisterMentors.vue";
import RegisterVolunteer from "../views/volunteerPage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Register',
    // component: RegistrationClosed
    component: Register,
    props: (route) => ({ default_track: route.query.t })  
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
    props: (route) => ({ referralID: route.query.r })  
  },
  {
    path: '/mentors',
    name: 'MentorRegister',
    component: RegisterMentor,
    props: (route) => ({ default_track: route.query.t })
  },
  {
    path: '/:referral',
    component: Register,
  },{
    path: '/volunteers',
    name: 'VolunteerRegistration',
    component: RegisterVolunteer,
    props: (route) => ({ default_track: route.query.t })
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
