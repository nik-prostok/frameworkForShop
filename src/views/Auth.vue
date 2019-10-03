<template>
    <div class="Auth">
        <label>Registration</label><br>
        <input type="email" v-model="email"/><br>
        <input type="password" v-model="password"/><br>
        <button @click="registerUser()">Register</button>
        <hr>
        <label>Authentication</label><br>
        <input type="email" v-model="email"/><br>
        <input type="password" v-model="password"/><br>
        <button @click="loginUser()">Login</button>
        <hr>
        <label>Logout</label><br>
        <button @click="logoutUser()">Login</button>
        <hr>
        <label>Delete User (с проверкой на логин)</label><br>
        <input type="email" v-model="email"/>
        <button @click="deleteUser()">Login</button>
        <hr>
        <label>Change User Role (способен только админ)</label><br>
        <input type="email" v-model="email"/>
        <input type="text" v-model="role"/>
        <button @click="changeUserRole()">Change</button>
    </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
    name: 'Auth',
    data () {
        return {
            email: 'test@email.com',
            password: 'password',
            role: 'user'
        }
    },
    computed: {
        ...mapState({
            authenticate: state => state.auth.authenticate,
            register: state => state.auth.register,
            delete: state => state.auth.deleteUser,
            updateUserRole: state => state.auth.updateUserRole
        })
    },
    methods: {
        registerUser () {
            this.$store.dispatch('auth/register', { email: this.email, password: this.password })
            .then(() => {})
        },
        loginUser () {
            this.$store.dispatch('auth/authenticate', { email: this.email, password: this.password })
            .then(() => {})
        },
        logoutUser () {
            this.$store.commit('auth/logout')
        },
        deleteUser () {
            this.$store.dispatch('auth/deleteUser', { email: this.email })
            .then(() => {})
        },
        changeUserRole () {
            this.$store.dispatch('auth/updateUserRole', { email: this.email, role: this.role })
            .then(() => {})
        }
    }
}
</script>