/* eslint-disable no-param-reassign,no-shadow */
import {cart} from '../../api/api';
import toast from '../../plugins/toast';
import {deepCopy} from '../../util';

// initial state
const state = {
    cart: {
        customer: '',
        products: []
    },
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
                if (res.data !== '') {
                    commit('setCart', res.data);
                }

            })
            .catch(err => {
                toast.error(err);
            });
    },
    async addToCart({commit, state}, payload) {
        let customer = '5ce08aed5e1d84270cef4e04'


        let products = deepCopy(state.cart.products);

        let index = state.cart.products.findIndex(product => product.product._id === payload.product)
        console.log(index);
        if (index !== -1){
            products[index].count += payload.count;
        } else {
            products.push(payload);
        }

        await cart.addToCart(customer, products)
            .then((res) => {
                commit('setCart', res.data);
            });
    },
};

// mutations
const mutations = {
    setCart(state, payload) {
        state.cart = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
