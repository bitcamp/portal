<template>
  <div class="screen-container">
    <b-container fluid>
      <b-row class="mb-4 pb-5">
        <div class="logos">
          <img src="@/assets/logotype.svg" alt="Bitcamp logo" class="bitcamp-logo" />
          <img src="@/assets/register.svg" alt="Register Sign" class="register-logo" />
        </div>
      </b-row>
      <b-container fluid class="card-container mb-5">
        <b-row class="cards-row g-4">
          <b-col cols="12" md="4" class="mb-4 marshie-card marshie-card-mentor">
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
          <b-col cols="12" md="4" class="mb-4 marshie-card marshie-card-hacker">
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

          <b-col cols="12" md="4" class="mb-4 marshie-card marshie-card-volunteer">
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
.screen-container {
  min-height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;

  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  animation: slideUp 1s ease-out forwards;
  overflow: hidden;
}

@keyframes slideUp {
  from {
    background-position: center 120%;
  }
  to {
    background-position: top center;
  }
}

.logos {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.logos img {
  margin-top: 2%;
}

.bitcamp-logo {
  width: 12%;
  height: auto;
  margin-bottom: 20px;
}

.register-logo {
  width: 25%;
  height: auto;
}

.card-container {
  margin-bottom: 60px;
}

.cards-row {
  width: 100%;
  min-height: 500px;
  max-width: 1400px;
  margin: 0 auto;
}

.marshie-card {
  padding: 0 40px;
}

@media (max-width: 767px) {
  .cards-row {
    display: flex;
    flex-direction: column;
  }

  .marshie-card-hacker {
    order: -1;
  }
  .logos img {
    margin-top: 13%;
  }
}

@media (max-width: 480px) {
  .screen-container {
    padding: 0 20px 40px;
  }

  .bitcamp-logo {
    width: 50%;
    margin-top: 80px;
  }

  .register-logo {
    width: 100%;
    margin: 0 20px 10px;
  }

  .card-container {
    margin-bottom: 20px;
  }

  .cards-row {
    min-height: auto;
  }

  .marshie-card {
    padding: 0;
  }
  .logos img {
    margin-top: 13%;
  }
}

@media (min-width: 481px) and (max-width: 600px) {
  .screen-container {
    padding: 0 40px 45px;
  }

  .bitcamp-logo {
    width: 45%;
    margin-top: 90px;
  }

  .register-logo {
    width: 95%;
    margin: 0 25px 12px;
  }

  .card-container {
    margin-bottom: 25px;
  }

  .cards-row {
    min-height: auto;
  }

  .marshie-card {
    padding: 0 10px;
  }
}

@media (min-width: 601px) and (max-width: 767px) {
  .screen-container {
    padding: 0 60px 50px;
  }

  .bitcamp-logo {
    width: 38%;
    margin-top: 70px;
  }

  .register-logo {
    width: 85%;
    margin: 0 30px 15px;
  }

  .card-container {
    margin-bottom: 30px;
  }

  .cards-row {
    min-height: auto;
  }

  .marshie-card {
    padding: 0 15px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .bitcamp-logo {
    width: 18%;
    margin-top: 40px;
  }

  .register-logo {
    width: 35%;
  }

  .cards-row {
    max-width: 700px;
    min-height: 400px;
  }

  .marshie-card {
    padding: 0 12px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .bitcamp-logo {
    width: 15%;
  }

  .register-logo {
    width: 30%;
  }

  .cards-row {
    max-width: 900px;
    min-height: 450px;
  }

  .marshie-card {
    padding: 0 20px;
  }
}

@media (min-width: 1200px) and (max-width: 1439px) {
  .bitcamp-logo {
    width: 13%;
  }

  .register-logo {
    width: 27%;
  }

  .cards-row {
    max-width: 1100px;
  }

  .marshie-card {
    padding: 0 30px;
  }
}

@media (min-width: 1440px) {
  .bitcamp-logo {
    width: 12%;
  }

  .register-logo {
    width: 25%;
  }

  .cards-row {
    max-width: 1400px;
  }

  .marshie-card {
    padding: 0 40px;
  }
}
</style>
