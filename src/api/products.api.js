import api from './axios.settings';

export default {
  getProducts() {
    return api().get('/products');
  },
  getProduct(idProduct) {
    return api().get(`/products/${idProduct}`);
  },
  saveProduct(product) {
    return api().post('/products', product);
  },
  saveEditProduct(product, idProduct) {
    return api().put(`/products/${idProduct}`, product);
  },
  deleteProduct(idProduct) {
    return api().delete(`/products/${idProduct}`);
  },
};
