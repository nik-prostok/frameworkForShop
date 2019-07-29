import category from '../../api/categories.api';

// initial state
const state = {
  categories: [],
  categoriesWithoutNewCat: [],
};

// getters
const getters = {
  categories: state => state.categories,
};

// actions
const actions = {
  async getAllCategories({ commit }) {
    await category.getCategories()
      .then((res) => {
        commit('setCategories', res.data);
      });
  },
  async getCategoriesWithoutNewCat({ commit }) {
    await category.getCategories()
      .then((res) => {
        commit('setCategoriesWithoutNewCat', res.data.filter((cat) => {
          if (cat.title !== 'Новая категория') {
            return true;
          } return false;
        }));
      });
  },
};

// mutations
const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  setCategoriesWithoutNewCat(state, categories) {
    state.categoriesWithoutNewCat = categories;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
