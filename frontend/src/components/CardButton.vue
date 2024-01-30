<template>
  <b-card
    class="role-card"
    @click="redirectToRole"
  >

  <!-- Placeholder for Logo (e.g filled in circle?) -->
    <!-- <b-avatar
    </b-avatar> -->

    <!-- Role Title -->
    <h3>{{ RoleTitle }}</h3>

    <!-- Role Description -->
    <b-card-text>{{ RoleDescription }}</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "CardButton",
  props: {
    RoleTitle: String,
    RoleDescription: String,
    RoleURL: String, // The route path to redirect when the card is clicked
  },
  methods: {
    redirectToRole() {
      // Use router to navigate to the specified role path
      this.$router.push({ path: this.RoleURL });
    },
  },
};
</script>

<style scoped>

</style>