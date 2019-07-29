import api from './api';
import config from '../../config';

export default {
  getProducts() {
    return api().get(`${config.api}/products`);
  },
  getProduct(idProduct) {
    return api().get(`${config.api}/products/${idProduct}`);
  },
};
