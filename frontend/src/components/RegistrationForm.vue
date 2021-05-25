<template>
  <b-row>
    <b-col md="1"></b-col>
    <b-col>
      <b-form @submit="registerUser" class="registration-form">
        <h1 style="text-align: center">Register</h1>
        <h4>Hi there! <br> Please fill out the following</h4>

        <!-- Name -->
        <b-form-group id="input-group-1" label="Full Name" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            name="name"
            autocomplete="name"
            placeholder="Sophie Wilson"
            class="form-input"
            :state="name_check"
          ></b-form-input>
          <b-form-invalid-feedback :state="name_check">
            Please enter your name
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Email -->
        <b-form-group id="input-group-2" label="Email" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            name="email"
            autocomplete="email"
            placeholder="Enter email"
            class="form-input"
            :state="email_check"
          ></b-form-input>
          <b-form-invalid-feedback :state="email_check">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- School --> <!-- TODO: replace with typable dropdown -->
        <b-form-group id="input-group-2" label="School" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.school"
            name="school"
            autocomplete="off"
            placeholder="Enter your school's name"
            class="form-input"
            required
          ></b-form-input>
        </b-form-group>

        <!-- School Type -->
        <b-form-group id="input-group-4" label="School Type" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.school_type"
            class="form-input"
            :options="options"
            :state="school_type_check"
          ></b-form-select>
          <b-form-invalid-feedback :state="school_type_check">
            Please select a school type
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- TODO: How did you hear about us? -->

        <!-- Submit -->
        <b-button type="submit" variant="purple" class="m-1">Submit</b-button>

      </b-form>
    </b-col>
    <b-col md="1"></b-col>
  </b-row>
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
        school_type: '',
        heard_from: '',
      },

      valid_name: null,
      valid_email: null,
      valid_school_type: null,

      options: [
        { value: "middle school", text: "Middle School" },
        { value: "high school", text: "High School" },
        { value: "college", text: "College" },
        { value: "graduated", text: "Graduated" }
      ]

    };
  },
  computed: {
    name_check() {
      return this.valid_name
    },
    email_check() {
      return this.valid_email
    },
    school_type_check() {
      return this.valid_school_type
    }
  },
  methods: {
    registerUser(event) {
      event.preventDefault();
      if (this.formCheck()) {
        this.performPostRequest(this.getEnvVariable('BACKEND_ENDPOINT'), 'register', this.form);
        this.$router.push('/thanks');
      }
    },

    // logic goes here instead of in computed so feedback is only shown after
    // submission
    formCheck() {
      let valid_form = true
      if (this.form.name.length === 0)  {
        this.valid_name = false
        valid_form = false
      } else
        this.valid_name = null
      
      //maybe include an email regex
      if (!this.form.email.includes("@")) {
        this.valid_email = false
        valid_form = false
      } else
        this.valid_email = null

      if (this.form.school_type.length === 0) {
        this.valid_school_type = false
        valid_form = false
      } else
        this.valid_school_type = null

      return valid_form
    }
  },
};
</script>

<style scoped>
.registration-form {
  text-align: left;
}

.form-group {
  padding-bottom: 0.5rem;
}

.form-input {
  border-color: var(--lavender);
  border-radius: 0.6rem;
}

.btn-purple {
  background-color: var(--light-lavender);
  color: var(--white);
  border-radius: 0.6rem;
  border-color: var(--light-lavender);
  float: right;
}

.btn-purple:hover {
  background-color: var(--lavender);
  color: var(--white);
  border-radius: 0.6rem;
  border-color: var(--lavender);
  float: right;
}
</style>