<template>
  <div id="navbar">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-navbar-brand href="#">
        ShopSystem
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item>
            <router-link
              class="default-link dark"
              active-class="active"
              exact-active-class="exact-active"
              to="/dashboard/products"
            >
              Продукты
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="default-link dark"
              active-class="active"
              exact-active-class="exact-active"
              to="/dashboard/categories"
            >
              Категории
            </router-link>
          </b-nav-item>
          <b-nav-item-dropdown text="Доставка">
            <b-dropdown-item @click="routerPush('delivery')">
              <router-link
                class="dark"
                active-class="active dark"
                exact-active-class="exact-active dark"
                to="/dashboard/delivery"
              >
                Управление способами доставками
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item @click="routerPush('city')">
              <router-link
                class="dark"
                active-class="active dark"
                exact-active-class="exact-active dark"
                to="/dashboard/delivery"
              >
                Управление городами доставки
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div>
            <b-button
                    v-if="addProductButton"
                    variant="success"
                    class="m-2"
                    type="submit"
                    @click="setAddModeForProduct"
            >
              Добавить
            </b-button>
          </div>

          <div>
            <b-button
                    v-if="addDeliveryButton"
                    variant="success"
                    class="m-2"
                    type="submit"
                    @click="setAddModeForDelivery"
            >
              Добавить
            </b-button>
          </div>

          <div>
            <b-button
                    v-if="addCityButton"
                    variant="success"
                    class="m-2"
                    type="submit"
                    v-b-modal.modal-add-city
            >
              Добавить
            </b-button>

            <b-modal id="modal-add-city" title="Добавление города">
              <b-card>
                <b-row>
                  <b-form-group label="Новое название города">
                    <b-form-input v-model="nameNewCity"/>
                  </b-form-group>
                </b-row>
                <b-row>
                  <b-button variant="outline-success" @click="addNewCity">
                    Сохранить
                  </b-button>
                </b-row>
              </b-card>
            </b-modal>
          </div>

          <select-city class="mt-2" />

          <b-nav-item-dropdown
            text="Lang"
            right
          >
            <b-dropdown-item href="#">
              EN
            </b-dropdown-item>
            <b-dropdown-item href="#">
              ES
            </b-dropdown-item>
            <b-dropdown-item href="#">
              RU
            </b-dropdown-item>
            <b-dropdown-item href="#">
              FA
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import SelectCity from './Delivery/SelectCity';

export default {
  name: 'NavBar',
  components: { SelectCity },
  data() {
    return {
      nameNewCity: ''
    }
  },
  computed: {
    ...mapState({
      addProductButton: state => state.products.isShowAddButton,
      addDeliveryButton: state => state.delivery.isShowAddButton,
      addCityButton: state => state.delivery.isShowAddCityButton,
    }),
  },
  methods: {
    setAddModeForProduct() {
      this.$store.commit('products/setAddMode');
    },
    setAddModeForDelivery() {
      this.$store.commit('delivery/setAddMode');
    },
    routerPush(route) {
      this.$router.push(route);
    },
    addNewCity() {
      if (this.nameNewCity.length !== 0){
        this.$store.dispatch('delivery/addCity', this.nameNewCity);
      }
    }
  },
};
</script>

<style scoped>
    .dark {
        color: #000000;
    }

    .exact-active {
        color: gray;
    }

    .default-link {
        color: azure;
    }
</style>
