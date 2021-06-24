<template>
  <b-row>
    <b-col md="1"></b-col>
    <b-col>
      <b-form @submit="registerUser" class="registration-form" autocomplete="on">
        <h1 style="text-align: center">Register for Technica 2021</h1>

        <p>We've made our new registration process easier and faster!</p>
        <p style="font-size: 0.9rem; opacity:95%">
          If you have any questions about the registration process,
          please chat with us in the bottom right hand corner or reach out to <a href="mailto:hello@gotechnica.org">hello@gotechnica.org</a>.
        </p>
        <hr>

        <!-- Name and Pronouns -->
        <b-form-row>
          <b-form-group id="input-group-1" label="Full Name*" label-for="input-1" class="col-md-8">
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

          <b-form-group id="input-group-p" label="Pronouns*" label-for="input-p" class="col-md-4">
            <b-form-input
              id="input-p"
              v-model="form.pronouns"
              name="pronouns"
              autocomplete="off"
              placeholder="they/them"
              :state="valid_pronouns"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_pronouns">
              Please enter your pronouns
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- Email -->
        <b-form-group id="input-group-2" label="Email*" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            name="email"
            autocomplete="email"
            placeholder="hello@gotechnica.org"
            :state="valid_email"
            @blur="this.emailFilledOut"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_email">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- School Type -->
        <b-form-group id="input-group-4" label="School Level*" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.school_type"
            placeholder="Choose your school level..."
            :options="options"
            :state="valid_school_type"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_school_type">
            Please select a school level
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="input-group-school" label="School Name*" label-for="input-school">
          <b-form-input
            id="input-school"
            v-model="form.school"
            name="school"
            autocomplete="off"
            placeholder="University of Maryland, College Park"
            :state="valid_school"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_school">
            Please enter your school name
          </b-form-invalid-feedback>
        </b-form-group>

        <hr/>
        <p>Give us your shipping address so you can get Technica swag!</p>

        <!-- Shipping Address -->
        <b-form-group id="input-group-5" label="Shipping address" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.address1"
            name="address"
            autocomplete="off"
            placeholder="8125 Paint Branch Drive"
            class="form-input"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-address-line2" label="Shipping address line 2" label-for="input-address-line2">
          <b-form-input
            id="input-address-line2"
            v-model="form.address2"
            name="address-line2"
            autocomplete="address-line2"
            placeholder="Apartment or unit number (optional)"
            class="form-input"
          ></b-form-input>
        </b-form-group>

        <b-form-row>
          <b-form-group id="input-group-city" label="City" label-for="input-city" class="col-md-5">
            <b-form-input
              id="input-city"
              v-model="form.city"
              name="city"
              autocomplete="off"
              placeholder="College Park"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-state" label="State" label-for="input-state" class="col-md-2">
            <b-form-input
              id="input-state"
              v-model="form.state"
              name="state"
              autocomplete="off"
              placeholder="MD"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-zip" label="Zip Code" label-for="input-zip" class="col-md-3">
            <b-form-input
              id="input-zip"
              v-model="form.zip"
              name="zip"
              autocomplete="off"
              placeholder="20740"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-country" label="Country" label-for="input-country" class="col-md-2">
            <b-form-input
              id="input-country"
              v-model="form.country"
              name="country"
              autocomplete="off"
              placeholder="USA"
            ></b-form-input>
          </b-form-group>

        </b-form-row>


        <!-- Submit -->
        <b-button type="submit" variant="purple" class="submit-btn m-1" :disabled="isSending">Submit</b-button>

      </b-form>
    </b-col>
    <b-col md="1"></b-col>
  </b-row>
</template>

<script>
import generalMixin from '../mixins/general';
import { v4 as uuid } from 'uuid';

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
        school: '',
        address: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        gmaps_place_id: '',
        referred_by: '',
      },

      isSending: false,
      random_id: uuid(),
      form_start: Date.now(),
      valid_name: null,
      valid_pronouns: null,
      valid_email: null,
      valid_school_type: null,
      valid_school: null,

      options: [
        { value: "", text: "Choose your school level...", disabled: true },
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
    this.track({
      random_id: this.random_id,
      key: "open-registration",
      value: true
    });

    document.addEventListener('DOMContentLoaded', () => {
      const input = document.getElementById('input-5');
      const autocomplete = new google.maps.places.Autocomplete((input), {types: ['address']})
      
      google.maps.event.addListener(autocomplete, "place_changed", () => {
        let place = autocomplete.getPlace()

        //updates v-model value
        this.form.gmaps_place_id = place.place_id;
        this.form.address = place.formatted_address
        this.fillInAddress(place);
      })
  
      google.maps.event.addDomListener(input, 'keydown', function(event) { 
        if (event.keyCode === 13) { 
            event.preventDefault(); 
            this.form.gmaps_place_id = place.place_id;
        }
      });

      document.getElementsByClassName('pac-container')[0].setAttribute('data-tap-disabled', 'true');
    });
  },

  methods: {
    fillInAddress(place) {
      let address1 = "";
      let postcode = "";

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      // place.address_components are google.maps.GeocoderAddressComponent objects
      // which are documented at http://goo.gle/3l5i5Mr
      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            address1 = `${component.long_name} ${address1}`;
            break;
          }

          case "route": {
            address1 += component.short_name;
            break;
          }

          case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
          }

          case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            break;
          }
          case "locality":
            this.form.city = document.getElementById("input-city").value = component.long_name;
            break;

          case "administrative_area_level_1": {
            this.form.state = document.getElementById("input-state").value = component.short_name;
            break;
          }
          case "country":
            this.form.country = document.getElementById("input-country").value = component.short_name;
            break;
        }
      }
      this.form.address1 = document.getElementById("input-5").value = address1;
      this.form.zip = document.getElementById("input-zip").value = postcode;
      // After filling the form with address components from the Autocomplete
      // prediction, set cursor focus on the second address line to encourage
      // entry of subpremise information such as apartment, unit, or floor number.
      document.getElementById("input-address-line2").focus();
    },
    emailFilledOut() {
      this.track({
        random_id: this.random_id,
        key: "filled-email",
        value: this.form.email
      });
    },
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
        // time taken to fill out form in seconds
        this.form.time_taken = (Date.now() - this.form_start)/1000;

        this.isSending = true; // block double submits
        
        if (this.$route.params.referral) {
          this.$gtag.event('got-referred', { method: 'Google' })
          this.form.referred_by = this.$route.params.referral
          this.track({
            random_id: this.random_id,
            key: "got-referred",
            value: this.$route.params.referral
          });
        }

        this.$gtag.event('submit-registration', { method: 'Google' })
        this.$gtag.time({
          'name' : 'completion-time',
          'value' : this.form.time_taken,
          'event_category' : 'Form completion duration'
        })
        this.track({
          random_id: this.random_id,
          key: "form-submitted",
          value: this.form.time_taken
        });

        const resp = await this.performPostRequest(this.getEnvVariable('BACKEND_ENDPOINT'), 'register', this.form);

        this.isSending = false; // done submitting

        if (resp && resp.referral_id) {
          this.$router.push({ path: 'thanks', query: { r: resp.referral_id } });
          this.track({
            random_id: this.random_id,
            key: "referral_id",
            value: resp.referral_id
          });

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
      
      if (this.form.pronouns.length === 0) {
        this.valid_pronouns = false
        valid_form = false
      } else 
        this.valid_pronouns = null

      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email))) {
        this.valid_email = false
        valid_form = false
      } else
        this.valid_email = null

      if (this.form.school_type.length === 0) {
        this.valid_school_type = false
        valid_form = false
      } else
        this.valid_school_type = null
      
      if (this.form.school.length === 0) {
        this.valid_school = false
        valid_form = false
      } else 
        this.valid_school = null
        
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

/* .btn-purple {mt-lg-3
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

.submit-btn {
  display: block;
  width: 100%;
}

@media (min-width: 992px) {
  .submit-btn {
    display: unset;
    width: unset;
  }
}

</style>