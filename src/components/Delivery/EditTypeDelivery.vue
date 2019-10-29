<template>
  <div class="edit-type-delivery container">
    <h5 class="container">
      <font-awesome-icon
        icon="arrow-left"
        style="font-size: 1.5rem; cursor: pointer;"
        @click="$store.commit('delivery/setDefaultMode')"
      />
      Редактировать доставку
    </h5>
    <b-card class="shadow">
      <b-form>
        <b-form-group
          label-for="name-delivery"
          label="Название доставки"
          description="Например курьер или самовывоз"
        >
          <b-form-input
            id="name-delivery"
            v-model="deliveryType.nameDelivery"
            type="text"
            required
            placeholder="Введите название типа доставки"
          />
        </b-form-group>
        <b-form-group
          label-for="address"
          label="Адрес"
          description="Введите адрес, если требуется"
        >
          <b-form-input
            id="address"
            v-model="deliveryType.address"
            type="text"
            placeholder="Например: Ул. Пушкина, д1"
          />
        </b-form-group>
        <b-form-group
          label-for="price"
          label="Стоимость доставки"
        >
          <b-form-input
            id="price"
            v-model="deliveryType.price"
            type="text"
            placeholder="Введите стоимость, если требуется"
          />
        </b-form-group>
        <b-form-group
          label-for="opening-hours"
          label="Часы работы пункта выдачи"
        >
          <b-form-input
            id="opening-hours"
            v-model="deliveryType.openingHours"
            type="text"
            placeholder="Введите часы работы, если требуется"
          />
        </b-form-group>
        <b-form-group
          label-for="time-delivery"
          label="Срок доставки"
        >
          <b-form-input
            id="time-delivery"
            v-model="deliveryType.timeDelivery"
            type="text"
            placeholder="Введите срок доставки"
          />
        </b-form-group>
        <b-form-group
          label-for="message"
          label="Дополнительная информация"
        >
          <b-form-input
            id="message"
            v-model="deliveryType.message"
            type="text"
            placeholder="Введите дполнительную информацию"
          />
        </b-form-group>
        <b-form-group
          id="metro-group"
          label="Ближайшее метро"
          label-for="metro-input"
        >
          <b-input-group
            v-for="(keyword, index) in deliveryType.underground"
            :key="index"
          >
            <b-form-input
              id="metro-input"
              v-model="deliveryType.underground[index]"
              type="text"
              placeholder="Введите ближайшие станции метро"
            />
            <b-input-group-append
              v-if="(index + 1) === deliveryType.underground.length"
              class="mb-2"
            >
              <b-button
                variant="outline-success"
                @click="addFieldForKeyword"
              >
                +
              </b-button>
            </b-input-group-append>
            <b-input-group-append
              v-else
              class="mb-2"
            >
              <b-button
                variant="outline-danger"
                @click="deleteFieldForKeyword(index)"
              >
                -
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <select-city />
        <hr>
        <b-button
          variant="success"
          class="m-1"
          @click="submitNewDeliveryType"
        >
          Сохранить
        </b-button>
        <b-button
          type="reset"
          variant="danger"
          class="m-1"
          @click="onReset"
        >
          Сбросить
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SelectCity from './SelectCity';
import { deepCopy } from '../../util';

export default {
  name: 'EditTypeDelivery',
  components: { SelectCity },
  data() {
    return {
      deliveryType: {
        underground: [''],
        idTypeDelivery: 1,
        nameDelivery: '',
        city: null,
        address: '',
        price: 0,
        openingHours: '',
        timeDelivery: '',
        message: '',
      },
    };
  },
  mounted() {
    this.deliveryType = deepCopy(this.currentEditDelivery);
    this.$store.commit('delivery/selectCity', this.deliveryType.city);
  },
  methods: {
    addFieldForKeyword() {
      this.deliveryType.underground.push('');
    },
    deleteFieldForKeyword(index) {
      this.deliveryType.underground.splice(index, 1);
    },
    onReset() {
      this.deliveryType = {
        underground: [''],
        idTypeDelivery: 1,
        nameDelivery: '',
        city: null,
        address: '',
        price: 0,
        openingHours: '',
        timeDelivery: '',
        message: '',
      };
    },
    makeToast(text, title, variant = null) {
      this.$bvToast.toast(text, {
        title,
        autoHideDelay: 5000,
        variant,
      });
    },
    submitNewDeliveryType() {
      this.deliveryType.city = this.$store.state.delivery.selectedCity.city;
      this.$store.dispatch('delivery/patchDelivery', { deliveryType: this.deliveryType })
        .then(() => {
          this.$store.dispatch('delivery/getAllCities');
          this.makeToast('Доставка была успешно обновлена', 'Успешно', 'success');
        })
        .catch((err) => {
          console.log(err);
          this.makeToast('Произошла ошибка во время выполнения операции', 'Ошибка', 'danger');
        });
    },
  },
  computed: {
    ...mapState({
      currentEditDelivery: state => state.delivery.currentEditDelivery,
    }),
  },
};
</script>

<style scoped>

</style>
