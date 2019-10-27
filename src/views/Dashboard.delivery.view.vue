<template>
    <div class="delivery-dashboard-view">
        <nav-bar/>
        <div class="content">
            <b-row>
                <b-col>
                    <b-row>
                        <h5>Способы доставки</h5>
                    </b-row>
                    <b-row>
                        <list-delivery-dash/>
                    </b-row>
                </b-col>
                <b-col v-if="showAddDelivery">
                    <b-row class="m-3">
                        <add-type-delivery/>
                    </b-row>
                </b-col>
                <b-col v-if="showEditDelivery">
                    <b-row class="m-3">
                        <h6>
                            <font-awesome-icon
                                    icon="arrow-left"
                                    style="font-size: 1.5rem; cursor: pointer;"
                                    @click="$store.commit('delivery/setDefaultMode')"
                            />
                            Редактировать товар
                        </h6>
                    </b-row>
                    <b-row class="m-3">
                        Редактор
                    </b-row>
                </b-col>
            </b-row>
        </div>

    </div>
</template>

<script>
    import NavBar from "@/components/NavBar";
    import ListDeliveryDash from "@/components/Delivery/ListDeliveryDash";
    import {mapState} from "vuex";
    import AddTypeDelivery from "../components/Delivery/AddTypeDelivery";

    export default {
        name: "DashboardDeliveryView",
        components: {AddTypeDelivery, ListDeliveryDash, NavBar},
        computed: {
            ...mapState({
                showAddDelivery: state => state.delivery.showAddDelivery,
                showEditDelivery: state => state.delivery.showEditDelivery,
            }),
        },
    }
</script>

<style scoped>

</style>
