<template>
  <b-row>
    <b-col md="1"></b-col>
    <b-col>
      <b-form @submit="registerUser" class="registration-form">
        <h1 style="text-align: center">Register</h1>
        <h4>Hi there! <br> Please fill out the following</h4>

        <!-- Name and Pronouns -->
        <b-form-row>
          <b-form-group id="input-group-1" label="Full Name" label-for="input-1" class="col-md-8">
            <b-form-input
              id="input-1"
              v-model="form.name"
              name="name"
              autocomplete="name"
              placeholder="Sophie Wilson"
              :state="valid_name"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_name">
              Please enter your name
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-p" label="Pronouns" label-for="input-p" class="col-md-4">
            <b-form-input
              id="input-p"
              v-model="form.pronouns"
              name="pronouns"
              autocomplete="off"
              placeholder="she/her"
              :state="valid_name"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_name">
              Please enter your name
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- Email -->
        <b-form-group id="input-group-2" label="Email" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            name="email"
            autocomplete="email"
            placeholder="Enter email"
            :state="valid_email"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_email">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- School Type -->
        <b-form-group id="input-group-4" label="School Type" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.school_type"
            :options="options"
            :state="valid_school_type"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_school_type">
            Please select a school type
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Shipping Address -->
        <b-form-group id="input-group-5" label="Address" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.address"
            name="address"
            autocomplete="off"
            placeholder="What's your shipping address?"
            class="form-input"
            :state="valid_address"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_address">
            Please your shipping address
          </b-form-invalid-feedback>
        </b-form-group>

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
        pronouns: '',
        school_type: '',
        address: '',
        gmaps_place_id: '',
      },

      valid_name: null,
      valid_email: null,
      valid_school_type: null,
      valid_address: null,

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
        {types: ['address']}
      )
      
      autocomplete.addListener("place_changed", () => {
        let place = autocomplete.getPlace()

        //updates v-model value
        document.getElementById('input-5').value = place.formatted_address
        document.getElementById('input-5').dispatchEvent(new Event('input'))
        this.form.gmaps_place_id = place.place_id;
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

      if (this.form.school_type.length === 0) {
        this.valid_school_type = false
        valid_form = false
      } else
        this.valid_school_type = null

      if (this.form.address.length === 0) {
        this.valid_address = false
        valid_form = false
      } else
        this.valid_address = null
        
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

.form-control, .custom-select {
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