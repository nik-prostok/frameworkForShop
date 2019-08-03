<template>
  <div class="product-admin">
    <b-card
      v-if="titleProduct && id"
      class="card-product"
      :title="titleProduct"
    >
      <b-card-body>
        <b-row>
          <lingallery
            v-if="images.length !== 0"
            :width="250"
            :height="150"
            :items="imagesForProduct"
          />
          <div v-else>
            <p>Нет фото</p>
          </div>
        </b-row>
        <b-row>
          <b-col class="m-1">
            <b-button
              variant="primary"
              @click="editProduct"
            >
              Ред.
            </b-button>
          </b-col>
          <b-col class="m-1">
            <b-button
              variant="danger"
              @click="deleteProduct"
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
import Lingallery from 'lingallery';
import StarRating from '../Rating/star-rating.vue';

export default {
  name: 'ProductAdmin',
  components: {
    StarRating,
    Lingallery,
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
  computed: {
    imagesForProduct() {
      return this.images.map(image => ({
        src: image,
        thumbnail: image,
      }));
    },
  },
  mounted() {},
  methods: {
    deleteProduct() {
      this.$store.dispatch('products/deleteProduct', this.id)
        .then(() => {
          this.$store.dispatch('products/getAllProducts');
          this.makeToast('Продукт был успешно удален', 'Успешно', 'success');
        })
        .catch(() => {
          this.makeToast('Произошла ошибка во время выполнения операции', 'Ошибка', 'danger');
        });
    },
    makeToast(text, title, variant = null) {
      this.$bvToast.toast(text, {
        title,
        autoHideDelay: 5000,
        variant,
      });
    },
    editProduct() {
      this.$store.commit('products/setIdEditProduct', this.id);
      this.$store.commit('products/setEditProduct');
    },
  },
};
</script>

<style scoped>
  .image-product {
    width: 20%;
    height: auto;
  }
</style>
