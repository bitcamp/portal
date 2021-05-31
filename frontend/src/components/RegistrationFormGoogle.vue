<template>
  <b-row>
    <b-col md="1"></b-col>
    <b-col>
      <b-form @submit="registerUser" class="registration-form">
        <h1 style="text-align: center">Register for Technica 2021</h1>

        <p>We've made our new registration process easier and faster!</p>
        <hr>

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
            placeholder="hello@gotechnica.org"
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

        <hr/>
        <p>Give us your shipping address so you can get Technica swag!</p>

        <!-- Shipping Address -->
        <b-form-group id="input-group-5" label="Shipping address" label-for="input-5">
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

        <b-form-group id="input-group-6" label="Address line 2" label-for="input-6">
          <b-form-input
            id="input-6"
            v-model="form.address2"
            name="address"
            autocomplete="address-line2"
            placeholder="Apartment or unit number (optional)"
            class="form-input"
          ></b-form-input>
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
        referred_by: '',
      },

      form_start: Date().now,
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
    // log registration in google analytics
    this.$gtag.event('open-registration', { method: 'Google' })

    document.addEventListener('DOMContentLoaded', () => {
      const autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('input-5')),
        {types: ['address']}
      )
      
      google.maps.event.addListener(autocomplete, "place_changed", () => {
        let place = autocomplete.getPlace()

        //updates v-model value
        document.getElementById('input-5').value = place.formatted_address
        this.form.address = place.formatted_address
        this.form.gmaps_place_id = place.place_id;
      })
    })  
  },

  methods: {
    showErrorToast() {
      this.$bvToast.toast(`Something went wrong. Are you sure you filled everything out?`, {
        toaster: 'b-toaster-top-center',
        solid: true,
        appendToast: false,
        noCloseButton: true,
        variant: 'danger',
      })
    },
    async registerUser(event) {
      event.preventDefault();
      if (this.formCheck()) {
        this.form.time_taken = Date.now() - this.form_start; // time taken to fill out form
        if (this.$route.params.referral) {
          this.$gtag.event('got-referred', { method: 'Google' })
          this.form.referred_by = this.$route.params.referral
        }

        this.$gtag.event('submit-registration', { method: 'Google' })
        this.$gtag.time({
          'name' : 'completion-time',
          'value' : this.form.time_taken,
          'event_category' : 'Form completion duration'
        })

        const resp = await this.performPostRequest(this.getEnvVariable('BACKEND_ENDPOINT'), 'register', this.form);
        if (resp.referral_id) {
          this.$router.push({ path: 'thanks', query: { r: resp.referral_id } });
        } else {
          this.showErrorToast();
        }
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

p {
  text-align: center;
}

.registration-form {
  text-align: left;
}

.form-group {
  padding-bottom: 0.3rem;
}

.form-control, .custom-select {
  border-color: var(--lavender);
  border-radius: 0.6rem;
}

/* .btn-purple {
  background-color: var(--light-lavender);
  color: var(--white);
  border-radius: 0.6rem;
  border-color: var(--light-lavender);
  float: right;
} */

.btn-purple {
  background-color: var(--lavender);
  color: var(--white);
  border-radius: 0.6rem;
  border-color: var(--lavender);
  float: right;
}

.btn-purple:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 16px 0px var(--lavender)
}

</style>