<template>
  <div class="list-products container">
    <b-row v-if="products.length !== 0">
      <b-col
        v-for="product in products"
        :key="product._id"
      >
        <product
          style="max-width: 15rem;"
          class="m-3"
          :product="product"
          :images="imagesURL(product.images)"
          :onBuy="addToCart"
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
import { mapState, mapActions } from 'vuex';
import Product from './Product.vue';
import config from '../../../config';

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
      customer: '5ce08aed5e1d84270cef4e04',
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
    ...mapActions('cart', [
            'addToCart', //this.addToCart()
    ]),
    imagesURL(images) {
      console.log(images);
      return images.map(image => `${config.image}/${image}`);
    },
  },
};
</script>
