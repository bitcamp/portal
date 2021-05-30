<template>
  <div class="home">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
        <registration-form-google/>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import RegistrationFormGoogle from '../components/RegistrationFormGoogle.vue';

export default {
  components: { RegistrationFormGoogle },
  name: 'Register',
};
</script>
