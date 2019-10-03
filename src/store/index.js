import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import categories from './modules/categories';
import auth from './modules/auth';
import cart from './modules/cart';

import createLogger from '../plugins/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    products,
    categories,
    auth,
    cart
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
