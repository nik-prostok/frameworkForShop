import api from './axios.settings';

export default {
    getTypesDelivery() {
        return api.get('/delivery');
    },
    createTypeDelivery(delivery) {
        return api.post('/delivery', delivery);
    },
    getAllCities() {
        return api.get('/delivery/cities');
    },

    // NOT FINISH AND NOT TESTED
    getDeliveriesByCity(cityId) {
        return api.get('/delivery/city');
    },
    deleteDeliveryById(deliveryID) {
        return api.delete(`/delivery/${deliveryID}`);
    },
};
