import api from './axios.settings';

export default {
    getTypesDelivery() {
        return api.get('/delivery');
    },
    createTypeDelivery() {
        return api.post('/delivery');
    },
    getAllCities() {
        return api.get('/delivery/cities');
    },
    getDeliveriesByCity(cityId) {
        return api.get('/delivery/city');
    },
};
