/* eslint-disable no-param-reassign,no-shadow */
import {cart} from '../../api/api';
import toast from '../../plugins/toast';

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
    async getCart({commit}, customer) {
        await cart.getCart(customer)
            .then((res) => {
                commit('setCart', res.data);
            })
            .catch(err => {
                toast.error(err);
            });
    },
    async addToCart({commit}, payload) {
        let customer = '5ce08aed5e1d84270cef4e04'
        await cart.addToCart(customer, payload)
            .then((res) => {
                commit('setCart', res.data);
            });
    },
};

// mutations
const mutations = {
    setCart(state, payload) {
        state.cart = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
