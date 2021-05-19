<template>
  <b-form @submit="registerUser" class="registration-form">

    <!-- Name -->
    <b-form-group id="input-group-1" label="Full Name" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.name"
        placeholder="Sophie Wilson"
        required
      ></b-form-input>
    </b-form-group>

    <!-- Email -->
    <b-form-group id="input-group-2" label="Email" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="form.email"
        type="email"
        placeholder="Enter email"
        required
      ></b-form-input>
    </b-form-group>

    <!-- School --> <!-- TODO: replace with typable dropdown -->
    <b-form-group id="input-group-2" label="School" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="form.school"
        placeholder="Enter your school's name"
        required
      ></b-form-input>
    </b-form-group>

    <!-- TODO: How did you hear about us? -->

    <!-- Submit -->
    <b-button type="submit" variant="primary" class="m-1 align-right">Submit</b-button>

  </b-form>
</template>

<script>
import generalMixin from '../mixins/general';

export default {
  name: 'RegistrationForm',
  mixins: [generalMixin],
  data() {
    return {
      form: {
        email: '',
        name: '',
        school: '',
        heard_from: '',
      },
    };
  },
  methods: {
    registerUser(event) {
      event.preventDefault();
      this.performPostRequest(this.getEnvVariable('BACKEND_ENDPOINT'), 'register', this.form);
      this.$router.push('/thanks');
    },
  },
};
</script>

<style scoped>

.registration-form {
  text-align: left;
}

.form-group {
  padding-bottom: 1.25rem;
}

</style>
