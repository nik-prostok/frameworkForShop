import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueCookie from  'vue-cookie';
// Tell Vue to use the plugin
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';

import {loadProgressBar} from "axios-progress-bar";

import { library } from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft, faMinus, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'axios-progress-bar/dist/nprogress.css'
import './fonts/fonts.css';


library.add(faArrowLeft, faTrash, faPlus, faMinus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueCookie);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
