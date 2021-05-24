<template>
  <div class="home center">
    <b-container>
      <b-card style="border-radius: 1rem">
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
