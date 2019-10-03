<template>
    <div id="cart" class="m-1">
        <b-row>
          <b-col cols="7">
            <h3>Моя корзина</h3>
          </b-col>
          <b-col cols="3">
            Количество
          </b-col>
          <b-col cols="2">
            Количество
          </b-col>
        </b-row>
        <hr>
        <b-row
                v-for="item in cart">
            <b-col>
                <CartPoint
                        :key="item._id"
                        :itemTitle="item.product.title"
                        :images="imagesURL(item.product.images)"
                        :count="item.count"
                        :currency="item.product.currency"
                        :price="item.product.price"
                        :available="item.product.availableQuantity"
                />
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex';

    import CartPoint from './CartPoint.vue';
    import config from '../../../config';

    export default {
        name: 'Cart',
        components: {
            CartPoint,
        },
        data() {
            return {};
        },
        computed: {
            ...mapGetters('cart', {
                cart: 'cartProducts',
            }),
        },
        mounted() {
            this.$store.dispatch('cart/getCart', '5ce08aed5e1d84270cef4e04');
        },
        methods: {
            imagesURL(images) {
                console.log(images);
                return images.map(image => `${config.image}/${image}`);
            },
        },
    };
</script>
