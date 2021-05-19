<template>
  <div class="home">
    <b-container class="mt-4">
      <b-card>
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
