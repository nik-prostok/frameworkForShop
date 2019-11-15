<template>
    <div class="mt-3 list-delivery container">
        <b-container>
            <b-row v-if="deliveryTypesForCity.length !== 0">
                <delivery-item
                        style="cursor: pointer;"
                        v-for="delivery in deliveryTypesForCity"
                        :delivery-type="delivery"
                        :key="delivery._id"
                        :on-click-item="setDeliveryType"
                >
                    <b-form-checkbox
                            v-model="selectedTypeDelivery"
                            :value="delivery"
                            size="lg"
                            style="cursor: pointer;"
                    />
                </delivery-item>
            </b-row>
            <b-row
                    v-else
                    class="d-flex justify-content-center"
            >
                <h5>К сожалению нет доступных способов доставки для заданного города.</h5>
            </b-row>
        </b-container>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    import DeliveryItem from './Item.delivery.vue';
    import SelectCity from './Select.city';
    import MaterialCheckbox from "../../MaterialCheckbox";

    export default {
        name: 'ListDelivery',
        components: {MaterialCheckbox, SelectCity, DeliveryItem},
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
                }
                return this.deliveryTypes;
            },
            selectedTypeDelivery: {
                get() {
                    return this.$store.state.delivery.selectedTypeDelivery;
                },
                set(deliveryType) {
                    this.$store.commit('delivery/setTypeDelivery', deliveryType);
                }
            },
        },
        mounted() {
            this.$store.dispatch('delivery/getAllCities');
            this.$store.dispatch('delivery/getAllDeliveryTypes');
            // this.$store.commit('delivery/setTypeDelivery', { deliveryType: this.deliveryTypes[0] })
        },
        methods: {
            setDeliveryType(deliveryType) {
                console.log(deliveryType)
                this.$store.commit('delivery/setTypeDelivery', deliveryType);
            }
        },
    };
</script>

<style scoped>

</style>
