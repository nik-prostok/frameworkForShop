import api from './axios.settings';

export default {
  getCart(customer) {
    console.log(customer)
    return api().get(`/cart/${customer}`);
  },
  addToCart(customer, product, count) {
    return api().post('/cart', {
      customer,
      product,
      count,
    });
  },
  clearCart(customer) {
    return api().delete('/cart', customer);
  },
};
