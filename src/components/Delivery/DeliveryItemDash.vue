<template>
    <div class="delivery-item-dash">
        <b-card
                class="shadow"
                :title="deliveryType.nameDelivery"
        >
                <b-card-body>
                    <b-row v-if="deliveryType.address !== ''">
                        Адрес: {{deliveryType.address}}
                    </b-row>
                    <b-row v-if="deliveryType.price !== ''">
                        Стоимость: {{deliveryType.price}}
                    </b-row>
                    <b-row v-if="deliveryType.underground !== []">
                        Ближайшие метро:
                        <div v-for="metro in deliveryType.underground">
                            <a>{{metro}}</a>
                        </div>
                    </b-row>
                    <b-row v-if="deliveryType.timeDelivery !== ''">
                        Время: {{deliveryType.timeDelivery}}
                    </b-row>
                    <b-row v-if="deliveryType.openingHours !== ''">
                        Часы работы: {{deliveryType.openingHours}}
                    </b-row>
                    <b-row v-if="deliveryType.message !== ''">
                        Доп. информация: {{deliveryType.message}}
                    </b-row>
                </b-card-body>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "DeliveryItemDash",
        props: {
            deliveryType: {
                required: true,
                type: Object,
            }
        }
    }
</script>

<style scoped>
    .shadow:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Параметры тени */
    }
</style>
