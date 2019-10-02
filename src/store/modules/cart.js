/* eslint-disable no-param-reassign,no-shadow */
import { cart } from '../../api/api';

// initial state
const state = {
  cart: {},
  checkoutStatus: null,
};

// getters
const getters = {
  cartProducts: () => state.cart.products,
  // eslint-disable-next-line max-len
};

// actions
const actions = {
  async getCart({ commit }, customer) {
    await cart.getCart(customer)
      .then((res) => {
        commit('setCartForCustomer', res.data);
      });
  },
};

// mutations
const mutations = {
  setCartForCustomer(state, cartCustomer) {
    state.cart = cartCustomer;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
