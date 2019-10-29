<template>
  <div id="dashboard-categories">
    <nav-bar />
    <div class="content">
      <b-row>
        <b-col class="col-3">
          <add-category />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AddCategory from '../components/Categories/AddCategory.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'DashboardCategoriesView',
  components: {
    AddCategory,
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
