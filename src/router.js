import Vue from 'vue';
import Router from 'vue-router';

import Store from './views/Shop.vue';
import NotFoundPage from './components/NotFoundPage.vue';
import DashboardProductsView from './views/Dashboard.products.view.vue';
import DashboardCategoriesView from './views/Dashboard.categories.view.vue';
import Auth from './views/Auth.vue';
import Payment from './views/TestPaymentConfirmation';

import store from './store/index'

Vue.use(Router);

const AccessRoute = (role, redirectTo) => {
  return async (to, from, next) => {
    try {
      const userRole = await store.dispatch('auth/permission')
      if (role.includes(userRole)) {
        next()
      } else throw new Error('permission')
    } catch (e) {
      next({
        name: redirectTo,
        query: { redirectFrom: to.fullPath }
      })
    }
  }
}

const roleAdmin = AccessRoute(['admin'], 'Auth')
const roleModerator = AccessRoute(['admin', 'moderator'], 'Auth')

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
      path: '/Auth',
      name: 'Auth',
      component: Auth,
    },
    {
      path: '/AccessOnlyAdmin',
      name: 'AccessOnlyAdmin',
      component: Auth,
      beforeEnter: roleAdmin
    },
    {
      path: '/TestPaymentConfirmation',
      name: 'TestPaymentConfirmation',
      component: Payment
    },
  ],
});
