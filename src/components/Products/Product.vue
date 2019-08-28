<template>
  <div class="product">
    <b-card
      v-if="titleProduct && id"
      class="shadow"
      :title="titleProduct"
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
    StarRating,
  },
  props: {
    id: String,
    titleProduct: String,
    avlCount: Number,
    images: Array,
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
.shadow:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.5); /* Параметры тени */
}

</style>
