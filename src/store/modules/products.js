/* eslint-disable no-param-reassign,no-shadow */
import { products } from '../../api/api';

// initial state
const state = {
  products: [],
  idEditProduct: null,
  currentEditProduct: null,
};

// getters
const getters = {};

// actions
const actions = {
  async getAllProducts({ commit }) {
    await products.getProducts()
      .then((res) => {
        commit('setProducts', res.data);
      });
  },
  async getProduct({ state, commit }) {
    if (state.idEditProduct != null) {
      await products.getProduct(state.idEditProduct)
        .then((res) => {
          commit('setEditProduct', res.data);
        });
    }
  },
  async saveProduct({ commit }, product) {
    await products.saveProduct(product)
      .then((res) => {
        commit('addProduct', res.data);
      });
  },
  async saveEditProduct({ commit }, { editProduct, idProduct }) {
    await products.saveEditProduct(editProduct, idProduct)
      .then((res) => {
        commit('updateProduct', { product: res.data, id: idProduct });
      });
  },
  async deleteProduct({ commit }, idProduct) {
    await products.deleteProduct(idProduct)
      .then(() => {
        commit('deleteProduct', idProduct);
      });
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
  setEditProduct: (state) => {
    state.products.forEach((product) => {
      // eslint-disable-next-line no-underscore-dangle
      if (product._id === state.idEditProduct) {
        state.currentEditProduct = product;
      }
    });
  },
  addProduct: (state, product) => {
    state.products.push(product);
  },
  updateProduct: (state, { product, id }) => {
    state.products = [
      ...state.products.filter(element => element.id !== id),
      product,
    ];
  },
  deleteProduct(state, idProduct) {
    state.products.forEach((product, index, arrayProducts) => {
      // eslint-disable-next-line no-underscore-dangle
      if (product._id === idProduct) {
        arrayProducts.splice(index, 1);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
