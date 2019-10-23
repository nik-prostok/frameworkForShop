<template>
    <div class="delivery-dashboard-view">
        <nav-bar/>
        <list-delivery-dash></list-delivery-dash>
    </div>
</template>

<script>
    import NavBar from "@/components/NavBar";
    import ListDeliveryDash from "@/components/Delivery/ListDeliveryDash";
    export default {
        name: "DashboardDeliveryView",
        components: {ListDeliveryDash, NavBar}
    }
</script>

<style scoped>

</style>
