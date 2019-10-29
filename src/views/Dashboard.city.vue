<template>
    <div class="dashboard-city">
        <nav-bar/>
        <div class="content">
            <list-city-dash/>
        </div>
    </div>
</template>

<script>
    import ListCityDash from "../components/Delivery/ListCityDash";
    import NavBar from "../components/NavBar";

    export default {
        name: 'DashboardCity',
        components: {NavBar, ListCityDash},
    };
</script>

<style scoped>

</style>
