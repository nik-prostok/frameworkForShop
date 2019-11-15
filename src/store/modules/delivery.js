import { delivery, city } from '../../api/api';


const state = {
  deliveryTypes: [],
  deliveryCities: [],
  deliveryTypesForCity: {},

  // Убрать в проде!
  selectedCity: {
    _id: "5db87c7de14132115089f0b6",
    city: 'МОСКВА1'
  },
  selectedTypeDelivery: {
    id: 0
  },

  idEditDelivery: null,
  currentEditDelivery: null,

  showEditDelivery: false,
  showAddDelivery: false,
  isShowAddButton: false,
  isShowAddCityButton: false,
};

const getters = {};

const actions = {
  async getAllDeliveryTypes({ commit }) {
    await delivery.getTypesDelivery()
      .then((res) => {
        if (res.data.status === 'OK') {
          commit('setDeliveryTypes', res.data.data);
        }
      });
  },
  async getAllCities({ commit }) {
    await city.getAllCities()
      .then((res) => {
        if (res.data.status === 'OK') {
          commit('setCities', res.data.data);
        }
      });
  },
  async deleteDeliveryById({ commit }, deliveryID) {
    await delivery.deleteDeliveryById(deliveryID)
      .then((res) => {
        if (res.data.status === 'OK') {
          commit('deleteDeliveryById', deliveryID);
        }
      });
  },
  async saveDelivery({ commit }, deliveryData) {
    if ((deliveryData.underground.length === 1) && (deliveryData.underground[0] === '')){
      deliveryData.underground = [];
    }
    await delivery.createTypeDelivery(deliveryData)
      .then((res) => {
        if (res.data.status === 'OK') {
          commit('addDelivery', res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async patchDelivery({ commit, state }, { deliveryType }) {
    await delivery.patchDelivery(deliveryType, state.idEditDelivery)
      .then((res) => {
        if (res.data.status === 'OK') {
          commit('updateDelivery', { delivery: res.data.data, id: state.idEditDelivery });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async deleteCity({commit}, { idCity }){
    await city.deleteCity(idCity)
        .then((res) => {
          if (res.data.status === 'OK') {
            commit('deleteCity', idCity);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
  async patchCity({ commit }, { idCity, newName }){
    await city.patchCity({ idCity, newName })
        .then(res => {
          if (res.data.status === 'OK') {
            commit('patchCity', { idCity, newName })
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
  async addCity({ commit }, name){
    await city.addCity(name)
        .then(res => {
          console.log(res)
          if (res.data.status === 'OK') {
            commit('addCity', res.data.data)
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
};

const mutations = {
  setTypeDelivery(state, typeDelivery){
    state.selectedTypeDelivery = typeDelivery;
  },
  addCity(state, city) {
    state.deliveryCities.push(city);
  },
  deleteCity(state, idCity) {
    state.deliveryCities = state.deliveryCities.filter(city => {
      if (city._id === idCity) {
        return false;
      }
      return true;
    })
  },
  patchCity(state, { idCity, newName}){
    state.deliveryCities = state.deliveryCities.map(city => {
      if (city._id === idCity) {
        city.city = newName;
      }
      return city;
    });
  },
  selectCity(state, city) {
    state.selectedCity = city;
  },
  addDelivery(state, deliveryTypes) {
    state.deliveryTypes = deliveryTypes;
  },
  setDeliveryTypes(state, deliveryTypes) {
    state.deliveryTypes = deliveryTypes;
  },
  setCities(state, cities) {
    state.deliveryCities = cities;
  },
  deleteDeliveryById({ commit }, deliveryID) {
    state.deliveryTypes = state.deliveryTypes.filter((type) => {
      if (type._id === deliveryID) {
        return false;
      }
      return true;
    });
  },
  showAddButton: (state) => {
    state.isShowAddButton = true;
  },
  hideAddButton: (state) => {
    state.isShowAddButton = false;
  },
  showAddCityButton: (state) => {
    state.isShowAddCityButton = true;
  },
  hideAddCityButton: (state) => {
    state.isShowAddCityButton = false;
  },
  updateDelivery: (state, { delivery, id }) => {
    state.deliveryTypes = [
      ...state.deliveryTypes.filter(element => element._id !== id),
      delivery,
    ];
    state.showEditDelivery = false;
  },
  setEditMode: (state, { idEditDelivery }) => {
    state.idEditDelivery = idEditDelivery;
    state.deliveryTypes.forEach((deliveryType) => {
      if (deliveryType._id === state.idEditDelivery) {
        state.currentEditDelivery = deliveryType;
      }
    });
    state.showAddDelivery = false;
    state.showEditDelivery = true;
  },
  setDefaultMode: (state) => {
    state.showEditDelivery = false;
    state.showAddDelivery = false;
  },
  setAddMode: (state) => {
    state.showEditDelivery = false;
    state.showAddDelivery = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
