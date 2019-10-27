<template>
    <div class="mt-3 list-delivery-dash container">
        <select-city/>
        <b-container>
            <b-row v-if="deliveryTypesForCity.length !== 0">
                <div v-for="delivery in deliveryTypesForCity"
                     :key="delivery._id"
                     class="m-1"
                >
                    <delivery-item-dash
                            :deliveryType="delivery"/>
                </div>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    import DeliveryItemDash from "./DeliveryItemDash.vue";
    import SelectCity from "./SelectCity";

    export default {
        name: 'ListDeliveryDash',
        data() {
            return {}
        },
        components: {SelectCity, DeliveryItemDash},
        computed: {
            ...mapState({
                cities: state => state.delivery.deliveryCities,
                deliveryTypes: state => state.delivery.deliveryTypes,
                selectedCity: state => state.delivery.selectedCity,
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
            this.$store.commit('delivery/showAddButton')
        },
        beforeDestroy() {
            this.$store.commit('delivery/hideAddButton')
        },
    };
</script>

<style scoped>

</style>
