import Vue from 'vue';
import Router from 'vue-router';

import Store from './views/Store.vue';
import DashboardView from './views/Dashboard.view.vue';
import DashboardCategoriesView from './views/Dashboard.categories.view.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/store',
      name: 'store',
      component: Store,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/dashboard/categories',
      name: 'dashboardCategories',
      component: DashboardCategoriesView,
    },
  ],
});
