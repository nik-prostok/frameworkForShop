<template>
  <div id="navbar">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
    >
      <b-navbar-brand href="#">
        ShopSystem
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item>
            <router-link
              class="default-link dark"
              active-class="active"
              exact-active-class="exact-active"
              to="/dashboard/products"
            >
              Продукты
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="default-link dark"
              active-class="active"
              exact-active-class="exact-active"
              to="/dashboard/categories"
            >
              Категории
            </router-link>
          </b-nav-item>
          <b-nav-item-dropdown text="Доставка">
            <b-dropdown-item>
              <router-link
                      class="dark"
                      active-class="active dark"
                      exact-active-class="exact-active dark"
                      to="/dashboard/delivery"
              >
                Управление способами доставками
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link
                      class="dark"
                      active-class="active dark"
                      exact-active-class="exact-active dark"
                      to="/dashboard/delivery"
              >
                Управление городами доставки
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            />
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
            >
              Search
            </b-button>
          </b-nav-form>

          <b-nav-item-dropdown
            text="Lang"
            right
          >
            <b-dropdown-item href="#">
              EN
            </b-dropdown-item>
            <b-dropdown-item href="#">
              ES
            </b-dropdown-item>
            <b-dropdown-item href="#">
              RU
            </b-dropdown-item>
            <b-dropdown-item href="#">
              FA
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
};
</script>

<style scoped>
  .dark {
    color: #000000;
  }
  .exact-active {
    color: gray;
  }
  .default-link{
    color: azure;
  }
</style>
