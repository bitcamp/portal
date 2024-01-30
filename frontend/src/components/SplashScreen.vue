<template>
  <b-container class="screen-container">
    <b-row>
      <b-col md = "4" class="md-4">
    <CardButton
      RoleTitle="Hackers"
    RoleDescription="As a hacker, you'll be at the forefront of problem-solving 
    and innovation. Dive into challenging projects, showcase your coding skills, 
      and be part of a community dedicated to pushing the boundaries of technology."
      RoleURL="/hackers"
    />
      </b-col>
      <b-col md = "4" class="md-4">
    <CardButton
      RoleTitle="Volunteers"
    RoleDescription="As a Volunteer, your support ensures the smooth execution
    of our hackathon. From logistics to participant assistance, your
    contribution will help create a positive environment for everyone!"
      RoleURL="/volunteer"
    />
  </b-col>
  <b-col md = "4" class="md-4">
    <CardButton
      RoleTitle="Mentors"
    RoleDescription="As a Mentor, leverage your expertise to guide and inspire 
    the next generation of tech enthusiasts. Become a key figure in shaping the 
    experience for participants as they navigate through the hackathon challenges."
      RoleURL="/mentor"
    />
  </b-col>
    </b-row>
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
  justify-content: center;
  display: flex;
  height: 100vh; 
}

.align-items-stretch {
  align-items: stretch;
}

.md-4 {
  padding: 2% 0;
}

.role-card {
  margin: 10px;
  cursor: pointer;
  height: 100%;
  flex-direction: column;
  padding-top: 2rem;
}
</style>
