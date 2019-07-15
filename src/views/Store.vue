<template>
  <div id="store">
    <div class="col-3">
      <b-button
        class="m-2"
        @click="update"
      >
        Update
      </b-button>
      <b-form-input
        v-model="idProduct"
        type="text"
        placeholder="_Id"
      />
      <b-button @click="onSetEditProduct">
        setEditProduct
      </b-button>
    </div>

    <div class="row">
      <div class="col-4">
        <list-product
          :products="products"
          :vertical-list="true"
        />
      </div>
      <div class="col-4">
	       <h1>Добавление товара</h1>
        <add-product
          :categories="categories"
          :colors="colors"
        />
      </div>
      <div class="col-4">
        <edit-product
          :categories="categories"
          :colors="colors"
          :current-product="product"
        />
      </div>
    </div>
	  <div class="row">
		  <div class="col-3">
			  <h1>Добавление категории</h1>
			  <add-category
			  :categories="categories"
			  />
		  </div>
	  </div>
  </div>
</template>

<script>
	import { mapState } from 'vuex';

import ListProduct from '../components/Store/ListProducts.vue';
import AddProduct from '../components/Store/AddProduct.vue';
import EditProduct from '../components/Store/EditProduct.vue';
import AddCategory from "../components/Store/AddCategory.vue";

export default {
  name: 'Store',
  components: {
    'list-product': ListProduct,
    'add-product': AddProduct,
    'edit-product': EditProduct,
	   'add-category': AddCategory,
  },
  data() {
    return {
      colors: ['Красный', 'Зеленый', 'Черный'],
      idProduct: '',
    };
  },
  mounted() {
    this.$store.dispatch('products/getAllProducts');
    this.$store.dispatch('categories/getAllCategories');
  },
  computed: {
    ...mapState({
	    products: state => state.products.products,
	    categories: state => state.categories.categories,
    }),
  },
  methods: {
  	addNewProduct(product) {
		  this.$store.dispatch('saveProduct', product);
	  },
	  saveEditProduct(product) {
		  this.$store.dispatch('saveEditProduct', product, this.idProduct);
	  },
    onSetEditProduct() {
      this.$store.dispatch('getProduct', this.idProduct);
    },
    update() {
      console.log('UPDATE PRODUCTS');
      this.$store.dispatch('getProducts');
    },
  },
};
</script>
