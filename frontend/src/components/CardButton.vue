<template>
  <b-card class="role-card" :data-role="$attrs['data-role']">
    <div class="card-content-wrapper">
      <div class="marshie-label">
        {{ $attrs["data-role"] }}
      </div>
      <div class="image-container">
        <img v-if="svgImagePath" :src="require(`@/assets/${svgImagePath}`)" class="role-logo" />
      </div>
      <div class="title-container" @click="redirectToRole">
        <h2 class="role-title">
          {{ roleTitle }}
        </h2>
      </div>
    </div>
    <div class="info-icon">
      <span class="info-icon-wrap" v-b-tooltip.hover.bottom :title="roleDescription">
        <b-icon style="color: white" scale="1.5" icon="info-circle" />
      </span>
    </div>
  </b-card>
</template>
<script>
import Vue from "vue";
import { VBTooltipPlugin, IconsPlugin } from "bootstrap-vue";
Vue.use(IconsPlugin);
Vue.use(VBTooltipPlugin);
export default {
  name: "CardButtonComponent",
  props: {
    roleTitle: String,
    roleDescription: String,
    svgImagePath: String,
    roleURL: String,
  },
  methods: {
    redirectToRole() {
      this.$router.push({ path: this.roleURL });
    },
  },
};
</script>
<style scoped>
.role-card {
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 14px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.role-card :deep(.card-body) {
  padding: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.marshie-label {
  color: #1a2e33;
  font-family: "Aleo", serif;
  font-weight: bold;
  font-size: 2rem;
  margin: 30px 0 15px 0;
  text-transform: capitalize;
}

.image-container {
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-logo {
  width: 80%;
  max-width: 100%;
  height: auto;
}

.role-card[data-role="volunteer"] .role-logo {
  width: 70%;
}

.role-card[data-role="mentor"] .role-logo {
  width: 55%;
}

.role-card[data-role="hacker"] .role-logo {
  width: 80%;
  transform: rotate(10.81deg);
}

.title-container {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 4px 7px;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin-top: 60px;
  width: 100%;
}

.role-title {
  font-size: 1.4rem;
  border-radius: 50px;
  padding: 0.6em 1.5em;
  margin: 0;
  background: #ff6f3f;
  border: 2.33px solid #e54d1a;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.role-title:hover {
  background-color: #ffb169;
  color: #d1c2c1;
}

.info-icon {
  margin-top: auto;
  padding-top: 10px;
  padding-bottom: 10px;
}

.b-icon {
  color: #666 !important;
}

.info-icon-wrap {
  display: inline-block;
  padding: 4px; 
}

@media (max-width: 480px) {
  .role-card {
    min-height: 280px;
  }

  .marshie-label {
    font-size: 1.1rem;
    margin: 20px 0 10px 0;
  }

  .image-container {
    height: 160px;
  }

  .role-logo {
    width: 35% !important;
  }

  .role-card[data-role="volunteer"] .role-logo {
    width: 60% !important;
  }

  .role-card[data-role="mentor"] .role-logo {
    width: 55% !important;
  }

  .role-card[data-role="hacker"] .role-logo {
    width: 75% !important;
  }

  .role-title {
    font-size: 1rem;
  }

  .title-container {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .info-icon {
    padding-top: 5px;
    padding-bottom: 10px;
  }
}

@media (min-width: 481px) and (max-width: 600px) {
  .role-card {
    min-height: 300px;
  }

  .marshie-label {
    font-size: 1.2rem;
    margin: 22px 0 10px 0;
  }

  .image-container {
    height: 170px;
  }

  .role-logo {
    width: 32% !important;
  }

  .role-card[data-role="volunteer"] .role-logo {
    width: 28% !important;
  }

  .role-card[data-role="mentor"] .role-logo {
    width: 22% !important;
  }

  .role-card[data-role="hacker"] .role-logo {
    width: 32% !important;
  }

  .role-title {
    font-size: 0.75rem;
    padding: 0.4em 1em;
  }

  .title-container {
    margin-top: 18px;
    margin-bottom: 10px;
  }

  .info-icon {
    padding-top: 5px;
    padding-bottom: 10px;
  }
}

@media (min-width: 601px) and (max-width: 767px) {
  .role-card {
    min-height: 320px;
  }

  .marshie-label {
    font-size: 1.3rem;
    margin: 22px 0 12px 0;
  }

  .image-container {
    height: 180px;
  }

  .role-logo {
    width: 28% !important;
  }

  .role-card[data-role="volunteer"] .role-logo {
    width: 84% !important;
  }

  .role-card[data-role="mentor"] .role-logo {
    width: 70% !important;
  }

  .role-card[data-role="hacker"] .role-logo {
    width: 88% !important;
  }

  .role-title {
    font-size: 1.2rem;
  }

  .title-container {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .info-icon {
    padding-top: 5px;
    padding-bottom: 10px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .marshie-label {
    font-size: 1.4rem;
    margin: 20px 0 10px 0;
  }

  .image-container {
    height: 150px;
  }

  .role-title {
    font-size: 0.95rem;
    padding: 0.5em 1.1em;
  }

  .title-container {
    margin-top: 25px;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .marshie-label {
    font-size: 1.6rem;
    margin: 25px 0 12px 0;
  }

  .image-container {
    height: 170px;
  }

  .role-title {
    font-size: 1.1rem;
    padding: 0.55em 1.3em;
  }

  .title-container {
    margin-top: 35px;
  }
}

@media (min-width: 1200px) and (max-width: 1439px) {
  .marshie-label {
    font-size: 1.8rem;
    margin: 28px 0 14px 0;
  }

  .image-container {
    height: 185px;
  }

  .role-title {
    font-size: 1.25rem;
  }

  .title-container {
    margin-top: 45px;
  }
}

</style>
