<template>
  <b-container class="screen-container mt-3 mt-lg-4 mt-xxl-5" >
    <b-row>
      <b-col md = "4" class="mb-4">
    <CardButton
      RoleTitle="Hackers"
    RoleDescription="As a hacker, you'll be at the forefront of problem-solving 
    and innovation. Dive into challenging projects, showcase your coding skills, 
      and be part of a community dedicated to pushing the boundaries of technology."
      RoleURL="/hackers"
    />
      </b-col>
      <b-col md = "4" class="mb-4">
    <CardButton
      RoleTitle="Volunteers"
    RoleDescription="As a Volunteer, your support ensures the smooth execution
    of our hackathon. From logistics to participant assistance, your
    contribution will help create a positive environment for everyone!"
      RoleURL="/volunteer"
    />
  </b-col>
  <b-col md = "4" class="mb-4">
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

.role-card {
  cursor: pointer;
  flex-direction: column;
  margin: 10px;
  padding-top: 1rem;
  height: 100%;
  transition: transform 0.3s ease; 
}

.role-card:hover {
  transform: scale(1.05); /* Increase the scale on hover */
}

</style>
