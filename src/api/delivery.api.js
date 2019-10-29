import api from './axios.settings';

export default {
  getTypesDelivery() {
    return api.get('/delivery');
  },
  createTypeDelivery(delivery) {
    return api.post('/delivery', delivery);
  },
  getAllCities() {
    return api.get('/city/all');
  },
  patchDelivery(delivery, id) {
    return api.patch(`/delivery/${id}`, delivery);
  },
  deleteDeliveryById(deliveryID) {
    return api.delete(`/delivery/${deliveryID}`);
  },

  // NOT FINISH AND NOT TESTED
  getDeliveriesByCity(cityId) {
    return api.get('/delivery/city');
  },
};
