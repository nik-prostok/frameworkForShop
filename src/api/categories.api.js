import api from './api';
import config from '../../config';

export default {
  getCategories() {
    return api().get(`${config.api}/categories`);
  },
  saveCategory(category) {
    return api().post(`${config.api}/categories`, category);
  },
};
