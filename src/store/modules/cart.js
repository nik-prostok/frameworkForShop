/* eslint-disable no-param-reassign,no-shadow */
import { cart } from '../../api/api';
import toast from '../../plugins/toast';
import { deepCopy } from '../../util';

// initial state
const state = {
  customer: '5ce08aed5e1d84270cef4e04',
  cart: {
    customer: '',
    products: [],
  },
  checkoutStatus: null,
};

// getters
const getters = {
  cartProducts: () => state.cart.products,
  indexProductById: state => idProduct => state.cart.products.findIndex(product => product.product._id === idProduct),
  getCountPointById: state => (idProduct) => {
    const item = state.cart.products.find(product => product.product._id === idProduct);
    return item.count;
  },
  avlQntById: (state, getters, rootState) => (idProduct) => {
    const avlQnt = rootState.products.products.find(product => product._id === idProduct).availableQuantity;
    return avlQnt;
  },
};

// actions
const actions = {
  async getCart({ commit, state }) {
    await cart.getCart(state.customer)
      .then((res) => {
        commit('setCart', res.data.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  },
  async addToCart({ commit, state, getters }, payload) {
    return new Promise(async (resolve, reject) => {
      if (getters.avlQntById(payload.product) > 0) {
        await cart.addToCart(state.customer, payload.product)
          .then((res) => {
            commit('setCart', res.data.data);
          });
      } else {
        toast.error('К сожалению данного товара нет на складе.');
      }
    });
  },
  async setCountPoint({ commit, state, getters }, payload) {
    return new Promise(async (resolve, reject) => {
      if ((payload.count > 0) && (payload.count <= getters.avlQntById(payload.productId))) {
        await cart.setCountPoint(state.customer, payload.productId, Number(payload.count))
          .then((res) => {
            commit('setCart', res.data.data);
          });
      } else {
        reject(`Сейчас доступно не более ${getters.avlQntById(payload.productId)} шт.`);
      }
    });
  },
  async increaseCountPoint({ commit, state, getters }, payload) {
    return new Promise(async (resolve, reject) => {
      if (getters.indexProductById(payload.idProduct) !== -1) {
        if ((getters.getCountPointById(payload.idProduct) + 1) <= getters.avlQntById(payload.idProduct)) {
          console.log(getters.getCountPointById(payload.idProduct));
          await cart.setCountPoint(state.customer, payload.idProduct, getters.getCountPointById(payload.idProduct) + 1)
            .then((res) => {
              if (res.status === 200) {
                commit('setCountPoint', {
                  index: getters.indexProductById(payload.idProduct),
                  count: getters.getCountPointById(payload.idProduct) + 1,
                });
              }
            });
        } else {
          toast.error(`Сейчас доступно не более ${getters.avlQntById(payload.idProduct)} шт.`);
        }
      }
    });
  },
  async reduceCountPoint({ commit, state, getters }, payload) {
    return new Promise(async (resolve, reject) => {
      if (getters.indexProductById(payload.idProduct) !== -1) {
        if ((getters.getCountPointById(payload.idProduct) - 1) <= getters.avlQntById(payload.idProduct)) {
          console.log(getters.getCountPointById(payload.idProduct));
          await cart.setCountPoint(state.customer, payload.idProduct, getters.getCountPointById(payload.idProduct) - 1)
            .then((res) => {
              if (res.status === 200) {
                commit('setCountPoint', {
                  index: getters.indexProductById(payload.idProduct),
                  count: getters.getCountPointById(payload.idProduct) - 1,
                });
              }
            });
        } else {
          toast.error(`Сейчас доступно не более ${getters.avlQntById(payload.idProduct)} шт.`);
        }
      }
    });
  },
  async deletePoint({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      await cart.deletePoint(state.customer, payload.idProduct)
        .then((res) => {
          commit('setCart', res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

// mutations
const mutations = {
  setCart(state, payload) {
    state.cart = payload;
  },
  setCountPoint(state, payload) {
    if (payload.count > 0) {
      state.cart.products[payload.index].count = payload.count;
    }
  },
  deletePoint(state, payload) {
    // let index = state.cart.products.findIndex(product => product.product._id === payload.idProduct)
    const index = getters.indexProduct(payload.idProduct);
    state.cart.products.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
