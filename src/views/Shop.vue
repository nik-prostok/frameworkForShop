<template>
  <div id="store">
    <b-jumbotron header="Store 1.0" lead="Это тестовая страница магазина">
      <p>Тут представлены компоненты из которых будет формироваться пользовательский интерфейс для покупателя</p>
      <p>Эта страница является демонстрацией бизнес-логики, не готовый магазин.</p>
    </b-jumbotron>
    <b-container>
      <ListProducts/>
      <Cart />
      <DeliverySelect/>
    </b-container>
  </div>
</template>

<script>
import ListProducts from '../components/framework/Products/ListProducts.vue';
import Cart from '../components/framework/Cart/Cart.vue';
import DeliverySelect from "../components/framework/Delivery/Select.delivery";

export default {
  name: 'Store',
  components: {
    DeliverySelect,
    ListProducts,
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
