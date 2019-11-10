<template>
    <div class="dashboard-city">
        <nav-bar/>
        <b-container>
            <list-city-dash/>
        </b-container>
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
