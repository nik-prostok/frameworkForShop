<template>
    <div
            id="not-found-page"
    >
        <NavBar/>
        <b-row style="text-align: center" class="mt-3">
            <b-container style="text-align: center">
                <h3>Page not found</h3>
            </b-container>
        </b-row>
        <b-row align-h="center">
            <b-container style="text-align: center">
                <b-img
                        src="https://cdn.dribbble.com/users/252114/screenshots/3840347/mong03b.gif"
                        alt="cat_not_found"
                        width="400"
                        height="auto"
                ></b-img>
            </b-container>
        </b-row>
    </div>
</template>

<script>
    import NavBar from "./NavBar";

    export default {
        name: 'NotFoundPage',
        components: {NavBar},
    };
</script>

<style scoped>

</style>
