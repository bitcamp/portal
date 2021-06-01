import Vue from 'vue';
import {
  ButtonPlugin,
  CardPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormPlugin,
  FormSelectPlugin,
  LayoutPlugin,
  NavbarPlugin,
  NavPlugin,
  InputGroupPlugin,
} from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import VueGtag from "vue-gtag";

import './app.scss';
import './assets/global.css' //import global css file

Vue.config.productionTip = false;

[ ButtonPlugin,
  CardPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormPlugin,
  FormSelectPlugin,
  LayoutPlugin,
  NavbarPlugin,
  NavPlugin,
  InputGroupPlugin,
].forEach(comp => { Vue.use(comp); });

Vue.use(VueGtag, {
  config: { id: "G-04DTKN4MJH" }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
