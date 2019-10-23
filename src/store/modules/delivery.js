import delivery from '../../api/delivery.api';

const state = {
    deliveryTypes: [],
    deliveryCities: [],
    deliveryTypesForCity: {},
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
    }
}

const mutations = {
    setDeliveryTypes(state, deliveryTypes){
        state.deliveryTypes = deliveryTypes;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
