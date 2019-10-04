import api from './axios.settings';

export default {
  getCart(customer) {
    console.log(customer);
    return api.get(`/cart/${customer}`);
  },
  addToCart(customer, payload) {
    return api.post('/cart', {
      customer,
      product: {
        product: payload.product,
        count: payload.count,
      },
    });
  },
  clearCart(customer) {
    return api.delete('/cart', customer);
  },
};
