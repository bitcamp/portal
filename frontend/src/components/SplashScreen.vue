<template>
  <div class="screen-container">
    <b-container>
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
  </div>
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
  /* ensure the container fills the viewport so the background image covers fully */
  min-height: 100vh;
  width: 100%;

  /* background image from assets */
  background-image: url("~@/assets/updated-reg-page.svg");
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;

  /* padding-top: 40px; */
}

.screen-container .row:first-child {
  margin-top: 0;
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
  /* margin-top: 100px; */
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

@keyframes slideUp {
  from {
    background-position: center 120%;
  }
  to {
    background-position: top center;
  }
}

.screen-container {
  animation: slideUp 1s ease-out forwards;
}

@media (max-width: 990px) {
  .marshie-card {
    flex: 0 0 100%;
    max-width: 60%;
  }
}

@media (max-width: 768px) {

  .screen-container {
    display: grid;
    padding: 0 7vh 10vw;
    background-position: center center;
    background-image: url("~@/assets/reg-page-mobile.svg") !important;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .register-logo {
    width: 60%;
    height: auto; /* Maintain aspect ratio */
    margin: 0 7.5vw 10px; /* Reduced bottom margin to bring it closer to the card container */
  }

  .card-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .bitcamp-logo {
    width: 40%;
    height: auto; /* Maintain aspect ratio */
    margin-top: 100px;
    margin-bottom: 20px;
  }
  
  .mb-4 {
    padding: 0;
  }
}

</style>
