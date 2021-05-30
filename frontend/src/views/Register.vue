<template>
  <div class="home">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
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
