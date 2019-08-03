import api from './api';
import config from '../../config';

export default {
  getProducts() {
    return api().get(`${config.api}/products`);
  },
  getProduct(idProduct) {
    return api().get(`${config.api}/products/${idProduct}`);
  },
  saveProduct(product) {
    return api().post(`${config.api}/products`, product);
  },
  saveEditProduct(product, idProduct) {
    return api().put(`${config.api}/products/${idProduct}`, product);
  },
  deleteProduct(idProduct) {
    return api().delete(`${config.api}/products/${idProduct}`);
  },
};
