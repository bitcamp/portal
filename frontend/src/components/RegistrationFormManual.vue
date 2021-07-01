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
            :state="valid_pronouns"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_pronouns">
            Please enter your pronouns
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

        <!-- Phone Number -->
        <b-form-group id="input-group-9" label="Phone" label-for="input-9">
          <b-form-input
            id="input-9"
            v-model="form.phone"
            name="phone"
            autocomplete="tel"
            placeholder="Enter your phone number"
            :state="valid_phone"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_phone">
            Please enter a valid phone number
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- School Type -->
        <b-form-group id="input-group-3" label="School Type" label-for="input-3">
          <b-form-select
            id="input-3"
            v-model="form.school_type"
            :options="options"
            :state="valid_school_type"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_school_type">
            Please select a school type
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Address 1 -->
        <b-form-group id="input-group-4" label="Address line 1" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.address1"
            name="address"
            autocomplete="address"
            placeholder="1234 Main Street"
            :state="valid_address1"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_address1">
            Please enter your address
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Address 2 -->
        <b-form-group id="input-group-5" label="Address line 2" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.address2"
            name="address2"
            autocomplete="address2"
          ></b-form-input>
        </b-form-group>
        
        <!-- City, State, Zip, Country -->
        <b-form-row>
        
          <b-form-group id="input-group-6" label="City" label-for="input-6" class="col-md-4">
            <b-form-input
              id="input-6"
              v-model="form.city"
              name="city"
              autocomplete="city"
              :state="valid_city"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_city">
              Please enter your city
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-7" label="State" label-for="input-7" class="col-md-2">
            <b-form-input
              id="input-7"
              v-model="form.state"
              name="state"
              autocomplete="state"
              :state="valid_state"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_state">
              Please enter your state
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-8" label="Zip Code" label-for="input-8" class="col-md-2">
            <b-form-input
              id="input-8"
              v-model="form.zip"
              name="zip"
              autocomplete="zip"
              :state="valid_zip"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_zip">
              Please enter your zip code
            </b-form-invalid-feedback>
          </b-form-group>
        
          <b-form-group id="input-group-9" label="Country" label-for="input-9" class="col-md-4">
            <b-form-input
              id="input-9"
              v-model="form.country"
              name="country"
              autocomplete="country"
              :state="valid_country"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_country">
              Please enter your country
            </b-form-invalid-feedback>
          </b-form-group>
        
        </b-form-row>

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
        phone: '',
        name: '',
        pronouns: '',
        school_type: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },

      valid_name: null,
      valid_email: null,
      valid_phone: null,
      valid_school: null,
      valid_school_type: null,
      valid_city: null,
      valid_address1: null,
      valid_city: null,
      valid_state: null,
      valid_zip: null,
      valid_country: null,
      
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

      if (this.form.phone.length === 0)  {
        this.valid_phone = false
        valid_form = false
      } else
        this.valid_phone = null
      
      if (this.form.pronouns.length === 0) {
        this.valid_pronouns = false
        valid_form = false
      } else 
        this.valid_pronouns = null

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

      // Start address
      if (this.form.address1.length === 0) {
        this.valid_address1 = false
        valid_form = false
      } else
        this.valid_address1 = null
        
      if (this.form.city.length === 0) {
        this.valid_city = false
        valid_form = false
      } else
        this.valid_city = null
        
      if (this.form.state.length === 0) {
        this.valid_state = false
        valid_form = false
      } else
        this.valid_state = null
        
      if (this.form.zip.length === 0) {
        this.valid_zip = false
        valid_form = false
      } else
        this.valid_zip = null
        
      if (this.form.country.length === 0) {
        this.valid_country = false
        valid_form = false
      } else
        this.valid_country = null
        
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