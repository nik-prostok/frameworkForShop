<template>
    <div class="mt-3 list-delivery-dash container">
        <b-row>
            <b-form-select v-model="selectedCity" class="mb-3">
                <option :value="null">Пожалуйста, выберите город</option>
                <option v-for="city in cities" :value="city">{{city.city}}</option>
            </b-form-select>
        </b-row>
        <b-row v-if="deliveryTypesForCity.length !== 0">
            <div v-for="delivery in deliveryTypesForCity"
                 :key="delivery._id"
                 class="m-1"
            >
                <delivery-item-dash
                        :deliveryType="delivery"/>
            </div>
        </b-row>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    import DeliveryItemDash from "./DeliveryItemDash.vue";

    export default {
        name: 'ListDeliveryDash',
        data() {
            return {
                selectedCity: null
            }
        },
        components: {DeliveryItemDash},
        computed: {
            ...mapState({
                cities: state => state.delivery.deliveryCities,
                deliveryTypes: state => state.delivery.deliveryTypes,
            }),
            deliveryTypesForCity() {
                if (this.selectedCity !== null){
                    return this.deliveryTypes.filter(type => {
                        if (type.city._id === this.selectedCity._id) {
                            return true;
                        }
                        return false;
                    })
                } else return this.deliveryTypes;

            }
        },
        mounted() {
            this.$store.dispatch('delivery/getAllCities');
            this.$store.dispatch('delivery/getAllDeliveryTypes');
        }
    };
</script>

<style scoped>

</style>
