import axios from 'axios';
import config from '../../config';

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  register(data) {
    return axios.post(`${config.auth}/register`, data);
  },
  authenticate(data) {
    return axios.post(`${config.auth}/authenticate`, data);
  },
  deleteUser(data) {
    return axios.delete(`${config.auth}/deleteUser`, { data });
  },
  updateUserRole(data) {
    return axios.put(`${config.auth}/updateUserRole`, data);
  },
};
