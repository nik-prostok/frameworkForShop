import product from '../../api/products.api';

// initial state
const state = {
  products: [],
};

// getters
const getters = {
  products: state => state.products,
};

// actions
const actions = {
  async getAllProducts({ commit }) {
    await product.getProducts()
      .then((res) => {
        commit('setProducts', res.data);
      });
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
