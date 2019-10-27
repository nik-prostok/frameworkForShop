<template>
    <div class="select-city">
        <b-row>
            <b-container>
                <b-form-select v-model="selectedCity" class="mb-3">
                    <option :value="null">Пожалуйста, выберите город</option>
                    <option v-for="city in cities" :value="city">{{city.city}}</option>
                </b-form-select>
            </b-container>
        </b-row>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'SelectCity',
        computed: {
            ...mapState({
                cities: state => state.delivery.deliveryCities,
            }),
            selectedCity: {
                get(){
                    return this.$store.state.delivery.selectedCity;
                },
                set(value){
                    this.$store.commit('delivery/selectCity', value)
                }
            }
        }
    }
</script>
