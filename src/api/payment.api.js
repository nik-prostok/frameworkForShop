import axios from 'axios';
import config from '../../config';

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  createPayment(order) {
    return axios.post(`${config.payment}`, order.order);
  },
};
