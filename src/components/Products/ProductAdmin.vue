<template>
  <div class="product-admin">
    <b-card
      v-if="titleProduct && id"
      class="card-product shadow"
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
          <!--<lingallery
                      v-if="images.length !== 0"
                      :width="250"
                      :height="150"
                      :items="imagesForProduct"
                    />-->
          <div v-else>
            <p>Нет фото</p>
          </div>
        </b-row>
        <b-row class="d-flex flex-row">
          <b-button
            class="m-1"
            variant="primary"
            @click="editProduct"
          >
            Ред.
          </b-button>
          <b-button
            class="m-1"
            variant="danger"
            @click="deleteProduct"
          >
            Удалить
          </b-button>
        </b-row>
        <!--<b-row>
                  <star-rating
                    :star-size="20"
                    :read-only="true"
                    :rating="ratingProduct"
                  />
                </b-row>-->
        <b-row class="mt-3">
          <b-col v-if="avlCount !== undefined">
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
/* import StarRating from '../Rating/star-rating.vue'; */

export default {
  name: 'ProductAdmin',
  /*  components: {
    StarRating,
  }, */
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
  mounted() {
  },
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
    .shadow:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Параметры тени */
    }
</style>
