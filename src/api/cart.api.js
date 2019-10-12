import api from './axios.settings';

export default {
  getCart(customer) {
    return api.get(`/cart/${customer}`);
  },
  addToCart(customer, products) {
    return api.post('/cart', {
      customer,
      products,
    });
  },
  setCountPoint(customer, productID, count) {
    return api.post(`/cart/${customer}/${productID}/${count}`);
  },
  clearCart(customer) {
    return api.delete('/cart', customer);
  },
};
