/* eslint-disable no-param-reassign,no-shadow */
import { products } from '../../api/api';

// initial state
const state = {
  products: [],
  idEditProduct: null,
  currentEditProduct: null,
  showEditProduct: false,
  showAddProduct: false,
  isShowAddButton: false,
};

// getters
const getters = {};

// actions
const actions = {
  async getAllProducts({ commit }) {
    await products.getProducts()
      .then((res) => {
        console.log(res);
        commit('setProducts', res.data.data);
      });
  },
  async getProduct({ state, commit }) {
    if (state.idEditProduct != null) {
      await products.getProduct(state.idEditProduct)
        .then((res) => {
          commit('setEditProduct', res.data.data);
        });
    }
  },
  async saveProduct({ commit }, product) {
    await products.saveProduct(product)
      .then((res) => {
        commit('addProduct', res.data.data);
      });
  },
  async saveEditProduct({ commit }, { editProduct, idProduct }) {
    await products.saveEditProduct(editProduct, idProduct)
      .then((res) => {
        commit('updateProduct', { product: res.data.data, id: idProduct });
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
    state.showAddProduct = false;
    state.showEditProduct = true;
    state.idEditProduct = idProduct;
  },
  setEditProduct: (state) => {
    state.showAddProduct = false;
    state.showEditProduct = true;
    state.products.forEach((product) => {
      // eslint-disable-next-line no-underscore-dangle
      if (product._id === state.idEditProduct) {
        state.currentEditProduct = product;
      }
    });
  },
  setDefaultMode: (state) => {
    state.showEditProduct = false;
    state.showAddProduct = false;
  },
  setAddMode: (state) => {
    state.showEditProduct = false;
    state.showAddProduct = true;
  },
  addProduct: (state, product) => {
    state.products.push(product);
    state.showAddProduct = false;
  },
  updateProduct: (state, { product, id }) => {
    state.products = [
      ...state.products.filter(element => element.id !== id),
      product,
    ];
    state.showEditProduct = false;
  },
  deleteProduct(state, idProduct) {
    state.products.forEach((product, index, arrayProducts) => {
      // eslint-disable-next-line no-underscore-dangle
      if (product._id === idProduct) {
        arrayProducts.splice(index, 1);
      }
    });
  },
  showAddButton: (state) => {
    state.isShowAddButton = true;
  },
  hideAddButton: (state) => {
    state.isShowAddButton = false;
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
