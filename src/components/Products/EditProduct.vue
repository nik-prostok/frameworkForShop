<template>
  <div class="edit-product">
    <b-form
      @submit="onSave(editProduct)"
      @reset="onReset"
    >
      <b-card
        class="mb-4"
        bg-variant="light"
      >
        <h4>Общая информация</h4>
        <b-form-group
          id="title-group"
          label="Название"
          label-for="title-input"
        >
          <b-form-input
            id="title-input"
            v-model="editProduct.title"
            type="text"
            required
            placeholder="Введите название товара"
          />
        </b-form-group>

        <b-form-group
          id="description-group"
          label="Описание"
          label-for="description-input"
        >
          <b-form-input
            id="description-input"
            v-model="editProduct.description"
            type="text"
            required
            placeholder="Введите описание товара"
          />
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Категория:"
          label-for="input-3"
        >
          <b-form-select
            id="input-3"
            v-model="editProduct.category"
            value-field="_id"
            text-field="title"
            :options="categories"
            required
          />
        </b-form-group>
      </b-card>

      <add-category
        v-if="editProduct.category === '5d234d601c9d440000a97891'"
        :on-success-add="addCategory"
      />

      <b-card
        class="mt-4"
        bg-variant="light"
      >
        <h4>Физические параметры</h4>

        <b-form-group class="mb-0">
          <upload-file @uploadFiles="onUpload" />
        </b-form-group>

        <b-form-group>
          <div class="container">
            <div
              v-for="(name, index) in editProduct.images"
              :key="name"
              class="container row"
            >
              <div
                v-if="name !== ''"
                class="col-1"
              >
                <i
                  class="material-icons"
                  style="cursor: pointer;"
                  @click="deleteFile(index)"
                >close</i>
              </div>
              <div
                v-if="name.length < 10"
                class="col-4"
              >
                {{ name }}
              </div>
              <div
                v-else
                class="col-4"
              >
                {{ name.slice(0, 10) }}...
              </div>
            </div>
          </div>
        </b-form-group>

        <b-form-group label="Цвет">
          <b-form-radio-group
            id="radio-group-color"
            v-model="editProduct.color"
            :options="colors"
            name="radio-colors"
          />
        </b-form-group>
        <b-form-group
          id="weight-group"
          label="Вес"
          label-for="weight-input"
        >
          <b-input-group append="гр.">
            <b-form-input
              id="weight-input"
              v-model="editProduct.weight"
              type="text"
              placeholder="Введите вес товара"
            />
          </b-input-group>
        </b-form-group>
        <b-form-group
          id="size-group"
          label="Размеры"
          label-for="size-input"
        >
          <b-input-group>
            <b-form-input
              id="width-input"
              v-model="editProduct.width"
              type="text"
              placeholder="Введите ширину товара"
            />
            <b-form-input
              id="height-input"
              v-model="editProduct.height"
              type="text"
              placeholder="Введите высоту товара"
            />
            <b-form-input
              id="length-input"
              v-model="editProduct.length"
              type="text"
              placeholder="Введите длину товара"
            />
          </b-input-group>
        </b-form-group>
      </b-card>

      <b-card
        class="mt-4"
        bg-variant="light"
      >
        <h4>Маркетинг и склад</h4>
        <b-form-group
          id="price-group"
          label="Цена"
          label-for="price-input"
        >
          <b-input-group
            prepend="$"
            append=".00"
          >
            <b-form-input
              id="price-input"
              v-model="editProduct.price"
              type="number"
              required
              placeholder="Введите цену товара"
            />
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="rating-group"
          label="Базовый рейтинг"
          label-for="rating-input"
        >
          <star-rating
            id="rating-input"
            v-model="editProduct.rating"
            :star-size="30"
          />
        </b-form-group>

        <b-form-group
          id="keywords-group"
          label="Ключевые слова"
          label-for="keywords-input"
        >
          <b-input-group
            v-for="(keyword, index) in editProduct.keywords"
            :key="index"
          >
            <b-form-input
              id="keywords-input"
              v-model="editProduct.keywords[index]"
              type="text"
              placeholder="Введите ключевые слова"
            />
            <b-input-group-append
              v-if="(index + 1) === editProduct.keywords.length"
              class="mb-2"
            >
              <b-button
                variant="outline-success"
                @click="addFieldForKeyword"
              >
                +
              </b-button>
            </b-input-group-append>
            <b-input-group-append
              v-else
              class="mb-2"
            >
              <b-button
                variant="outline-danger"
                @click="deleteFieldForKeyword(index)"
              >
                -
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="availableQuantity-group"
          label="Доступное количество"
          label-for="availableQuantity-input"
        >
          <b-input-group>
            <b-form-input
              id="availableQuantity-input"
              v-model="editProduct.availableQuantity"
              type="number"
              required
              placeholder="Введите доступное количество товара"
            />
          </b-input-group>
        </b-form-group>

        <b-form-group
          id="sold-group"
          label="Уже продано"
          label-for="sold-input"
        >
          <b-input-group>
            <b-form-input
              id="sold-input"
              v-model="editProduct.sold"
              type="number"
              placeholder="Введите проданное количество товара на данный момент"
            />
          </b-input-group>
        </b-form-group>
      </b-card>

      <b-button
        variant="success"
        class="m-1"
        @click="onEdit(editProduct)"
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
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UploadFile from '../UploadFile.vue';
import StarRating from '../Rating/star-rating.vue';
import AddCategory from '../Categories/AddCategory.vue';
import { deepCopy } from '../../util';

export default {
  name: 'EditProduct',
  components: {
    UploadFile,
    StarRating,
    AddCategory,
  },
  props: {
    colors: Array,
  },
  data() {
    return {
      editProduct: {
        title: '',
        description: '',
        price: 0,
        rating: 0,
        category: '',
        availableQuantity: 0,
        keywords: [''],
        images: [],
        color: '',
      },
      uploadedFile: [],
    };
  },
  watch: {
    editProductCurrent(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      this.editProduct = deepCopy(this.editProductCurrent);
    },
  },
  mounted() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.commit('products/setEditProduct');
    this.editProduct = deepCopy(this.editProductCurrent);
  },
  computed: {
    ...mapState({
      editProductCurrent: state => state.products.currentEditProduct,
      idEditProduct: state => state.products.idEditProduct,
      categories: state => state.categories.categories,
    }),
  },
  methods: {
    deleteFile(index) {
      this.editProduct.images.forEach((imageURL, indexInArr, arrayImage) => {
        if (indexInArr === index) {
          arrayImage.splice(indexInArr, 1);
        }
      });
    },
    addCategory(idCategory) {
      this.$store.dispatch('categories/getAllCategories')
        .then(() => {
          this.editProduct.category = idCategory;
        });
    },
    onUpload(fileNames) {
      console.log(fileNames);
      this.uploadedFile = fileNames;
    },
    onEdit() {
      this.uploadedFile.forEach((file) => {
        this.editProduct.images.push(file);
      });
      this.uploadedFile = [];
      // eslint-disable-next-line no-underscore-dangle
      // console.log(this.idEditProduct);
      this.$store.dispatch('products/saveEditProduct', { editProduct: this.editProduct, idProduct: this.idEditProduct })
        .then(() => {
          this.$store.dispatch('products/getAllProducts');
          this.makeToast('Продукт был успешно обновлен', 'Успешно', 'success');
        })
        .catch((error) => {
          console.error(error);
          this.makeToast('Произошла ошибка во время выполнения операции', 'Ошибка', 'danger');
        });
    },
    makeToast(text, title, variant = null) {
      this.$bvToast.toast(text, {
        title,
        autoHideDelay: 5000,
        variant,
      });
    },
    onReset() {
      this.editProduct = {
        title: '',
        description: '',
        price: 0,
        rating: 0,
        category: '',
        availableQuantity: 0,
        keywords: [''],
        images: [],
        color: '',
      };
    },
    addFieldForKeyword() {
      this.editProduct.keywords.push('');
    },
    deleteFieldForKeyword(index) {
      this.editProduct.keywords.splice(index, 1);
    },
  },
};
</script>
