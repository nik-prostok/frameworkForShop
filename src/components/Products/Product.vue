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
            v-if="imagesURL.length !== 0"
            id="carousel-fade"
            controls
            fade
            indicators
            img-width="250"
            img-height="150"
          >
            <b-carousel-slide
              v-for="(image, index) of imagesURL"
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
            <b-button variant="success" v-if="alreadyInCart" @click="onClickBuy">
              Купить
            </b-button>
            <b-button variant="outline-success" v-else>
              Уже в корзине
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
import {mapGetters} from "vuex";

export default {
  name: 'Product',
  components: {
    StarRating,
  },
  props: {
    product: Object,
    onBuy: Function,
    imageUrlConfig: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('cart', {
      cart: 'cartProducts'
    }),
    alreadyInCart(){
      if (this.cart.find(cartItem => {
        if (cartItem.product._id === this.product._id){
          return true;
        }
      })) {
        return false;
      }  else {
        return true;
      }
    },
    imagesURL() {
      return this.product.images.map(image => `${this.imageUrlConfig}/${image}`);
    },
  },
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
