/* eslint-disable no-shadow,no-param-reassign */
import categories from '../../api/categories.api';

// initial state
const state = {
  categories: [],
  categoriesWithoutNewCat: [],
};

// getters
const getters = {};

// actions
const actions = {
  async saveCategory({ commit }, category) {
    await categories.saveCategory(category)
      .then((res) => {
        commit('addNewCategory', res.data.data);
      });
  },
  async updateCategory({ commit }, { id, category }) {
    await categories.patchCategory({ id, category })
        .then((res) => {
          commit('updateCategory', res.data.data);
        });
  },
  async getAllCategories({ commit }) {
    await categories.getCategories()
      .then((res) => {
        commit('setCategories', res.data.data);
      });
  },
  async getCategoriesWithoutNewCat({ commit }) {
    await categories.getCategories()
      .then((res) => {
        commit('setCategoriesWithoutNewCat', res.data.data.filter((cat) => {
          if (cat.title !== 'Новая категория') {
            return true;
          } return false;
        }));
      });
  },
};

// mutations
const mutations = {
  addNewCategory(state, category) {
    state.categories.push(category);
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setCategoriesWithoutNewCat(state, categories) {
    state.categoriesWithoutNewCat = categories;
  },
  updateCategory(state, {id, category}) {
    state.categories = [
      ...state.categories.filter(element => element.id !== id),
      category,
    ];
    state.categoriesWithoutNewCat = [
      ...state.categoriesWithoutNewCat.filter(element => element.id !== id),
      category,
    ];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
