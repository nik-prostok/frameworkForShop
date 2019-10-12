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
          :already-in-cart="alreadyInCart(product._id)"
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
  import {mapState, mapActions, mapGetters} from 'vuex';
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

    };
  },
  computed: {
    ...mapState({
      products: state => state.products.products,
    }),
    ...mapGetters('cart', {
      cart: 'cartProducts'
    }),
  },
  mounted() {
    this.$store.dispatch('products/getAllProducts');
  },
  methods: {
    ...mapActions('cart', [
            'addToCart',
    ]),
    imagesURL(images) {
      return images.map(image => `${config.image}/${image}`);
    },
    alreadyInCart(productId) {
      if (this.cart.find(cartItem => {
        if (cartItem.product._id === productId){
          return true;
        }
      })) {
        return false;
      }  else {
        return true;
      }

      /*return this.cart.findIndex(cartItem => {
        if (cartItem.product._id === productId){
          return true;
        }
      })*/
    }
  },
};
</script>
