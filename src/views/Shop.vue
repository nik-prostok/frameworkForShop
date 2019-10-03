<template>
  <div id="store">
    <list-products />
    <Cart></Cart>
  </div>
</template>

<script>
import ListProducts from '../components/Products/ListProducts.vue';
import Cart from '../components/Cart/Cart.vue';

export default {
  name: 'Store',
  components: {
    'list-products': ListProducts,
    Cart,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
