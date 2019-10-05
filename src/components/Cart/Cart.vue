<template>
  <div
    id="cart"
    class="ml-2 mr-2"
  >
    <b-row class="mr-1">
      <b-col cols="7">
        <h3 style="font-family: Roboto;">
          Моя корзина
        </h3>
      </b-col>
      <b-col
        class="d-none d-sm-block"
        cols="3"
        style="font-family: Roboto; text-align: center"
      >
        Количество
      </b-col>
      <b-col
        class="d-none d-sm-block"
        cols="1"
        offset="1"
      >
        <p style="font-family: Roboto; padding-right: 1em">
          Цена
        </p>
      </b-col>
    </b-row>
    <hr>
    <b-row
      v-for="item in cart"
      :key="item._id"
      no-gutters
    >
      <b-col>
        <b-card class="cart-box mb-3">
          <CartPoint
            :item-title="item.product.title"
            :images="imagesURL(item.product.images)"
            :count="item.count"
            :currency="item.product.currency"
            :price="item.product.price"
            :available="item.product.availableQuantity"
          />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import CartPoint from './CartPoint.vue';
import config from '../../../config';

export default {
  name: 'Cart',
  components: {
    CartPoint,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('cart', {
      cart: 'cartProducts',
    }),
  },
  mounted() {
    this.$store.dispatch('cart/getCart', '5ce08aed5e1d84270cef4e04');
  },
  methods: {
    imagesURL(images) {
      return images.map(image => `${config.image}/${image}`);
    },
  },
};
</script>

<style scoped>
    div.card-body {
        margin: 0px;
        padding: 0px;
    }
    .cart-box {
        padding: 0px;
        transition: box-shadow .3s;
        border-radius: 10px;
        border: 1px solid #ccc;
        background: #fff;

    }

    .cart-box:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, .2);
    }
</style>
