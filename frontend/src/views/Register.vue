<template>
  <div class="home">
    <b-container>
      <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
        <registration-form :default_track="default_track" />
      </b-card>
    </b-container>
  </div>
</template>

<script>
import RegistrationForm from "../components/RegistrationForm.vue";

export default {
  name: "RegisterView",
  components: { RegistrationForm },
  props: {
    default_track: {
      type: String,
      default: "general",
    },
  },
};
</script>
