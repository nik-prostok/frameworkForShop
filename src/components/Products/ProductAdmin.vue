<template>
  <div class="product-admin">
    <b-card
      v-if="titleProduct && id"
      class="card-product"
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
          <b-col class="m-1">
            <b-button
              variant="primary"
              @click="Edit(id)"
            >
              Ред.
            </b-button>
          </b-col>
          <b-col class="m-1">
            <b-button
              variant="danger"
              @click="Delete(id)"
            >
              Удалить
            </b-button>
          </b-col>
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
  name: 'ProductAdmin',
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
  methods: {},
};
</script>

<style scoped>
  .image-product {
    width: 20%;
    height: auto;
  }
</style>
