<template>
  <div class="add-product container">
    <h1>Добавление товара</h1>
    <b-form
      @submit="submitNewProduct"
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
            v-model="newProduct.title"
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
            v-model="newProduct.description"
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
            v-model="newProduct.category"
            value-field="_id"
            text-field="title"
            :options="categories"
            required
          />
        </b-form-group>
      </b-card>

      <b-card
        class="mt-4"
        bg-variant="light"
      >
        <h4>Физические параметры</h4>

        <b-form-group>
          <upload-file @uploadFiles="onUpload"/>
        </b-form-group>

        <b-form-group label="Цвет">
          <b-form-radio-group
            id="radio-group-color"
            v-model="newProduct.color"
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
              v-model="newProduct.weight"
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
              v-model="newProduct.width"
              type="text"
              placeholder="Введите ширину товара"
            />
            <b-form-input
              id="height-input"
              v-model="newProduct.height"
              type="text"
              placeholder="Введите высоту товара"
            />
            <b-form-input
              id="length-input"
              v-model="newProduct.length"
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
              v-model="newProduct.price"
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
            v-model="newProduct.rating"
            :star-size="30"
          />
        </b-form-group>

        <b-form-group
          id="keywords-group"
          label="Ключевые слова"
          label-for="keywords-input"
        >
          <b-input-group
            v-for="(keyword, index) in newProduct.keywords"
            :key="index"
          >
            <b-form-input
              id="keywords-input"
              v-model="newProduct.keywords[index]"
              type="text"
              placeholder="Введите ключевые слова"
            />
            <b-input-group-append
              v-if="(index + 1) === newProduct.keywords.length"
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
              v-model="newProduct.availableQuantity"
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
              v-model="newProduct.sold"
              type="number"
              placeholder="Введите проданное количество товара на данный момент"
            />
          </b-input-group>
        </b-form-group>
      </b-card>

      <b-button
        variant="success"
        class="m-1"
        @click="submitNewProduct"
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
import UploadFile from '../UploadFile.vue';
import StarRating from '../Rating/star-rating.vue';

export default {
  name: 'AddProduct',
  components: {
    'upload-file': UploadFile,
    'star-rating': StarRating,
  },
  props: {
    categories: Array,
    colors: Array,
  },
  data() {
    return {
      newProduct: {
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
    };
  },
  methods: {
    onUpload(fileNames) {
      console.log(fileNames);
      this.newProduct.images = fileNames;
    },
    submitNewProduct() {
      this.$store.dispatch('saveProduct', this.newProduct);
    },
    onReset() {
      this.newProduct = {
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
      this.newProduct.keywords.push('');
    },
    deleteFieldForKeyword(index) {
      this.newProduct.keywords.splice(index, 1);
    },
  },
};
</script>
