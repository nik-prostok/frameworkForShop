<template>
  <div id="navbar">
    <b-navbar
      type="dark"
      variant="info"
    >
      <b-navbar-nav>
        <b-nav-item>
          Shop System
        </b-nav-item>
        <b-nav-item>
          <router-link
            class="default-link"
            active-class="active"
            exact-active-class="exact-active"
            to="/dashboard/products"
          >
            Продукты
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link
            class="default-link"
            active-class="active"
            exact-active-class="exact-active"
            to="/dashboard/categories"
          >
            Категории
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
};
</script>

<style scoped>
  .active {
    color: black;
  }
  .exact-active {
    color: gray;
  }
  .default-link{
    color: azure;
  }
</style>
