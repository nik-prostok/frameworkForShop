<template>
    <div class="ml-2 mr-2 delivery-select">
        <b-row>
            <b-col cols="4">
                <h3 style="font-family: Roboto;">
                    Выбор доставки
                </h3>
            </b-col>
            <b-col
                    v-if="selectedCity !== null"
                    style="font-family: Roboto; text-align: center;"
                    cols="5"
                    offset="3"
            >
                <SelectCity/>
            </b-col>
        </b-row>
        <hr>

        <b-row v-if="selectedCity !== null">
            <h6 style="font-family: Roboto; font-weight: lighter;">Кликните по карточке, чтобы продолжить:</h6>
            <list-delivery/>
        </b-row>
        <b-row class="d-flex justify-content-center" v-else>
            <h5>Пожалуйста, выберите город: </h5>
            <SelectCity/>
        </b-row>
    </div>
</template>

<script>
    import SelectCity from "./Select.city";
    import ListDelivery from "./List.delivery";
    import {mapState} from "vuex";

    export default {
        name: "DeliverySelect",
        components: {ListDelivery, SelectCity},
        mounted() {
            this.$store.dispatch('delivery/getAllCities');
            this.$store.dispatch('delivery/getAllDeliveryTypes')
        },
        data() {
            return {}
        },
        computed: {
            ...mapState({
                selectedCity: state => state.delivery.selectedCity,
            }),
        }
    }
</script>

<style scoped>
    .delivery-select {
        min-width: 768px;
    }

    div.card-body {
        margin: 0px;
        padding: 0px;
    }

    .cart-box {
        padding: 0px;
        transition: box-shadow .3s;
        border-radius: 10px;
        border: 1px solid #ccc;
        background: #fff;

    }

    .cart-box:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, .2);
    }
</style>
