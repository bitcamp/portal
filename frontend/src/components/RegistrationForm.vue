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
            :state="valid_name"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_name">
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
            :state="valid_email"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_email">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- School -->
        <b-form-group id="input-group-2" label="School" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.school"
            name="school"
            autocomplete="off"
            placeholder="Enter your school's name"
            :state="valid_school"
            class="form-input"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_school">
            Please enter a school name
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- School Type -->
        <b-form-group id="input-group-4" label="School Type" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.school_type"
            class="form-input"
            :options="options"
            :state="valid_school_type"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_school_type">
            Please select a school type
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Current City -->
        <b-form-group id="input-group-5" label="City" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.city"
            name="city"
            autocomplete="off"
            placeholder="Where will you be hacking from?"
            class="form-input"
            :state="valid_city"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_city">
            Please enter a city
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
        city: '',
      },

      valid_name: null,
      valid_email: null,
      valid_school: null,
      valid_school_type: null,
      valid_city: null,

      options: [
        { value: "middle school", text: "Middle School" },
        { value: "high school", text: "High School" },
        { value: "college", text: "College" },
        { value: "graduated", text: "Graduated" }
      ]

    };
  },

  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      const autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('input-5')),
        {types: ['(cities)']}
      )
      
      autocomplete.addListener("place_changed", () => {
        let place = autocomplete.getPlace()

        //updates v-model value
        document.getElementById('input-5').value = place.formatted_address
        document.getElementById('input-5').dispatchEvent(new Event('input'))
      })
    })  
  },

  methods: {
    registerUser(event) {
      event.preventDefault();
      if (this.formCheck()) {
        this.performPostRequest(this.getEnvVariable('BACKEND_ENDPOINT'), 'register', this.form);
        this.$router.push('/thanks');
      }
    },

    // logic goes here so feedback is only shown after submission
    formCheck() {
      let valid_form = true
      if (this.form.name.length === 0)  {
        this.valid_name = false
        valid_form = false
      } else
        this.valid_name = null
      
      // TODO: maybe include an email regex
      if (!this.form.email.includes("@")) {
        this.valid_email = false
        valid_form = false
      } else
        this.valid_email = null

      if (this.form.school.length === 0) {
        this.valid_school = false
        valid_form = false
      } else
        this.valid_school = null
        
      if (this.form.school_type.length === 0) {
        this.valid_school_type = false
        valid_form = false
      } else
        this.valid_school_type = null

      if (this.form.city.length === 0) {
        this.valid_city = false
        valid_form = false
      } else
        this.valid_city = null
        
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