<template>
  <div id="dashboard-categories">
      <add-category/>
  </div>
</template>

<script>
import AddCategory from '../components/Categories/AddCategory.vue';

export default {
  name: 'DashboardCategoriesView',
  components: {
    AddCategory,
  },
  data() {
    return {

    };
  },
};
</script>

<style scoped>

</style>
