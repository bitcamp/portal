<!-- CardButton.vue -->
<template>
  <b-card class="role-card">
    <img v-if="svgImagePath" :src="require(`@/assets/${svgImagePath}`)" class="role-logo" />

    <!-- Role Title -->
    <div class="title-container" :style="{ backgroundColor: titleBackgroundColor }" @click="redirectToRole">
      <div class="effect-box"></div>
      <h2 class="role-title">
        {{ roleTitle }}
      </h2>
    </div>

    <!-- Role Description -->
    <b-card-text class="role-description">
      {{ roleDescription }}
    </b-card-text>
  </b-card>
</template>

<script>
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
}

.title-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 10px;
}

.effect-box {
  position: absolute;
  z-index: -1;
  border-radius: 10px;
  right: 1px;
  height: 110%;
}

.role-title {
  font-size: calc(0.8rem + 1vw);
  font-family: "M PLUS Rounded 1c", sans-serif;
  border-radius: 5px;
  padding: 5px 20px;
  margin-bottom: 0;
}

/* Specific styles for each button */
.role-card[data-role="hacker"] .role-title {
  background-color: #B42F2F;
  color: #FFB169;
  border: 3px solid #E03728;
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
  height: auto;
  margin-bottom: 10px; /* Add margin between image and title */
}
</style>
