<template>
  <div class="product">
    <b-card
      v-if="titleProduct && id"
      :title="titleProduct"
    >
      <b-card-body>
        <b-row>
          <img
            :src="mainImage"
            style="max-height: 7rem;"
            alt=""
            class="m-2"
          >
        </b-row>
        <b-row>
          <star-rating
            :star-size="20"
            :read-only="true"
            :rating="ratingProduct"
          />
        </b-row>
        <b-row class="mt-3">
          <b-col v-if="avlCount">
            <p>Осталось: {{ avlCount }} шт</p>
          </b-col>
          <b-col>
            <b-button @click="addToOrder(id)">
              Buy
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card v-else>
      <p>Error settings product!</p>
    </b-card>
  </div>
</template>

<script>
import StarRating from '../Rating/star-rating.vue';

export default {
  name: 'Product',
  components: {
    'star-rating': StarRating,
  },
  props: {
    id: String,
    titleProduct: String,
    avlCount: Number,
    mainImage: String,
    ratingProduct: Number,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    addToOrder(idProduct) {
      const payload = {
        idProduct,
        idCustomer: '5cdc9f41a2767427d8fbfb7c',
        countProduct: 2,
      };
      this.$store.dispatch('saveProductToOrder', payload);
    },
  },
};
</script>

<style lang="less" scoped>
.image-product {
  width: 20%;
  height: auto;
}
</style>
