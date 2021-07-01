<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="navbar">
    <b-navbar-brand href="https://gotechnica.org">
      <img src="../assets/technica-logo.png" alt="Technica 2021!" width="170" class="pl-2">
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 4px 4px -5px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .navbar {
    display: none;
  }
}

</style>