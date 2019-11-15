<template>
    <div class="card" @click="onClickItem(deliveryType)">
        <b-row>
            <slot/>
            <h3 class="title">{{ deliveryType.nameDelivery }}</h3>
        </b-row>
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
    </div>
</template>

<script>
    export default {
        name: 'ItemDeliveryShadow',
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

    .card {
        display: flex;
        height: 280px;
        width: auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: -0.1rem 0 1rem #000;
        transition: 0.4s ease-out;
        position: relative;
        left: 0px;
        padding: 30px;
    }

    .card:not(:first-child) {
        margin-left: -50px;
    }

    .card:hover {
        transform: translateY(-20px);
        transition: 0.4s ease-out;
    }

    .card:hover ~ .card {
        position: relative;
        left: 50px;
        transition: 0.4s ease-out;
    }

    .title {
        color: black;
        font-weight: 300;
    }

    .text {
        color: black;
        font-weight: 300;
    }

    .bar {
        position: absolute;
        top: 100px;
        left: 20px;
        height: 5px;
        width: 150px;
    }

    .emptybar {
        background-color: #2e3033;
        width: 100%;
        height: 100%;
    }

    .filledbar {
        position: absolute;
        top: 0px;
        z-index: 3;
        width: 0px;
        height: 100%;
        background: rgb(0, 154, 217);
        background: linear-gradient(90deg, rgba(0, 154, 217, 1) 0%, rgba(217, 147, 0, 1) 65%, rgba(255, 186, 0, 1) 100%);
        transition: 0.6s ease-out;
    }

    .card:hover .filledbar {
        width: 120px;
        transition: 0.4s ease-out;
    }

    .circle {
        position: absolute;
        top: 150px;
        left: calc(50% - 60px);
    }

    .stroke {
        stroke: black;
        stroke-dasharray: 360;
        stroke-dashoffset: 360;
        transition: 0.2s ease-out;
    }

    svg {
        fill: #ffffff;
        stroke-width: 2px;
    }

    .card:hover .stroke {
        stroke-dashoffset: 100;
        transition: 0.6s ease-out;
    }

</style>
