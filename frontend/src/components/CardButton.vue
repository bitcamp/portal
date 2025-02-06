<!-- CardButton.vue -->
<template>
  <b-card class="role-card">
    <div>
      <img v-if="svgImagePath" :src="require(`@/assets/${svgImagePath}`)" class="role-logo" />

      <div class="title-container" @click="redirectToRole">
        <div class="effect-box"></div>
        <div>
          <h2 class="role-title">
            {{ roleTitle }}
          </h2>
        </div>
      </div>
    </div>
    <div v-b-tooltip.hover.bottom :title="roleDescription">
      <b-icon style="color: white;" scale="1.5" icon="info-circle"></b-icon>
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
  margin: 0;
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
.role-card .role-title {
  background: linear-gradient(90deg, #ea1d9b, #fca5a5);

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
  width: 110%;
  max-height: 250px;
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
