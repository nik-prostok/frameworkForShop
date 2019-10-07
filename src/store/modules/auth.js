import axios from 'axios';
import auth from '../../api/auth.api';

// initial state
const state = {
  user: {
    email: '',
    role: '',
  },
  token: '',
};

// getters
const getters = {
  token: state => state.token,
  user: state => state.user,
};

// actions
const actions = {
  register({ commit, state }, { email, password }) {
    auth.register({ email, password })
      .then((res) => {
        if (res.data.success) commit('authenticate', res.data);
      })
      .catch(err => console.log(err.response));
  },
  authenticate({ commit, state }, { email, password }) {
    return new Promise ((resolve, reject) => {
      auth.authenticate({ email, password })
        .then((res) => {
          if (res.data.success) {
            commit('authenticate', res.data);
            resolve(res.data)
          }
        })
        .catch(err => {
          console.log(err.response)
          reject(err.response)
        })
    })
  },
  deleteUser({ commit, state }, { email }) {
    auth.deleteUser({ email })
      .then((res) => {
        if (res.data.success) commit('logout', res.data);
      })
      .catch(err => console.log(err.response));
  },
  updateUserRole({ commit, state }, { email, role }) {
    auth.updateUserRole({ email, role })
      .then((res) => {
        if (res.data.data.success) commit('updateUserRole', res.data);
      })
      .catch(err => console.log(err.response));
  },
  getDataFromCookie({ commit }, data) {
    console.log(data)
    commit('authenticate', data);
  },
  permission({ state }) {
    return new Promise (resolve => resolve(state.user.role))
  },
};

// mutations
const mutations = {
  authenticate(state, data) {
    state.user = data.user;
    state.token = data.token;
    axios.defaults.headers.common.token = data.token;
  },
  updateUserRole(state, data) {
    state.user = data.user;
  },
  logout(state) {
    state.user = {};
    state.token = '';
    axios.defaults.headers.common.token = '';
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
