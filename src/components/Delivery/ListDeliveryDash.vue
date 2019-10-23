<template>
    <div class="list-delivery-dash container">
        <b-row v-if="deliveryTypes.length !== 0">
            <div v-for="delivery in deliveryTypes"
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
            return {}
        },
        components: {DeliveryItemDash},
        computed: {
            ...mapState({
                deliveryTypes: state => state.delivery.deliveryTypes,
            }),
        },
        mounted() {
            this.$store.dispatch('delivery/getAllDeliveryTypes');
        }
    };
</script>

<style scoped>

</style>
