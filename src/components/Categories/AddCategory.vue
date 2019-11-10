<template>
    <div class="add-category">
        <b-form
                @submit="submitNewCategory"
                @reset="onReset"
        >
            <b-card
                    class="mb-4"
                    bg-variant="light"
            >
                <h5 v-if="editMode">Редактировании категории</h5>
                <h5 v-else>Добавление категории</h5>
                <b-form-group
                        id="title-group"
                        label="Название"
                        label-for="title-input"
                >
                    <b-form-input
                            id="title-input"
                            v-model="newCategory.title"
                            type="text"
                            required
                            placeholder="Введите название категории"
                    />
                </b-form-group>

                <b-form-group
                        id="input-group-3"
                        label="Родительская категория:"
                        label-for="input-3"
                        v-if="!(newCategory.title === 'Главная')"
                >
                    <b-form-select
                            id="input-3"
                            v-model="newCategory.parentCategory._id"
                            value-field="_id"
                            text-field="title"
                            :options="categoriesWithoutNewCat"
                            required
                    />
                </b-form-group>

                <b-button
                        v-if="!editMode"
                        variant="success"
                        class="m-1"
                        @click="submitNewCategory"
                >
                    Сохранить
                </b-button>
                <b-button
                        v-else
                        variant="secondary"
                        class="m-1"
                        @click="updateCategory"
                >
                    Сохранить
                </b-button>
                <b-button
                        type="reset"
                        variant="danger"
                        class="m-1"
                >
                    Сбросить
                </b-button>
            </b-card>
        </b-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {deepCopy} from "../../util";

    export default {
        name: 'AddCategory',
        props: {
            onSuccessAdd: {
                type: Function,
                default: () => null,
            },
            editMode: {
                type: Boolean,
                default: false,
            },
            idEditCategory: {
                type: String,
            },
        },
        data() {
            return {
                newCategory: {
                    title: '',
                    parentCategory: {
                        _id: '5d40262bf7499327a4fdb0a1'
                    }
                },
                categories: [],
            };
        },
        computed: {
            ...mapState({
                categoriesWithoutNewCat: state => state.categories.categoriesWithoutNewCat,
            }),
        },
        mounted() {
            this.$store.dispatch('categories/getCategoriesWithoutNewCat');
            this.categories = deepCopy(this.categoriesWithoutNewCat);
            this.categories.forEach(cat => {
                if (cat._id === this.idEditCategory) {
                    this.newCategory = cat;
                }
            })
            console.log(this.newCategory)
        },
        methods: {
            submitNewCategory() {
                this.$store.dispatch('categories/saveCategory', this.newCategory)
                    .then(() => {
                        this.$store.dispatch('categories/getCategoriesWithoutNewCat')
                            .then(() => {
                                // eslint-disable-next-line no-underscore-dangle
                                const lastIdProduct = this.categoriesWithoutNewCat.filter((cat) => {
                                    if (cat.title === this.newCategory.title) {
                                        return true;
                                    }
                                    return false;
                                })[0]._id;
                                console.log(lastIdProduct);
                                this.onSuccessAdd(lastIdProduct);
                                this.makeToast('Категория была успешно создана', 'Успешно', 'success');
                            });
                    })
                    .catch(() => {
                        this.makeToast('Произошла ошибка во время выполнения операции', 'Ошибка', 'danger');
                    });
            },
            updateCategory() {
                let category = deepCopy(this.newCategory);
                category.parentCategory = category.parentCategory._id;
                delete category['_showDetails'];
                this.$store.dispatch('categories/updateCategory', { id: this.idEditCategory, category: category })
                    .then(() => {
                        this.makeToast('Категория была успешно обновлена', 'Успешно', 'success');
                    })
            },
            makeToast(text, title, variant = null) {
                this.$bvToast.toast(text, {
                    title,
                    autoHideDelay: 5000,
                    variant,
                });
            },
            onReset() {
                this.newCategory = {
                    title: '',
                    parentCategory: '',
                };
            },
        },
    };
</script>
