<template>
  <div class="delivery-item-dash">
    <b-card
      class="shadow"
    >
      <b-card-title>
        <div class="d-flex flex-row justify-content-between">
          <div>
            <h6>{{ deliveryType.nameDelivery }}</h6>
          </div>
          <div>
            <i
              class="material-icons"
              style="cursor: pointer;"
              @click="deleteDelivery()"
            >close</i>
            <i
              class="material-icons"
              style="cursor: pointer;"
              @click="editDelivery()"
            >edit</i>
          </div>
        </div>
      </b-card-title>
      <b-card-body>
        <b-row v-if="deliveryType.address !== ''">
          Адрес: {{ deliveryType.address }}
        </b-row>
        <b-row v-if="deliveryType.price !== ''">
          Стоимость: {{ deliveryType.price }}
        </b-row>
        <b-row v-if="deliveryType.underground !== []">
          {{ undergroundStr }}
        </b-row>
        <b-row v-if="deliveryType.timeDelivery !== ''">
          Время: {{ deliveryType.timeDelivery }}
        </b-row>
        <b-row v-if="deliveryType.openingHours !== ''">
          Часы работы: {{ deliveryType.openingHours }}
        </b-row>
        <b-row v-if="deliveryType.message !== ''">
          Доп. информация: {{ deliveryType.message }}
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'DeliveryItemDash',
  props: {
    deliveryType: {
      required: true,
      type: Object,
    },
  },
  computed: {
    undergroundStr() {
      let str = 'Ближайшие метро: ';
      this.deliveryType.underground.forEach((metro, index, arr) => {
        if (index < (arr.length - 1)) {
          str += `${metro}, `;
        } else {
          str += metro;
        }
      });
      return str;
    },
  },
  methods: {
    deleteDelivery() {
      this.$store.dispatch('delivery/deleteDeliveryById', this.deliveryType._id);
    },
    editDelivery() {
      this.$store.commit('delivery/setEditMode', { idEditDelivery: this.deliveryType._id });
    },
  },
};
</script>

<style scoped>
    .shadow:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Параметры тени */
    }
</style>
