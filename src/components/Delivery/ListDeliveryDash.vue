<template>
  <div class="mt-3 list-delivery-dash container">
    <b-container>
      <b-row v-if="deliveryTypesForCity.length !== 0">
        <div
          v-for="delivery in deliveryTypesForCity"
          :key="delivery._id"
          class="m-1"
        >
          <delivery-item-dash
            :delivery-type="delivery"
          />
        </div>
      </b-row>
      <b-row
        v-else
        class="d-flex justify-content-center"
      >
        <h5>Нет доступных способов доставки для заданного города.</h5>
        <p>
          Чтобы добавить новый способ доставки, выберите город
        </p>
        <select-city class="ml-2" />
        <p class="mt-2">
          и нажмите кнопку добавить:
        </p>
        <b-button
          variant="success"
          class="m-2"
          type="submit"
          @click="setAddModeForDelivery"
        >
          Добавить
        </b-button>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState } from 'vuex';

import DeliveryItemDash from './DeliveryItemDash.vue';
import SelectCity from './SelectCity';

export default {
  name: 'ListDeliveryDash',
  components: { SelectCity, DeliveryItemDash },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      cities: state => state.delivery.deliveryCities,
      deliveryTypes: state => state.delivery.deliveryTypes,
      selectedCity: state => state.delivery.selectedCity,
    }),
    deliveryTypesForCity() {
      if (this.selectedCity !== null) {
        return this.deliveryTypes.filter((type) => {
          if (type.city._id === this.selectedCity._id) {
            return true;
          }
          return false;
        });
      } return this.deliveryTypes;
    },
  },
  mounted() {
    this.$store.dispatch('delivery/getAllCities');
    this.$store.dispatch('delivery/getAllDeliveryTypes');
    this.$store.commit('delivery/showAddButton');
  },
  beforeDestroy() {
    this.$store.commit('delivery/hideAddButton');
  },
  methods: {
    setAddModeForDelivery() {
      this.$store.commit('delivery/setAddMode');
    },
  },
};
</script>

<style scoped>

</style>
