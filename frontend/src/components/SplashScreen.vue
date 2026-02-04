<template>
  <b-container class="screen-container">
    <b-row class="mb-4 pb-5">
      <div class="logos">
        <img src="@/assets/logotype.svg" alt="Bitcamp logo" class="bitcamp-logo" />
        <img src="@/assets/register.svg" alt="Register Sign" class="register-logo" />
      </div>
    </b-row>
    <b-container class="card-container mb-5">
      <b-row>
        <b-col :md="screenWidth >= 768 ? 6 : 4" class="mb-4 marshie-card">
          <CardButton
            data-role="mentor"
            role-title="REGISTER"
            role-description="As a mentor, leverage your expertise to guide and inspire
            the next generation of tech enthusiasts. Become a key figure in shaping the
            experience for participants as they navigate through the hackathon challenges."
            role-u-r-l="/mentor"
            svg-image-path="splash-screen/green-alien.svg"
          />
        </b-col>
        <b-col :md="screenWidth >= 768 ? 6 : 4" class="mb-4 marshie-card">
          <CardButton
            data-role="hacker"
            role-title="REGISTER"
            role-description="As a hacker, you'll be at the forefront of problem-solving
            and innovation. Dive into challenging projects, showcase your coding skills,
            and be part of a community dedicated to pushing the boundaries of technology."
            role-u-r-l="/hacker"
            svg-image-path="splash-screen/red-alien.svg"
          />
        </b-col>

        <b-col :md="screenWidth >= 768 ? 6 : 4" class="mb-4 marshie-card">
          <CardButton
            data-role="volunteer"
            role-title="REGISTER"
            role-description="As a volunteer, your support ensures the smooth execution
            of our hackathon. From logistics to participant assistance, your
            contribution will help create a positive environment for everyone!"
            role-u-r-l="/volunteer"
            svg-image-path="splash-screen/blue-alien.svg"
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
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.role-card {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  height: 100%;
}

.mb-4 {
  margin-bottom: 0 !important;
}

.card-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 60px;
}

.register-logo {
  width: 65%;
  height: auto; /* Maintain aspect ratio */
  margin: 0px 0;
}

.logos {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logos img {
  padding: 10px;
  margin-top: 2%;
}

.bitcamp-logo {
  width: 20%;
  height: auto; /* Maintain aspect ratio */
  margin-top: 100px;
  margin-bottom: 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center; 
  justify-content: center;
}

.marshie-card {
  display: flex;
  padding: 0 30px;
}

.marshie-card > * {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.7); 
  
  /* Rounded Corners */
  border-radius: 13.83px;
}

@media (max-width: 768px) {
  .screen-container {
    display: grid;
    margin-top: 3vw;
    padding: 0 7vh 10vw;
  }

  .register-logo {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
    margin: 0 7.5vw 10px; /* Reduced bottom margin to bring it closer to the card container */
  }

  .card-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .bitcamp-logo {
    width: 50%;
    height: auto; /* Maintain aspect ratio */
    margin-top: 100px;
    margin-bottom: 20px;
  }
  .mb-4 {
    padding: 0;
  }
}

</style>
