<template>
  <b-container class="screen-container">
    <b-row class="mb-4">
      <img src="@/assets/sign.svg" alt="Register Sign" class="register-logo" />
    </b-row>
    <b-container class="card-container">
      <b-row>
        <b-col md="4" class="mb-4">
          <!-- Description-placeholder (insert below) : As a hacker, you'll be at the forefront of problem-solving 
            and innovation. Dive into challenging projects, showcase your coding skills, 
            and be part of a community dedicated to pushing the boundaries of technology. -->
          <CardButton
            data-role="hacker"
            role-title="HACKER"
            role-description=""
            role-u-r-l="/hacker"
            svg-image-path="red-marshie.svg"
          />
        </b-col>
        <b-col md="4" class="mb-4">
          <!-- As a Mentor, leverage your expertise to guide and inspire 
            the next generation of tech enthusiasts. Become a key figure in shaping the 
            experience for participants as they navigate through the hackathon challenges. -->
          <CardButton
            data-role="mentor"
            role-title="MENTOR"
            role-description=""
            role-u-r-l="/mentor"
            svg-image-path="blue-marshie.svg"
          />
        </b-col>
        <b-col md="4" class="mb-4">
          <!-- As a Volunteer, your support ensures the smooth execution
            of our hackathon. From logistics to participant assistance, your
            contribution will help create a positive environment for everyone! -->
          <CardButton
            data-role="volunteer"
            role-title="VOLUNTEER"
            role-description=""
            role-u-r-l="/volunteer"
            svg-image-path="green-marshie.svg"
          />
        </b-col>
      </b-row>
    </b-container>
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
@import url("https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500&display=swap");
.screen-container {
  max-width: 900px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 50px;
}

.card-container {
  display: flex;
  flex-direction: row;
}

.register-logo {
  width: 100%;
}

.role-card {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  height: 100%;
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .screen-container {
    display: grid;
    height: 100%;
    margin-top: 10vw;
  }

  .register-logo {
    width: 80%;
    margin: auto;
  }

}
</style>
