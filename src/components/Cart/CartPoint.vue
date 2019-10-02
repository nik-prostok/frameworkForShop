<template>
    <div id="cart-point" class="m-5">
        <b-row>
            <b-col cols="3">
                <img style="width: 150px; height: auto" :src="images[0]" alt="">
            </b-col>
            <b-col cols="4">
                <div>
                        {{itemTitle}}
                </div>
                <div v-if="available < 10" class="position-bottom">
                    <div cols="9" style="font-size: 13px;">
                        Осталось в наличии:
                    </div>
                    <div cols="3" class="text-danger" style="font-size: 13px;">
                        {{available}} шт.
                    </div>
                </div>
            </b-col>
            <b-col cols="2">
                <p style="text-align: center">{{count}}</p>
            </b-col>
            <b-col cols="3">
                <p style="text-align: end">{{price * count}} {{currency}}</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        props: {
            itemTitle: {
                type: String,
                required: true,
            },
            count: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            images: {
                type: Array,
                required: true,
            },
            currency: {
                type: String,
                required: true,
            },
            available: {
                type: Number,
                required: true,
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .position-bottom {
        position: absolute;
        bottom: 0;
    }
</style>
