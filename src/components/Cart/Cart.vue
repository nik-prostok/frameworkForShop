<template>
    <div
            id="cart"
            class="ml-2 mr-2 cart"
    >
        <b-row>
            <b-col cols="3">
                <h3 style="font-family: Roboto;">
                    Моя корзина
                </h3>
            </b-col>
            <b-col
                    class="d-none d-sm-block"
                    cols="2"
                    offset="4"
                    style="font-family: Roboto; text-align: center"
            >
                Количество
            </b-col>
            <b-col
                    style="font-family: Roboto; text-align: center"
                    cols="1"
                    offset="2"
            >
                <p style="font-family: Roboto;">
                    Цена
                </p>
            </b-col>
        </b-row>
        <hr>
        <b-row
                v-for="item in cart"
                :key="item.product._id"
                no-gutters
        >
            <b-col>
                <b-card class="cart-box mb-3">
                    <CartPoint
                            :id="item.product._id"
                            :item-title="item.product.title"
                            :images="imagesURL(item.product.images)"
                            :count="item.count"
                            :currency="item.product.currency"
                            :price="item.product.price"
                            :available="item.product.availableQuantity"
                            :increase-count="onIncreaseCount"
                            :reduce-count="onReduceCount"
                    />
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import toast from '../../plugins/toast';

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
                return images.map(image => `${config.image}/${image}`);
            },
            onIncreaseCount(idProduct) {
                this.$store.dispatch('cart/increaseCountPoint', {idProduct})
                    .catch(err => toast.error(err))
            },
            onReduceCount(idProduct) {
                this.$store.dispatch('cart/reduceCountPoint', {idProduct})
                    .catch(err => toast.error(err))
            }
        },
    };
</script>

<style scoped>
    .cart {
        min-width: 768px;
    }
    div.card-body {
        margin: 0px;
        padding: 0px;
    }

    .cart-box {
        padding: 0px;
        transition: box-shadow .3s;
        border-radius: 10px;
        border: 1px solid #ccc;
        background: #fff;

    }

    .cart-box:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, .2);
    }
</style>
