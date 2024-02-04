<template>
  <b-card class="role-card">
    <img v-if="svgImagePath" :src="require(`@/assets/${svgImagePath}`)" class="role-logo" />

    <!-- Role Title -->
    <div class="title-container" :style="{ backgroundColor: titleBackgroundColor }" @click="redirectToRole">      
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
    svgImagePath: String, // marshie logo
    roleURL: String, // route path to redirect when the card is clicked
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
}
.role-title {
  font-size: calc(0.8rem + 1vw);
  font-family: "M PLUS Rounded 1c", sans-serif;
  border-radius: 5px;
  padding: 5px 20px;
  margin-bottom: 0;
}

.title-container {
  display: inline-block; 
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 10px;
  margin: 20px;
}

/* Specific styles for each button */
.role-card[data-role="hacker"] .role-title {
  background-color: #B42F2F;
  color: #FFB169;
  border: 3px solid #E03728;
  text-shadow: -2px -2px 0 #E03728,-2px -1px 0 #E03728,-2px 0px 0 #E03728,-2px 1px 0 #E03728,-2px 2px 0 #E03728,-1px -2px 0 #E03728,-1px -1px 0 #E03728,-1px 0px 0 #E03728,-1px 1px 0 #E03728,-1px 2px 0 #E03728,0px -2px 0 #E03728,0px -1px 0 #E03728,0px 0px 0 #E03728,0px 1px 0 #E03728,0px 2px 0 #E03728,1px -2px 0 #E03728,1px -1px 0 #E03728,1px 0px 0 #E03728,1px 1px 0 #E03728,1px 2px 0 #E03728,2px -2px 0 #E03728,2px -1px 0 #E03728,2px 0px 0 #E03728,2px 1px 0 #E03728,2px 2px 0 #E03728
}
.role-card[data-role="hacker"] .title-container {
  background-color: #FFB169;
  border: 3px solid #E03728;
}

.role-card[data-role="mentor"] .role-title {
  background-color: #52A4D2;
  color: #DBF2FF;
  border: 3px solid #51BEFA;
  text-shadow: -2px -2px 0 #51BEFA,-2px -1px 0 #51BEFA,-2px 0px 0 #51BEFA,-2px 1px 0 #51BEFA,-2px 2px 0 #51BEFA,-1px -2px 0 #51BEFA,-1px -1px 0 #51BEFA,-1px 0px 0 #51BEFA,-1px 1px 0 #51BEFA,-1px 2px 0 #51BEFA,0px -2px 0 #51BEFA,0px -1px 0 #51BEFA,0px 0px 0 #51BEFA,0px 1px 0 #51BEFA,0px 2px 0 #51BEFA,1px -2px 0 #51BEFA,1px -1px 0 #51BEFA,1px 0px 0 #51BEFA,1px 1px 0 #51BEFA,1px 2px 0 #51BEFA,2px -2px 0 #51BEFA,2px -1px 0 #51BEFA,2px 0px 0 #51BEFA,2px 1px 0 #51BEFA,2px 2px 0 #51BEFA}

.role-card[data-role="mentor"] .title-container {
  background-color: #DBF2FF;
  border: 3px solid #51BEFA;
}

.role-card[data-role="volunteer"] .role-title {
  background-color: #368D5A;
  color: #E9FFE6;
  border: 3px solid #3A9D63;
  text-shadow: -2px -2px 0 #3A9D63,-2px -1px 0 #3A9D63,-2px 0px 0 #3A9D63,-2px 1px 0 #3A9D63,-2px 2px 0 #3A9D63,-1px -2px 0 #3A9D63,-1px -1px 0 #3A9D63,-1px 0px 0 #3A9D63,-1px 1px 0 #3A9D63,-1px 2px 0 #3A9D63,0px -2px 0 #3A9D63,0px -1px 0 #3A9D63,0px 0px 0 #3A9D63,0px 1px 0 #3A9D63,0px 2px 0 #3A9D63,1px -2px 0 #3A9D63,1px -1px 0 #3A9D63,1px 0px 0 #3A9D63,1px 1px 0 #3A9D63,1px 2px 0 #3A9D63,2px -2px 0 #3A9D63,2px -1px 0 #3A9D63,2px 0px 0 #3A9D63,2px 1px 0 #3A9D63,2px 2px 0 #3A9D63
}
.role-card[data-role="volunteer"] .title-container {
  background-color: #E9FFE6;
  border: 3px solid #3A9D63;
}

.role-description {
  text-align: left;
}
</style>
