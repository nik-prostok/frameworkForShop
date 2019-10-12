import axios from 'axios';
import payment from '../../api/payment.api';

// actions
const actions = {
  createPayment({ commit }, { order }) {
    return new Promise((resolve, reject) => {
      payment.createPayment({ order })
        .then(resolve)
        .catch(reject)
    })
  }
};

export default {
  namespaced: true,
  actions
};
