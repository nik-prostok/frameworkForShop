import Vue from 'vue';
import Router from 'vue-router';

import AddCategory from "./components/Categories/AddCategory";

import Store from './views/Shop.vue';
import NotFoundPage from './components/NotFoundPage.vue';
import DashboardProductsView from './views/Dashboard.products.vue';
import DashboardCategoriesView from './views/Dashboard.categories.vue';
import DashboardDeliveryView from './views/Dashboard.delivery';
import DashboardCityView from './views/Dashboard.city';
import Auth from './views/Auth.vue';
import Payment from './views/TestPaymentConfirmation';

import store from './store/index';

Vue.use(Router);

const AccessRoute = (role, redirectTo) => async (to, from, next) => {
  try {
    const userRole = await store.dispatch('auth/permission');
    if (role.includes(userRole)) {
      next();
    } else throw new Error('permission');
  } catch (e) {
    next({
      name: redirectTo,
      query: { redirectFrom: to.fullPath },
    });
  }
};

const roleAdmin = AccessRoute(['admin'], 'Auth');
const roleModerator = AccessRoute(['admin', 'moderator'], 'Auth');

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
    {
      path: '/dashboard/categories/add',
      name: 'dashboardCategoriesAdd',
      component: AddCategory,
    },
    {
      path: '/dashboard/delivery',
      name: 'dashboardDelivery',
      component: DashboardDeliveryView,
    },
    {
      path: '/dashboard/city',
      name: 'dashboardCity',
      component: DashboardCityView,
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth,
    },
    {
      path: '/AccessOnlyAdmin',
      name: 'AccessOnlyAdmin',
      component: Auth,
      beforeEnter: roleAdmin,
    },
    {
      path: '/TestPaymentConfirmation',
      name: 'TestPaymentConfirmation',
      component: Payment,
    },
  ],
});
