<template>
  <div class="testpaymentconfirmation">
    Создание платежа (получение данныъ из заказа (корзина -> заказ)). Пока рандом<br>
    <label>Order: {{ this.order.order_id }}</label><br>
    <label>Description: {{ this.order.description }}</label><br>
    <label>Amount: {{ this.order.amount }} RUB</label><br>
    <button @click="createPayment">
      Начать оплату
    </button>
    <hr>
    <div
      v-if="payment"
      class="pay"
    >
      Это страница эквайринга<hr>
      Оплата платежа (данные из платежа, ответ от эквайринга)<br>
      <label>Order: {{ payment.metadata.order_id }}</label><br>
      <label>Description: {{ payment.description }}</label><br>
      <label>Amount: {{ payment.amount.value }} {{ payment.amount.currency }}</label><br>
      <label>Paid: {{ payment.paid }}</label><br>
      <label>Status: {{ payment.status }}</label><br>
      <button @click="payPayment">
        Оплатить (происходит на сайте эквайринга, тут для теста)
      </button><br>
      <button @click="notPayPayment">
        Не оплатить (происходит на сайте эквайринга, тут для теста)
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestPaymentConfirmation',
  data() {
    return {
      order: {
        order_id: Math.round(Math.random() * 100),
        description: Math.round(Math.random() * 9999999),
        amount: Math.random() * 100,
        currency: 'RUB',
      },
      payment: {
        metadata: { order_id: '' },
        description: '',
        amount: { value: '', currency: '' },
        paid: '',
        status: '',
      },
    };
  },
  methods: {
    async createPayment() {
      this.$store.dispatch('payment/createPayment', { order: this.order })
        .then((data) => {
          this.payment = data.data;
        });
    },
    payPayment() {},
    notPayPayment() {},
  },
};
</script>

<style scoped>
    .pay {
        background: #777;
    }
</style>
