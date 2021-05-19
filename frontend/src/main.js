import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';
import router from './router';

import './app.scss';
import './assets/global.css' //import global css file

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
