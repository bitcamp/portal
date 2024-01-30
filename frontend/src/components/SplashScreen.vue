<template>
  <b-container class="screen-container">
    <CardButton
      RoleTitle="Hackers"
      RoleDescription="hacker description placeholder"
      RoleURL="/hackers"
    />
    <CardButton
      RoleTitle="Volunteers"
      RoleDescription="volunteer description placeholder"
      RoleURL="/volunteer"
    />
    <CardButton
      RoleTitle="Mentors"
      RoleDescription="mentor description placeholder"
      RoleURL="/mentor"
    />
  </b-container>
</template>

<script>
import CardButton from "../components/CardButton.vue"

export default {
  components: {
    CardButton,
  },
};
</script>

<style scoped>
.screen-container {
  align-items: center;
  display: flex;
}

.role-card {
  margin: 10px;
}
</style>
