<template>
  <div class="list-products container mt-3">
    <b-row v-if="products.length !== 0">
      <div
        v-for="product in products"
        :key="product._id"
        class="m-2"
      >
        <product
          :id="product._id"
          style="max-width: 15rem;"
          :title-product="product.title"
          :avl-count="product.availableQuantity"
          :main-image="product.images[0]"
          :rating-product="product.rating"
        />
      </div>
    </b-row>
    <b-row
      v-else
      class="d-flex justify-content-center"
    >
      <h5>Нет доступных товаров</h5>
    </b-row>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import ProductAdmin from './ProductAdmin.vue';

export default {
  name: 'ListProductsForAdmin',
  components: {
    product: ProductAdmin,
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
    }),
  },
  mounted() {
    this.$store.dispatch('products/getAllProducts');
  },
  methods: {
    update() {
      console.log('UPDATE PRODUCTS');
      this.$store.dispatch('getProducts');
    },
  },
};
</script>
