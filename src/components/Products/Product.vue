<template>
  <div class="product">
    <b-card
      v-if="product.title && product._id"
      class="shadow"
      :title="product.title"
    >
      <b-card-body>
        <b-row>
          <b-carousel
            v-if="images.length !== 0"
            id="carousel-fade"
            controls
            fade
            indicators
            img-width="250"
            img-height="150"
          >
            <b-carousel-slide
              v-for="(image, index) of images"
              :key="index"
              :img-src="image"
            />
          </b-carousel>
        </b-row>
        <b-row>
          <star-rating
            :star-size="20"
            :read-only="true"
            :rating="product.rating"
          />
        </b-row>
        <b-row class="mt-3">
          <b-col v-if="product.availableQuantity">
            <p>Осталось: {{ product.availableQuantity }} шт</p>
          </b-col>
          <b-col>
            <b-button @click="onClickBuy">
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
    StarRating,
  },
  props: {
    product: Object,
    images: Array,
    onBuy: Function,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    onClickBuy(){
      let id = this.product._id;
      this.onBuy({
        product: id,
        count: 1
      });
    }
  },
};
</script>

<style lang="less" scoped>

.image-product {
  width: 20%;
  height: auto;
}
.shadow:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Параметры тени */
}

</style>
