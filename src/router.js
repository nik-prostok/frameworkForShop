import Vue from 'vue';
import Router from 'vue-router';

import Store from './views/Shop.vue';
import NotFoundPage from './components/NotFoundPage.vue';
import DashboardProductsView from './views/Dashboard.products.view.vue';
import DashboardCategoriesView from './views/Dashboard.categories.view.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: NotFoundPage,
    },
    {
      path: '/store',
      name: 'store',
      component: Store,
    },
    {
      path: '/dashboard/products',
      name: 'dashboardProducts',
      component: DashboardProductsView,
    },
    {
      path: '/dashboard/categories',
      name: 'dashboardCategories',
      component: DashboardCategoriesView,
    },
  ],
});
