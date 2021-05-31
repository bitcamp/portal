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
  ToastPlugin,
} from 'bootstrap-vue';
import App from './App.vue';
import router from './router';

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
  ToastPlugin,
].forEach(comp => { Vue.use(comp); });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
