<template>
    <div
            id="cart-point"
            @mouseover="mouseover"
            @mouseleave="mouseleave"
    >
        <b-row
                no-gutters
                class="mt-2 mb-2 p-2"
        >
            <b-col
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    xl="2"
            >
                <img
                        style="width: 150px; height: auto"
                        :src="imagesURL[0]"
                        alt=""
                >
            </b-col>
            <b-col
                    cols="6"
                    sm="8"
                    md="9"
                    lg="10"
                    xl="10"
            >
                <b-row
                        class="mt-2"
                        no-gutters
                >
                    <b-col
                            cols="3"
                            md="6"
                            sm="6"
                            lg="2"
                            xl="2"
                    >
                        <p style="font-family: Roboto; text-align: start;">
                            {{ itemTitle }}
                        </p>
                    </b-col>
                    <b-col
                            cols="2"
                            sm="2"
                            class="mr-1"
                            lg="2"
                            xl="2"
                            offset-lg="5"
                            offset-xl="5"
                    >
                        <div class="card"
                             style="padding: 3px; background: rgba(204,204,204,0.38); border: transparent">
                            <div class="d-flex justify-content-center">
                                <font-awesome-icon @click="onIncreaseCount" style="cursor: pointer;" class="m-2"
                                                   icon="plus"/>
                                <p style="font-family: Roboto; margin: 3px;">
                                    {{ count }}
                                </p>
                                <font-awesome-icon @click="onReduceCount" style="cursor: pointer;" class="m-2"
                                                   icon="minus"/>
                            </div>
                        </div>
                    </b-col>
                    <b-col
                            cols="1"
                            sm="1"
                            lg="1"
                            md="1"
                            xl="1"
                            offset-sm="3"
                            offset-xl="1"
                            offset-lg="1"
                            offset-md="2"
                    >
                        <p style="text-align: end; font-family: Roboto;">
                            {{ price * count }} {{ currency }}
                        </p>
                    </b-col>
                </b-row>
                <b-row no-gutters>
                    <b-col cols="7">
                        <b-row
                                v-if="available <= 10"
                                no-gutters
                        >
                            <b-col
                                    cols="8"
                                    md="4"
                                    style="font-family: Roboto; font-size: 13px;"
                            >
                                Осталось: <a class="text-danger">{{ available }} шт.</a>
                            </b-col>
                        </b-row>
                        <b-row v-else>
                            <b-col
                                    cols="8"
                                    md="4"
                                    style="font-family: Roboto; font-size: 13px;"
                            >
                                Осталось: <a class="text-success">{{ available }} шт.</a>
                            </b-col>
                        </b-row>

                        <!-- Сюда вывести дополнительные кастомные поля -->
                    </b-col>
                </b-row>
                <div class="position-bottom-right">
                    <p
                            v-show="showIcon"
                            @click="deletePoint"
                            style="cursor: pointer; font-family: Roboto; color: #5983f0;"
                    >
                        <font-awesome-icon icon="trash"/>
                        Удалить
                    </p>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
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
            imageUrlConfig: {
                type: String,
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
            },
            onDeletePoint: {
                type: Function,
                required: true,
            },
            increaseCount: {
                type: Function,
                required: true
            },
            reduceCount: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                showIcon: false,
            };
        },
        methods: {
            onReduceCount() {
                this.reduceCount(this.id)
            },
            onIncreaseCount() {
                this.increaseCount(this.id);
            },
            mouseover() {
                this.showIcon = true;
            },
            mouseleave() {
                this.showIcon = false;
            },
            deletePoint() {
                this.onDeletePoint(this.id);
            }
        },
        computed: {
            imagesURL() {
                return this.images.map(image => `${this.imageUrlConfig}/${image}`);
            },
        }
    };
</script>

<style scoped>
    .position-bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .position-bottom {
        position: absolute;
        bottom: 0;
    }
</style>
