<!-- CardButton.vue -->
<template>
  <b-card class="role-card">
    <div class="card-content-wrapper"> 
      <div class="marshie-label">
        {{ $attrs['data-role'] }}
      </div>
      <div class="image-container">
        <img
          v-if="svgImagePath"
          :src="require(`@/assets/${svgImagePath}`)"
          class="role-logo"
        >
      </div>

      <div class="title-container" @click="redirectToRole">
        <div class="effect-box" />
        <h2 class="role-title">
          {{ roleTitle }}
        </h2>
      </div>
    </div>

    <div
      v-b-tooltip.hover.bottom
      :title="roleDescription"
    >
      <b-icon
        style="color: white;"
        scale="1.5"
        icon="info-circle"
      />
    </div>
  </b-card>
</template>

<script>
import Vue from 'vue';
import { VBTooltipPlugin } from 'bootstrap-vue'
import { IconsPlugin } from 'bootstrap-vue'
Vue.use(IconsPlugin)
Vue.use(VBTooltipPlugin)

export default {
  name: "CardButtonComponent",
  props: {
    roleTitle: String,
    roleDescription: String,
    svgImagePath: String,
    roleURL: String, // The route path to redirect when the card is clicked
  },
  methods: {
    redirectToRole() {
      // Use router to navigate to the specified role path
      this.$router.push({ path: this.roleURL });
    },
  },
};
</script>

<style scoped>
.role-card {  
  background-color: #ffffff00;
  border: none;
  position: relative;
  overflow: visible;
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-content-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  height: 180px; 
  width: 110%;
  display: flex;
  align-items: center; 
  justify-content: center; 
  flex-shrink: 0;
}

.marshie-label {
  color: #000000; /* Solid black */
  font-family: 'Aleo';
  font-weight: 800;
  font-size: 2rem;
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.card-body {
  padding: 0;
  height: 100%;
}

.title-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 4px 7px;
  border-radius: 10px;
  transition: all .3s ease;


  /*max-width: 100%; */
}

.role-title {
  font-size: calc(0.8rem + 0.7vw);
  /* font-family: "M PLUS Rounded 1c", sans-serif; */
  border-radius: 50px;
  padding: 5px 20px;
  margin-bottom: 0;
  transition: all .3s ease;

}

.role-description {
  font-size: calc(0.8rem + 0.2vw);
  /* font-family: "M PLUS Rounded 1c", sans-serif; */
}

.tooltip {
  top: 0;
}

/* Specific styles for each button */
.role-card .role-title {
  background: #FF6F3F;
  border: 2.33px solid #E54D1A;

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
  height: 50px;
  width: 200px;
  text-align: center;
}

.role-card .role-title:hover {
  background-color: #FFB169;
  color: #d1c2c1;
}

.role-description {
  text-align: left;
}

.role-logo {
  width: 80%;
  max-width: 110%;
  max-height: 100%; /* Keeps the image within the 250px box */
  margin-bottom: 10px;
}

.role-card[data-role="volunteer"] .role-logo {
  margin-bottom: -2px; 
  width: 70%;
}

.role-card[data-role="mentor"] .role-logo {
  width: 55%; 
}

.role-card[data-role="hacker"] .role-logo {
  transform: rotate(10.81deg);
}

.b-icon {
  margin-top: 10px;
  margin-bottom: 10px;
  color: #666 !important;
}

@media (max-width: 768px) {

  .role-logo {
    width: 80%;
    padding-right: 10px;
  }

  .role-description {
    text-align: center;
  }
}
</style>
