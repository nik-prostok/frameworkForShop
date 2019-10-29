<template>
    <div class="list-city-dash">
        <b-table striped hover :items="upperCities" :fields="fields">
            <template v-slot:cell(upperCity)="data">
                <b class="text-info">{{ data.value }}</b>
            </template>
            <template v-slot:cell(action)="row">
                <div>
                    <i
                            class="material-icons"
                            style="cursor: pointer;"
                            @click="deleteCity(row.item._id)"
                    >close</i>
                    <i
                            class="material-icons"
                            style="cursor: pointer;"
                            @click="row.toggleDetails"
                    >edit</i>
                </div>
            </template>
            <template v-slot:row-details="row">
                <b-card>
                    <b-row>
                        <b-form-group label="Новое название города">
                            <b-form-input v-model="row.item.newNameCity"/>
                        </b-form-group>
                    </b-row>
                    <b-row>
                        <b-button variant="outline-success" @click="renameCity(row.item._id, row.item.newNameCity)">
                            Сохранить
                        </b-button>
                    </b-row>
                </b-card>
            </template>
        </b-table>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "ListCityDash",
        data() {
            return {
                fields: [
                    {key: 'upperCity', label: 'Город'},
                    {key: 'action', label: 'Действия'}
                ],
            }
        },
        mounted() {
            this.$store.dispatch('delivery/getAllCities');
            this.$store.commit('delivery/showAddCityButton');
        },
        beforeDestroy() {
            this.$store.commit('delivery/hideAddCityButton');
        },
        methods: {
            deleteCity(idCity) {
                this.$store.dispatch('delivery/deleteCity', { idCity })
            },
            renameCity(idCity, newName) {
                this.$store.dispatch('delivery/patchCity', { idCity, newName })
            }
        },
        computed: {
            ...mapState({
                cities: state => state.delivery.deliveryCities,
                selectedCity: state => state.delivery.selectedCity,
            }),
            upperCities() {
                return this.cities.map(city => {
                    return {
                        ...city,
                        upperCity: city.city.toUpperCase()
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
