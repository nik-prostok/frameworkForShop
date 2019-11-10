<template>
  <div id="dashboard-categories">
    <nav-bar />
    <b-container class="content">
      <list-categories/>
    </b-container>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import ListCategories from "../components/Categories/ListCategories";

export default {
  name: 'DashboardCategoriesView',
  components: {
    ListCategories,
    NavBar,
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="less">
  .content {
    padding: 10px 50px 10px 50px;
  }
</style>
