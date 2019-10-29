import api from './axios.settings';

export default {
    getAllCities() {
        return api.get('/city/all');
    },
    deleteCity(idCity) {
        return api.delete(`/city/${idCity}`);
    },
    patchCity({idCity, newName }) {
        return api.patch(`/city/${idCity}`, { city: newName });
    },
    addCity(city){
      return api.post('/city', { city });
    }
};
