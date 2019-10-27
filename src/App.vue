<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      getDataFromCookie: state => state.auth.getDataFromCookie,
    }),
  },
  created() {
    const data = {
      user: {
        email: this.$cookie.get('user_email'),
        role: this.$cookie.get('user_role'),
      },
      token: this.$cookie.get('jwt_token'),
    };
    this.$store.dispatch('auth/getDataFromCookie', data);
  },
};
</script>

<style>
  .shadow:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Параметры тени */
  }
</style>
