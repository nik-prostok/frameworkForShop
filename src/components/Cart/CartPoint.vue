<template>
  <div
    id="cart-point"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  >
    <b-row
      no-gutters
      class="mt-2 mb-2 p-2"
    >
      <b-col
        cols="6"
        sm="4"
        md="3"
        lg="2"
        xl="2"
      >
        <img
          style="width: 150px; height: auto"
          :src="images[0]"
          alt=""
        >
      </b-col>
      <b-col
        cols="6"
        sm="8"
        md="9"
        lg="10"
        xl="10"
      >
        <b-row
          class="mt-2"
          no-gutters
        >
          <b-col
            cols="4"
            md="7"
            sm="7"
            lg="2"
            xl="2"
          >
            <p style="font-family: Roboto; text-align: start;">
              {{ itemTitle }}
            </p>
          </b-col>
          <b-col
            cols="2"
            sm="1"
            class="mr-1"
            lg="1"
            xl="2"
            offset-lg="6"
            offset-xl="5"
          >
            <p style="text-align: center; font-family: Roboto;">
              {{ count }} шт.
            </p>
          </b-col>
          <b-col
            cols="2"
            sm="2"
            lg="2"
            xl="2"
            class="ml-4"
          >
            <p style="text-align: end; font-family: Roboto;">
              {{ price * count }} {{ currency }}
            </p>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col cols="7">
            <b-row
              v-show="available <= 5"
              no-gutters
            >
              <b-col
                cols="8"
                md="3"
                style="font-family: Roboto; font-size: 13px;"
              >
                Осталось: <a class="text-danger">{{ available }} шт.</a>
              </b-col>
            </b-row>

            <!-- Сюда вывести дополнительные кастомные поля -->
          </b-col>
        </b-row>
        <div class="position-bottom-right">
          <p
            v-show="showIcon"
            style="cursor: pointer; font-family: Roboto; color: #5983f0;"
          >
            <font-awesome-icon icon="trash" />
            Удалить
          </p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    itemTitle: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showIcon: false,
    };
  },
  methods: {
    mouseover() {
      this.showIcon = true;
    },
    mouseleave() {
      this.showIcon = false;
    },
  },
};
</script>

<style scoped>
    .position-bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .position-bottom {
        position: absolute;
        bottom: 0;
    }
</style>
