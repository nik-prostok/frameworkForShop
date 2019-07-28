import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/store',
      name: 'store',
      component: () => import('./views/Store.vue'),
    },
	   {
	  	  path: '/dashboard',
		    name: 'dashboard',
		    component: () => import('./views/Dashboard.view.vue'),
	   },
  ],
});
