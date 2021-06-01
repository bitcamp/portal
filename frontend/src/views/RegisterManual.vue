<template>
  <div class="home">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
        <registration-form-manual/>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import RegistrationFormManual from '../components/RegistrationFormManual.vue';

export default {
  components: { RegistrationFormManual },
  name: 'Register',
};
</script>
