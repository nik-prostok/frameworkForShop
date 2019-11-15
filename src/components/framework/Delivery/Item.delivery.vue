<template>
    <b-card class="m-3 shadow" @click="onClickItem(deliveryType)">
        <b-card-title>
            <slot/>
            <h3 class="title">{{ deliveryType.nameDelivery }}</h3>
        </b-card-title>
        <b-card-body>
            <b-row>
                <p class="text">{{ deliveryType.price }} руб., {{ deliveryType.address }}</p>
            </b-row>
            <b-row>
                <p class="text">
                    {{ deliveryType.timeDelivery }}
                </p>
            </b-row>
            <b-row>
                <p class="text">
                    {{ deliveryType.openingHours }}
                </p>
            </b-row>
            <b-row v-if="deliveryType.underground.length">
                <p class="text">
                    {{ undergroundStr }}
                </p>
            </b-row>
            <b-row>
                <p class="text">
                    {{ deliveryType.message }}
                </p>
            </b-row>
        </b-card-body>
    </b-card>
</template>

<script>
    export default {
        name: 'ItemDelivery',
        props: {
            deliveryType: {
                required: true,
                type: Object,
            },
            onClickItem: {
                type: Function,
            }
        },
        computed: {
            undergroundStr() {
                let str = 'Ближайшие метро: ';
                this.deliveryType.underground.forEach((metro, index, arr) => {
                    if (index < (arr.length - 1)) {
                        str += `${metro}, `;
                    } else {
                        str += metro;
                    }
                });
                return str;
            },
        },
        methods: {

        },
    };
</script>

<style scoped>
    .shadow:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Параметры тени */
    }
</style>
