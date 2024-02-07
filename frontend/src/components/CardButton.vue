<!-- CardButton.vue -->
<template>
  <b-card class="role-card">
    <div class="role-body">
      <img v-if="svgImagePath" :src="require(`@/assets/${svgImagePath}`)" class="role-logo" />

      <div
        class="title-container"
        :style="{ backgroundColor: titleBackgroundColor }"
        @click="redirectToRole"
      >
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
import Vue from "vue";
import { VBTooltipPlugin } from "bootstrap-vue";
import { IconsPlugin } from "bootstrap-vue";
Vue.use(IconsPlugin);
Vue.use(VBTooltipPlugin);

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
  height: fit-content;
}

.card-body {
  padding: 1rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.role-body {
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.title-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin: 0.4rem;
  width: 100%;
  max-width: 100%;
}

@media screen and (max-width: 1007px) {
  .title-container {
    width: 13rem;
  }
}

.effect-box {
  position: absolute;
  z-index: -1;
  border-radius: 10px;
  right: 1px;
  height: calc(100% + 0.4rem);
  width: calc(100% + 0.4rem);
  transition: all 0.3s ease;
}

.role-title {
  font-size: 1.5rem;
  /* font-family: "M PLUS Rounded 1c", sans-serif; */
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 0;
  transition: all 0.3s ease;
}

@media screen and (max-width: 1007px) {
  .role-title {
    font-size: 1.1rem;
  }
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
  background-color: #b42f2f;
  color: #ffb169;
  border: 3px solid #e03728;
}

.role-card[data-role="hacker"] .role-title:hover {
  background-color: #ffb169;
  color: #e03728;
}

.role-card[data-role="hacker"] .effect-box {
  background-color: #b42f2f;
}

.role-card[data-role="hacker"] .title-container {
  background-color: #ffb169;
  border: 3px solid #e03728;
}

.role-card[data-role="mentor"] .role-title {
  background-color: #52a4d2;
  color: #dbf2ff;
  border: 3px solid #51befa;
}

.role-card[data-role="mentor"] .role-title:hover {
  background-color: #dbf2ff;
  color: #51befa;
}

.role-card[data-role="mentor"] .effect-box {
  background-color: #52a4d2;
}

.role-card[data-role="mentor"] .title-container {
  background-color: #dbf2ff;
  border: 3px solid #51befa;
}

.role-card[data-role="volunteer"] .role-title {
  background-color: #368d5a;
  color: #e9ffe6;
  border: 3px solid #3a9d63;
}

.role-card[data-role="volunteer"] .role-title:hover {
  background-color: #e9ffe6;
  color: #3a9d63;
}

.role-card[data-role="volunteer"] .effect-box {
  background-color: #368d5a;
}

.role-card[data-role="volunteer"] .title-container {
  background-color: #e9ffe6;
  border: 3px solid #3a9d63;
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
    padding-right: 10px;
  }

  .role-description {
    text-align: center;
  }
}
</style>
