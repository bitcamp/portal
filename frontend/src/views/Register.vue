<template>
  <div class="home">
    <b-container>
      <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
        <registration-form/>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import RegistrationForm from '../components/RegistrationForm.vue';

export default {
  components: { RegistrationForm },
  name: 'Register',
};
</script>
