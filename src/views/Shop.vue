<template>
  <div id="store">
    <list-products />
  </div>
</template>

<script>
import ListProducts from '../components/Products/ListProducts.vue';

export default {
  name: 'Store',
  components: {
    'list-products': ListProducts,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
