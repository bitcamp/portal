<!-- CardButton.vue -->
<template>
  <b-card class="role-card">
    <div>
      <img v-if="svgImagePath" :src="require(`@/assets/${svgImagePath}`)" class="role-logo" />

      <div class="title-container" :style="{ backgroundColor: titleBackgroundColor }" @click="redirectToRole">
        <div class="effect-box"></div>
        <div>
          <h2 class="role-title">
            {{ roleTitle }}
          </h2>
        </div>
      </div>
    </div>
    <div v-b-tooltip.hover.bottom :title="roleDescription">
      <b-icon scale="1.5" icon="info-circle"></b-icon>
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
  overflow: hidden;
}

.card-body {
  padding: 0;
  height: 100%;
}

.title-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 10px;
  transition: all .3s ease;
  /*max-width: 100%; */
}

.effect-box {
  position: absolute;
  z-index: -1;
  border-radius: 10px;
  right: 1px;
  height: 110%;
  transition: all .3s ease;
}

.role-title {
  font-size: calc(0.8rem + 0.7vw);
  /* font-family: "M PLUS Rounded 1c", sans-serif; */
  border-radius: 5px;
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
.role-card[data-role="hacker"] .role-title {
  background-color: #B42F2F;
  color: #FFB169;
  border: 3px solid #E03728;
}

.role-card[data-role="hacker"] .role-title:hover {
  background-color: #FFB169;
  color: #E03728;
}

.role-card[data-role="hacker"] .effect-box {
  background-color: #B42F2F;
  width: 106%;
}

.role-card[data-role="hacker"] .title-container {
  background-color: #FFB169;
  border: 3px solid #E03728;
  margin: 20px;
}

.role-card[data-role="mentor"] .role-title {
  background-color: #52A4D2;
  color: #DBF2FF;
  border: 3px solid #51BEFA;
}

.role-card[data-role="mentor"] .role-title:hover {
  background-color: #DBF2FF;
  color: #51BEFA;
}

.role-card[data-role="mentor"] .effect-box {
  background-color: #52A4D2;
  width: 105%;
}

.role-card[data-role="mentor"] .title-container {
  background-color: #DBF2FF;
  border: 3px solid #51BEFA;
  margin: 20px;
}

.role-card[data-role="volunteer"] .role-title {
  background-color: #368D5A;
  color: #E9FFE6;
  border: 3px solid #3A9D63;
}

.role-card[data-role="volunteer"] .role-title:hover {
  background-color: #E9FFE6;
  color: #3A9D63;
}

.role-card[data-role="volunteer"] .effect-box {
  background-color: #368D5A;
  width: 104%;
}

.role-card[data-role="volunteer"] .title-container {
  background-color: #E9FFE6;
  border: 3px solid #3A9D63;
  margin: 20px 0 !important;
}

.role-description {
  text-align: left;
}

.role-logo {
  width: 100%;
  max-height: 120px;
  margin-bottom: 10px;
}

@media (max-width: 768px) {

  .role-card[data-role="mentor"] {
    padding-top: 10px;
  }

  .role-card[data-role="volunteer"] {
    padding-top: 15px;
  }

  .role-logo {
    width: 80%;
    padding-right: 10px;
  }

  .role-description {
    text-align: center;
  }
}
</style>
