<template>
  <b-card class="role-card" @click="redirectToRole">
    <!-- Placeholder for Logo (e.g filled in circle?) -->
    <!-- <b-avatar
    </b-avatar> -->

    <!-- Role Title -->
    <h2 class="role-title">
      {{ roleTitle }}
    </h2>

    <!-- Role Description -->
    <b-card-text class="role-description">
      {{ roleDescription }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "CardButton",
  props: {
    roleTitle: String,
    roleDescription: String,
    roleURL: String, // The route path to redirect when the card is clicked
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
.role-title {
  font-size: calc(0.8rem + 1vw);
}
.role-description {
  text-align: left;
}
</style>
