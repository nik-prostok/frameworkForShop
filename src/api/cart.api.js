import api from './axios.settings';

export default {
  getCart(customer) {
    console.log(customer);
    return api.get(`/cart/${customer}`);
  },
  addToCart(customer, products) {
    console.log(products)
    return api.post('/cart', {
      customer,
      products,
    });
  },
  clearCart(customer) {
    return api.delete('/cart', customer);
  },
};
