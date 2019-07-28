/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

import config from '../config.json';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    categories: [],
    orders: [],
    product: {},
  },
  mutations: {
    // Products
    setProducts: (state, payload) => {
      state.products = payload;
    },
    setEditProduct: (state, payload) => {
      state.product = payload;
    },
    addProduct: (state, payload) => {
      state.products.push(payload);
    },
    updateProduct: (state, product, id) => {
      state.products = [
        ...state.products.filter(element => element.id !== id),
        product,
      ];
    },
    // Categories
    setCategories: (state, payload) => {
      state.categories = payload;
    },
    addCategory: (state, payload) => {
      state.categories.push(payload);
    },
    // Customer
    initCustomerOrder: (state, idCustomer) => {
      state.orders.push({
        productsId: [],
        customerId: idCustomer,
      });
    },
    addProductToOrder: (state, payload) => {
      state.orders.forEach((order) => {
        if (order.customerId === payload.idCustomer) {
          order.productsId.push({
            idProduct: payload.idProduct,
            countProduct: payload.countProduct,
          });
        }
      });
    },
    delProductFromOrder: (state, idProduct, idCustomer) => {
      state.orders.forEach((order, index, productsIds) => {
        if (order.customerId === idCustomer) {
          productsIds.forEach((productId, indexProduct, arr) => {
            if (productId === idProduct) {
              arr.splice(indexProduct, 1);
            }
          });
        }
      });
    },
    clearOrder: (state, idCustomer) => {
      state.orders.forEach((order) => {
        if (order.customerId === idCustomer) {
          order.productsId.splice(0);
        }
      });
    },
  },
  actions: {
    // Products
    getProducts: async (context) => {
      const { data } = await Axios.get(`${config.api}/products`);
      context.commit('setProducts', data);
    },
    getProduct: async (context, idProduct) => {
      const { data } = await Axios.get(`${config.api}/products/${idProduct}`);
      context.commit('setEditProduct', data);
    },
    saveProduct: async (context, product) => {
      const { data } = await Axios.post(`${config.api}/products`, product);
      if (data.status === 200) {
        context.commit('addProduct', product);
      }
    },
    saveEditProduct: async (context, product, idProduct) => {
      const { data } = await Axios.put(`${config.api}/products/${idProduct}`, product);
      if (data.status === 200) {
        context.commit('updateProduct', product, idProduct);
      }
    },
    // Categories
    getCategories: async (context) => {
      const { data } = await Axios.get(`${config.api}/categories`);
      context.commit('setCategories', data);
    },
    saveCategory: async (context, category) => {
      const { data } = await Axios.post(`${config.api}/categories`, category);
      if (data.status === 200) {
        context.commit('addCategory', category);
      }
    },
    // Order
    saveProductToOrder: async (context, payload) => {
      console.log(payload.idProduct);
      console.log(payload.idCustomer);
      const { data } = await Axios.put(
        `${config.api}/customers/add_to_order/${payload.idCustomer}`,
        { idProduct: payload.idProduct, countProduct: payload.countProduct },
      );
      context.commit('addProductToOrder', payload);
    },
    delProductFromOrder: async (context, idProduct, idCustomer) => {
      const { data } = await Axios.delete(
        `${config.api}/customers/delete_from_order/${idCustomer}`,
        idProduct,
      );
      context.commit('deleteFromOrder', idProduct, idCustomer);
    },
    clearOrder: async (context, idCustomer) => {
      const { data } = await Axios.delete(`${config.api}/customers/clear_order/${idCustomer}`);
      context.commit('clearOrder', idCustomer);
    },
  },
  getters: {
    products: state => state.products,
  },
});
