import api from './axios.settings';

export default {
  getCart(customer) {
    return api.get(`/cart/${customer}`);
  },
  addToCart(customer, product, count) {
    return api.post('/cart', {
      customer,
      product: {
        product,
        count: 1,
      },
    });
  },
  setCountPoint(customer, productID, count) {
    return api.patch(`/cart/${customer}/${productID}/${count}`);
  },
  deletePoint(customer, productID) {
    return api.delete(`/cart/${customer}/${productID}`);
  },
  clearCart(customer) {
    return api.delete('/cart', customer);
  },
};
