<template>
    <div class="list-categories">
        <b-table striped hover :items="categories" :fields="fields">
            <template v-slot:cell(title)="data">
                <b class="text-info">{{ data.value }}</b>
            </template>
            <template v-slot:cell(parentCategory)="data">
                <b class="text-secondary">{{ data.value.title }}</b>
            </template>
            <template v-slot:cell(action)="row">
                <div>
                    <i
                            class="material-icons"
                            style="cursor: pointer;"
                            @click="deleteCategory(row.item._id)"
                    >close</i>
                    <i
                            class="material-icons"
                            style="cursor: pointer;"
                            @click="row.toggleDetails"
                    >edit</i>
                </div>
            </template>
            <template v-slot:row-details="row">
                    <add-category :id-edit-category="row.item._id" :edit-mode="true" />
            </template>
        </b-table>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import AddCategory from "./AddCategory";
    import {deepCopy} from '../../util.js'

    export default {
        name: "ListCategories",
        components: {AddCategory},
        data() {
            return {
                fields: [
                    {key: 'title', label: 'Название'},
                    {key: 'parentCategory', label: 'Родительская категория'},
                    {key: 'action', label: 'Действия'}
                ],
                categories: [],
            }
        },
        computed: {
            ...mapState({
                categoriesWithoutNewCat: state => state.categories.categoriesWithoutNewCat,
            }),
        },
        watch: {
            categoriesWithoutNewCat(newCategories){
                this.categories.forEach((category, index) => {
                    if (category.hasOwnProperty('_showDetails')) {
                        if (category._showDetails === true){
                            newCategories[index]._showDetails = true;
                        }
                    }

                })
                this.categories = deepCopy(newCategories);
            }
        },
        mounted() {
            this.$store.dispatch('categories/getCategoriesWithoutNewCat')
                .then(() => {
                    this.categories = deepCopy(this.categoriesWithoutNewCat);
                })
        },
    }
</script>

<style scoped>

</style>
