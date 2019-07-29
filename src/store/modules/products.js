/* eslint-disable no-param-reassign,no-shadow */
import product from '../../api/products.api';

// initial state
const state = {
  products: [],
  idEditProduct: null,
  currentEditProduct: null,
};

// getters
const getters = {
  /* products: state => state.products,
  currentEditProduct: state => state.currentEditProduct,
  idEditProduct: state => state.idEditProduct, */
};

// actions
const actions = {
  async getAllProducts({ commit }) {
    await product.getProducts()
      .then((res) => {
        commit('setProducts', res.data);
      });
  },
  async getProduct({ state, commit }) {
    if (state.idEditProduct != null) {
      await product.getProduct(state.idEditProduct)
        .then((res) => {
          commit('setEditProduct', res.data);
        });
    }
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setIdEditProduct(state, idProduct) {
    state.idEditProduct = idProduct;
  },
  setEditProduct: (state, productEdit) => {
    state.currentEditProduct = productEdit;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
