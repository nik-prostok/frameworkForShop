import delivery from '../../api/delivery.api';
import {products} from "../../api/api";

const state = {
    deliveryTypes: [],
    deliveryCities: [],
    deliveryTypesForCity: {},
    selectedCity: null,
    idEditDelivery: null,
    currentEditDelivery: null,
    showEditDelivery: false,
    showAddDelivery: false,
    isShowAddButton: false,
};

const getters = {};

const actions ={
    async getAllDeliveryTypes({ commit }) {
        await delivery.getTypesDelivery()
            .then((res) => {
                if (res.data.status === 'OK') {
                    commit('setDeliveryTypes', res.data.data)
                }
            })
    },
    async getAllCities({ commit }) {
        await delivery.getAllCities()
            .then((res) => {
                if (res.data.status === 'OK') {
                    commit('setCities', res.data.data)
                }
            })
    },
    async deleteDeliveryById({ commit }, deliveryID) {
        await delivery.deleteDeliveryById(deliveryID)
            .then(res => {
                if (res.data.status === 'OK') {
                    commit('deleteDeliveryById', deliveryID)
                }
            })
    },
    async saveDelivery({commit}, deliveryData) {
        await delivery.createTypeDelivery(deliveryData)
            .then((res) => {
                if (res.data.status === 'OK') {
                    commit('addDelivery', res.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
}

const mutations = {
    selectCity(state, city){
        state.selectedCity = city;
    },
    addDelivery(state, deliveryTypes) {
      state.deliveryTypes = deliveryTypes;
    },
    setDeliveryTypes(state, deliveryTypes){
        state.deliveryTypes = deliveryTypes;
    },
    setCities(state, cities){
        state.deliveryCities = cities;
    },
    deleteDeliveryById({commit}, deliveryID) {
        state.deliveryTypes = state.deliveryTypes.filter(type => {
            if (type._id === deliveryID) {
                return false;
            }
            return true;
        })
    },
    showAddButton: (state) => {
        state.isShowAddButton = true;
    },
    hideAddButton: state => {
        state.isShowAddButton = false;
    },
    setEditMode: (state) => {
        state.showAddDelivery = false;
        state.showEditDelivery = true;
        /*state.products.forEach((product) => {
            // eslint-disable-next-line no-underscore-dangle
            if (product._id === state.idEditProduct) {
                state.currentEditProduct = product;
            }
        });*/
    },
    setDefaultMode: (state) => {
        state.showEditDelivery = false;
        state.showAddDelivery = false;
    },
    setAddMode: (state) => {
        state.showEditDelivery = false;
        state.showAddDelivery = true;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
