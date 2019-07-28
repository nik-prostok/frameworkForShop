<template>
  <div class="list-products container">
    <b-row v-if="products.length !== 0">
      <b-col
        v-for="product in products"
        :key="product._id"
      >
        <product
          :id="product._id"
          style="max-width: 15rem;"
          class="m-3"
          :title-product="product.title"
          :avl-count="product.availableQuantity"
          :main-image="product.images[0]"
          :rating-product="product.rating"
        />
      </b-col>
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
import Product from './Product.vue';

export default {
  name: 'ListProducts',
  components: {
    product: Product,
  },
  props: {
    verticalList: Boolean,
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
      this.$store.dispatch('getAllProducts');
    },
  },
};
</script>
