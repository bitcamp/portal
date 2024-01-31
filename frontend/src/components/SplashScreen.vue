<template>
  <b-container class="screen-container">
    <b-row>
      <b-col md="4" class="mb-4">
        <CardButton
          role-title="HACKER"
          role-description="As a hacker, you'll be at the forefront of problem-solving 
          and innovation. Dive into challenging projects, showcase your coding skills, 
          and be part of a community dedicated to pushing the boundaries of technology."
          role-u-r-l="/hacker"
        />
      </b-col>
      <b-col md="4" class="mb-4">
        <CardButton
          role-title="MENTOR"
          role-description="As a Mentor, leverage your expertise to guide and inspire 
          the next generation of tech enthusiasts. Become a key figure in shaping the 
          experience for participants as they navigate through the hackathon challenges."
          role-u-r-l="/mentor"
        />
      </b-col>
      <b-col md="4" class="mb-4">
        <CardButton
          role-title="VOLUNTEER"
          role-description="As a Volunteer, your support ensures the smooth execution
          of our hackathon. From logistics to participant assistance, your
          contribution will help create a positive environment for everyone!"
          role-u-r-l="/volunteer"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CardButton from "../components/CardButton.vue";

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
  padding: 0 50px;
}

.role-card {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  margin: 20px 0;
  padding-top: 1.5rem;
  height: 100%;
  transition: transform 0.3s ease;
}

.role-card:hover {
  transform: scale(1.05);
  /* Increase the scale on hover */
}

@media (max-width: 768px) {
  .screen-container {
    display: grid;
    height: 100%;
    padding: 150px 50px;
  }

}

</style>
