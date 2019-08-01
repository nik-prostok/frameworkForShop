<template>
  <div id="main-dashboard">
    <div class="content">
      <b-row class="m-3">
        <b-col>
          <b-row>
            <h5>
              Товары
            </h5>
          </b-row>
          <b-row>
            <list-products-for-admin />
          </b-row>
        </b-col>
        <b-col v-if="!showEditProduct">
          <b-row class="m-3">
            <h5>
              Добавить товар
            </h5>
          </b-row>
          <b-row class="m-3">
            <add-product />
          </b-row>
        </b-col>
        <b-col v-else>
          <b-row class="m-3">
            <h5>
              Редактировать товар
            </h5>
          </b-row>
          <b-row class="m-3">
            <edit-product />
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import ListProductsForAdmin from '../components/Products/ListProductsForAdmin.vue';
import AddProduct from '../components/Products/AddProduct.vue';
import EditProduct from '../components/Products/EditProduct.vue';

export default {
  name: 'DashboardView',
  components: {
    AddProduct,
    ListProductsForAdmin,
    EditProduct,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      idEditProduct: state => state.products.idEditProduct,
    }),
    showEditProduct() {
      if (this.idEditProduct === null) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>

</style>
