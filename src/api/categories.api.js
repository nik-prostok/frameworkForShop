import api from './axios.settings';

export default {
  getCategories() {
    return api.get('/categories');
  },
  saveCategory(category) {
    return api.post('/categories', category);
  },
  patchCategory({ id, category }) {
    return api.patch(`/categories/${id}`, category);
  }
};
