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
        <h5>Добавление категории</h5>
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
        >
          <b-form-select
            id="input-3"
            v-model="newCategory.parentCategory"
            value-field="_id"
            text-field="title"
            :options="categoriesWithoutNewCat"
            required
          />
        </b-form-group>

        <b-button
          variant="success"
          class="m-1"
          @click="submitNewCategory"
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
import { mapState } from 'vuex';

export default {
  name: 'AddCategory',
  props: {
    onSuccessAdd: {
      type: Function,
      default: () => null,
    },
  },
  data() {
    return {
      newCategory: {
        title: '',
        parentCategory: '5d40262bf7499327a4fdb0a1',
      },
    };
  },
  computed: {
    ...mapState({
      categoriesWithoutNewCat: state => state.categories.categoriesWithoutNewCat,
    }),
  },
  mounted() {
    this.$store.dispatch('categories/getCategoriesWithoutNewCat');
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
        .catch(() => { this.makeToast('Произошла ошибка во время выполнения операции', 'Ошибка', 'danger'); });
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
        parentCategory: '5d40262bf7499327a4fdb0a1',
      };
    },
  },
};
</script>
