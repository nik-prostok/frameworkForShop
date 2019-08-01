<template>
  <div id="navbar">
    <b-navbar
      type="dark"
      variant="dark"
    >
      <b-navbar-nav>
        <b-nav-item>ShopSystemDev</b-nav-item>

        <b-nav-item-dropdown
          text="Products"
          right
        >
          <b-dropdown-item>Add product</b-dropdown-item>
          <b-dropdown-item>Edit product</b-dropdown-item>
        </b-nav-item-dropdown>
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

</style>
