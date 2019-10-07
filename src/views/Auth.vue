<template>
  <div class="Auth">
    <label>Token</label><br>
    <code>{{ $store.getters['auth/token'] }}</code><hr>
    <label>User</label><br>
    <code>
    email {{ $store.getters['auth/user'].email }}<br>
    role {{ $store.getters['auth/user'].role }}<br>
    </code>
    <router-link to="AccessOnlyAdmin">Admin Page</router-link>
    <label>Registration</label><br>
    <input
      v-model="email"
      type="email"
    ><br>
    <input
      v-model="password"
      type="password"
    ><br>
    <button @click="registerUser()">
      Register
    </button>
    <hr>
    <label>Authentication</label><br>
    <input
      v-model="email"
      type="email"
    ><br>
    <input
      v-model="password"
      type="password"
    ><br>
    <button @click="loginUser()">
      Login
    </button>
    <hr>
    <label>Logout</label><br>
    <button @click="logoutUser()">
      Login
    </button>
    <hr>
    <label>Delete User (с проверкой на логин)</label><br>
    <input
      v-model="email"
      type="email"
    >
    <button @click="deleteUser()">
      Login
    </button>
    <hr>
    <label>Change User Role (способен только админ)</label><br>
    <input
      v-model="email"
      type="email"
    >
    <input
      v-model="role"
      type="text"
    >
    <button @click="changeUserRole()">
      Change
    </button>
  </div>
</template>
<script>
export default {
  name: 'Auth',
  data() {
    return {
      email: 'test@email.com',
      password: 'password',
      role: 'user',
    };
  },
  methods: {
    registerUser() {
      this.$store.dispatch('auth/register', { email: this.email, password: this.password })
        .then(() => {});
    },
    loginUser() {
      this.$store.dispatch('auth/authenticate', { email: this.email, password: this.password })
      .then((data) => {
        this.$cookie.set('jwt_token', data.token, 1);
        this.$cookie.set('user_email', data.user.email, 1);
        this.$cookie.set('user_role', data.user.role, 1);
      });
    },
    logoutUser() {
      this.$store.commit('auth/logout');
    },
    deleteUser() {
      this.$store.dispatch('auth/deleteUser', { email: this.email })
        .then(() => {});
    },
    changeUserRole() {
      this.$store.dispatch('auth/updateUserRole', { email: this.email, role: this.role })
        .then(() => {});
    },
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.redirectFrom) {
      next(vm => {
        alert('Sorry, you dont have the right access to reach the route requested')
      })
    } else {
      next()
    }
  }
};
</script>
