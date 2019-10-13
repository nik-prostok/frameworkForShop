/* eslint-disable no-param-reassign,no-shadow */
import {cart} from '../../api/api';
import toast from '../../plugins/toast';
import {deepCopy} from '../../util';

// initial state
const state = {
    customer: '5ce08aed5e1d84270cef4e04',
    cart: {
        customer: '',
        products: []
    },
    checkoutStatus: null,
};

// getters
const getters = {
    cartProducts: () => state.cart.products,
    indexProduct: (idProduct) => state.cart.products.findIndex(product => product.product._id === idProduct)
    // eslint-disable-next-line max-len
};

// actions
const actions = {
    async getCart({commit, state}) {
        await cart.getCart(state.customer)
            .then((res) => {
                if (res.data !== '') {
                    commit('setCart', res.data);
                }

            })
            .catch(err => {
                toast.error(err);
            });
    },
    async addToCart({commit, state, getters}, payload) {
        return new Promise(async (resolve, reject) => {
            let products = deepCopy(state.cart.products);

            let index = state.cart.products.findIndex(product => product.product._id === payload.product)


            if (index !== -1) {
                if ((products[index].count + payload.count) <= products[index].product.availableQuantity) {
                    products[index].count += payload.count;
                } else {
                    reject(`Сейчас доступно не более ${products[index].product.availableQuantity} шт.`)
                }
            } else {
                products.push(payload)
            }

            await cart.addToCart(state.customer, products)
                .then((res) => {
                    commit('setCart', res.data);
                });
        })
    },
    async setCountPoint({commit, state}, payload) {
        return new Promise(async (resolve, reject) => {
            await cart.setCountPoint(state.customer, payload.productId, payload.count)
                .then((res) => {
                    commit('setCart', res.data)
                })
        })
    },
    async increaseCountPoint({commit, state}, payload) {
        return new Promise(async (resolve, reject) => {

            console.log(payload)
            let products = deepCopy(state.cart.products);

            let index = state.cart.products.findIndex(product => product.product._id === payload.idProduct)


            if (index !== -1) {
                if ((products[index].count + 1) <= products[index].product.availableQuantity) {
                    products[index].count += 1;
                    await cart.setCountPoint(state.customer, payload.idProduct, products[index].count)
                        .then((res) => {
                            if (res.status === 200){
                                commit('setCountPoint', {index, count: products[index].count})
                            }
                        })
                } else {
                    reject(`Сейчас доступно не более ${products[index].product.availableQuantity} шт.`)
                }
            }

        })
    },
    async reduceCountPoint({commit, state}, payload) {
        return new Promise(async (resolve, reject) => {
            let products = deepCopy(state.cart.products);

            let index = state.cart.products.findIndex(product => product.product._id === payload.idProduct)

            if (index !== -1) {
                if ((products[index].count - 1) <= products[index].product.availableQuantity) {
                    products[index].count -= 1;
                    await cart.setCountPoint(state.customer, payload.idProduct, products[index].count)
                        .then((res) => {
                            if (res.status === 200){
                                commit('setCountPoint', {index, count: products[index].count})
                            }
                        })
                } else {
                    reject(`Сейчас доступно не более ${products[index].product.availableQuantity} шт.`)
                }
            }
        })
    },
    async deletePoint({ commit, state }, payload) {
        return new Promise(async (resolve, reject) => {
            // commit('deletePoint', {idProduct: payload.idProduct})
            await cart.deletePoint(state.customer, payload.idProduct)
                .then(res => {
                    commit('setCart', res.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
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
        //let index = state.cart.products.findIndex(product => product.product._id === payload.idProduct)
        let index = getters.indexProduct(payload.idProduct)
        state.cart.products.splice(index, 1)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
