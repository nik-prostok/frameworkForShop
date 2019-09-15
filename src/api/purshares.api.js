import api from './axios.settings';

export default {
  getPurshares() {
    return api().get('/purshares');
  },
  createPurshare(purshare) {
    return api().post('/purshares', purshare);
  },
  getPurshareById(id) {
    return api().put(`/purshares/${id}`);
  },
};
