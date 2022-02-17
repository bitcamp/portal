<template>
  <b-row>
    <b-col md="1"></b-col>
    <b-col md="10">
      <h1 style="text-align: center">Register for Technica 2021</h1>

      <p style="font-size: 0.9rem; opacity: 95%">
        Questions? Chat with us in the bottom right hand corner or email
        <a href="mailto:hello@gotechnica.org">hello@gotechnica.org</a>.
        <br> You can also learn more at <a href="https://gotechnica.org">gotechnica.org</a>!
      </p>
      <hr />
      <b-form @submit="registerUser" class="registration-form" autocomplete="on">
        <!-- Name and Pronouns -->
        <h4>Tell us about yourself!</h4>
        <p class="info">Once you register, you'll receive more info about Technica 2021 at the email you provide.</p>
        <b-form-row>
          <b-form-group id="input-group-1" label="Full Name*" label-for="input-1" class="col-12 col-md-6">
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

          <b-form-group id="input-group-p" label="Pronouns*" label-for="input-p" class="col-6 col-md-3">
            <b-form-input
              id="input-p"
              v-model="form.pronouns"
              name="pronouns"
              autocomplete="off"
              placeholder="e.g. she/her"
              :state="valid_pronouns"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_pronouns">
              Please enter your pronouns
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Date of Birth -->
          <b-form-group id="input-group-birthday" label="Birthday*" label-for="birthday" class="col-6 col-md-3">
            <b-form-input
              id="input-birthday"
              v-model="form.birthday"
              name="birthday"
              autocomplete="bday"
              placeholder="mm/dd/yyyy"
              :state="valid_birthday"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_birthday">
              Please enter your birthday
            </b-form-invalid-feedback>
          </b-form-group>

        </b-form-row>

        <!-- Email -->
        <b-form-row>
        <b-form-group id="input-group-2" label="Email*" label-for="input-2" class="col-7 col-md-6">
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

        <!-- Phone Number -->
        <b-form-group id="input-group-9" label="Phone*" label-for="input-9" class="col-5 col-md-6">
          <b-form-input
            id="input-9"
            v-model="form.phone"
            name="phone"
            autocomplete="tel"
            placeholder="555-555-5555"
            :state="valid_phone"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_phone">
            Please enter a valid phone number
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <!-- School Type -->
        <b-form-row>
        <b-form-group id="input-group-4" label="School Level*" label-for="input-4" class="col-md-3">
          <b-form-select
            id="input-4"
            v-model="form.school_type"
            placeholder="Choose a level"
            :options="school_type_options"
            :state="valid_school_type"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_school_type">
            Please select a school level
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-school" label="School Name*" label-for="input-school" class="col-md-9">
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
        </b-form-row>

        <!-- resume upload -->
        <b-form-row>
        <b-form-group id="input-group-resume" label="Resume" label-for="input-resume" class="col-md-12">
          <b-form-file
            id="input-resume"
            v-model="form.resume"
            name="resume"
            accept=".pdf, .doc, .docx, .txt"
            placeholder="Upload Resume"
            drop-placeholder="Drop file here..."
            @input="upload"
          ></b-form-file>
        </b-form-group>
        </b-form-row>

        <!-- Track selection -->
        <hr />
        <h4>Choose a track!</h4>
        <p class="info">Unfortunately, we've closed our other track registrations. Not to worry, you can still join us in the general track!</p>
        <track-selection v-bind:default="'general'" @picked="updateTrack" />

        <!-- Shipping Address -->
        <hr />
        <h4>Want to give us a shipping address?</h4>
        <p class="info">If you do, we'll try to send you some swag! If you choose the hardware track, this is where we'll send your hardware kit.</p>
        <b-form-group>
        <b-form-group id="input-group-5" label="Shipping Address" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.address1"
            name="address"
            autocomplete="off"
            placeholder="8125 Paint Branch Drive"
            class="form-input"
            :state="valid_address"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-address-line2"
          label="Shipping Address Line 2"
          label-for="input-address-line2"
        >
          <b-form-input
            id="input-address-line2"
            v-model="form.address2"
            name="address-line2"
            autocomplete="address-line2"
            placeholder="Apartment or Unit Number (optional)"
            class="form-input"
            :state="valid_address"
          ></b-form-input>
        </b-form-group>

        <b-form-row>
          <b-form-group id="input-group-city" label="City" label-for="input-city" class="col-8 col-md-5">
            <b-form-input
              id="input-city"
              v-model="form.city"
              name="city"
              autocomplete="off"
              placeholder="College Park"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-state"
            label="State"
            label-for="input-state"
            class="col-4 col-md-2"
          >
            <b-form-input
              id="input-state"
              v-model="form.state"
              name="state"
              autocomplete="off"
              placeholder="MD"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-zip"
            label="Zip Code"
            label-for="input-zip"
            class="col-4 col-md-3"
          >
            <b-form-input
              id="input-zip"
              v-model="form.zip"
              name="zip"
              autocomplete="off"
              placeholder="20740"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-country"
            label="Country"
            label-for="input-country"
            class="col-8 col-md-2"
          >
            <b-form-input
              id="input-country"
              v-model="form.country"
              name="country"
              autocomplete="off"
              placeholder="USA"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>
        </b-form-row>
          <b-form-invalid-feedback :state="valid_address" style="margin: 0">
            Please provide a valid shipping address to apply for the hardware track.
          </b-form-invalid-feedback>
        </b-form-group>

        <hr />
        <!-- T-Shirt Size -->
        <h4 class="mb-2">Select a T-shirt size!</h4>
        <p class="info">We've got T-shirts in XS-XL sizes! Choose whichever size you like, and your very own Bitcamp 2022
          shirt will be given to you once you arrive at UMD.</p>

        <b-form-row>
        <b-form-group id="input-group-tshirt" label="T-shirt Size" label-for="input-tshirt" class="col-md-12">
          <b-form-select
            id="input-4"
            v-model="form.tshirt_size"
            placeholder="Choose a T-shirt size"
            :options="tshirt_size_options"
            :state="valid_tshirt_type"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_tshirt_size">
            Please select a T-shirt size.
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>



        <hr />
        <!-- MLH Stuff -->
        <h4 class="mb-2">Rules and Privacy policies</h4>
        <!--<b-form-checkbox
          id="checkbox-5"
          v-model="form.underrepresented_Gender"
          name="checkbox-5"
          class="checkbox"
          :state="valid_underrepresented_Gender"
        >
          <b>I identify as an underrepresented gender in tech.</b> This includes but is not limited to: cisgender women, transgender women, transgender men, non-binary individuals, gender neutral individuals, genderqueer individuals, and other underrepresented genders.*
          <b-form-invalid-feedback :state="valid_underrepresented_Gender">
            Please acknowledge you identify as a female or another underrepresented gender in tech in order to attend Technica as a hacker. Cisgender men are unfortunately not eligible to attend Technica as a hacker.
          </b-form-invalid-feedback>
        </b-form-checkbox> -->
        <b-form-checkbox
          id="checkbox-2"
          v-model="form.MLH_privacy"
          name="checkbox-2"
          class="checkbox"
          :state="valid_mlh_privacy"
        >
          I authorize you to share my application/registration information with Major League Hacking
          for event administration, ranking, and MLH administration in-line with the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>. I further agree
          to the terms of both the
          <a
            href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
            target="_blank"
            >MLH Contest Terms and Conditions</a
          >
          and the <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>.*
          <b-form-invalid-feedback :state="valid_mlh_privacy">
            Please agree to MLH's privacy policy and terms
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-3"
          v-model="form.MLH_conduct"
          name="checkbox-3"
          :state="valid_code_of_conduct"
          class="checkbox"
          style="padding-bottom: 1rem"
        >
          I have read and agree to the
          <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank"
            >MLH Code of Conduct</a
          >.*
          <b-form-invalid-feedback :state="valid_code_of_conduct">
            Please agree to MLH's code of conduct
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-1"
          v-model="form.MLH_emails"
          name="checkbox-1"
          class="checkbox"
        >
          I authorize MLH to send me pre- and post-event informational emails, which contain free
          credit and opportunities from their partners.
        </b-form-checkbox>

      <!-- Submit -->
      <div>
      <b-button type="submit" class="submit-btn m1 mx-auto" style="center" :disabled="isSending">
         <h5 class="m-1">Confirm Registration for Bitcamp!</h5>
      </b-button>
      </div>
      </b-form>
    </b-col>
    <b-col md="1"></b-col>
  </b-row>
</template>

<script>
import generalMixin from "../mixins/general";
import { v4 as uuid } from "uuid";
import Vue from "vue";
import { FormRadioPlugin, IconsPlugin, FormFilePlugin } from "bootstrap-vue";
import TrackSelection from "./TrackSelection.vue";
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf.js';
import 'pdfjs-dist/build/pdf.worker.entry';

Vue.use(FormRadioPlugin);
Vue.use(IconsPlugin);
Vue.use(FormFilePlugin)

export default {
  name: "RegistrationForm",
  mixins: [generalMixin],
  components: { TrackSelection },

  data() {
    return {
      form: {
        email: (this.$route.query.redo != null)? this.$route.query.redo : "",
        phone: "",
        MLH_emails: false,
        MLH_conduct: false,
        MLH_privacy: false,
        underrepresented_Gender: false,
        name: "",
        pronouns: "",
        school_type: "",
        school: "",
        resume: "",
        resume_link: "",
        resume_id:"",
        birthday: "",
        address: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        tshirt_size: "",
        gmaps_place_id: "",
        referred_by: "",
        track_selected: "general"
      },

      isSending: false,
      random_id: uuid(),
      form_start: Date.now(),
      valid_name: null,
      valid_pronouns: null,
      valid_email: null,
      valid_phone: null,
      valid_school_type: null,
      valid_school: null,
      valid_birthday: null,
      valid_code_of_conduct: null,
      valid_mlh_privacy: null,
      valid_track_selected: null,
      valid_address: null,
      valid_tshirt_size: null,
      valid_underrepresented_Gender: null,

      school_type_options: [
        { value: "", text: "Select one...", disabled: true },
        { value: "middle school", text: "Middle School" },
        { value: "high school", text: "High School" },
        { value: "undergrad", text: "Undergraduate / Bachelors" },
        { value: "graduate", text: "Graduate School / Masters" },
        { value: "phd", text: "PhD / Doctorate" },
        { value: "graduated", text: "Graduated" }
      ],
      tshirt_size_options: [
        { value: "", text: "Select one...", disabled: true },
        { value: "no tshirt", text: "I don't want a T-shirt" },
        { value: "xs", text: "XS" },
        { value: "s", text: "S" },
        { value: "m", text: "M" },
        { value: "l", text: "L" },
        { value: "xl", text: "XL" }
      ]
    };
  },

  mounted() {
    // log registration in google analytics
    this.$gtag.event("open-registration", { method: "Google" });
    this.track({
      random_id: this.random_id,
      key: "open-registration",
      value: true
    });
    this.sendAnalyticsEvent('registration_page_visit');
    document.addEventListener("DOMContentLoaded", () => {
      const input = document.getElementById("input-5");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["address"]
      });

      google.maps.event.addListener(autocomplete, "place_changed", () => {
        let place = autocomplete.getPlace();

        //updates v-model value
        this.form.gmaps_place_id = place.place_id;
        this.form.address = place.formatted_address;
        this.fillInAddress(place);
      });

      google.maps.event.addDomListener(input, "keydown", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          this.form.gmaps_place_id = place.place_id;
        }
      });

      // document.getElementsByClassName("pac-container")[0].setAttribute("data-tap-disabled", "true");
    });
  },

  methods: {
    updateTrack (value) {
      this.form.track_selected = value;
      console.log(value)
    },
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
            this.form.country = document.getElementById("input-country").value =
              component.short_name;
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
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: false,
        noCloseButton: true,
        variant: "danger"
      });
    },
    async registerUser(event) {
      event.preventDefault();
      if (this.formCheck()) {
        // time taken to fill out form in seconds
        this.form.time_taken = (Date.now() - this.form_start) / 1000;

        this.isSending = true; // block double submits

        if (this.$route.params.referral) {
          this.$gtag.event("got-referred", { method: "Google" });
          this.form.referred_by = this.$route.params.referral;
          this.track({
            random_id: this.random_id,
            key: "got-referred",
            value: this.$route.params.referral
          });
        }

        this.$gtag.event("submit-registration", { method: "Google" });
        this.$gtag.time({
          name: "completion-time",
          value: this.form.time_taken,
          event_category: "Form completion duration"
        });
        this.track({
          random_id: this.random_id,
          key: "form-submitted",
          value: this.form.time_taken
        });

        const resp = await this.performPostRequest(
          this.getEnvVariable("BACKEND_ENDPOINT"),
          "signup",
          this.form
        );

        this.isSending = false; // done submitting

        if (resp && resp.referral_id) {
          this.$router.push({ path: "thanks", query: { r: resp.referral_id } });
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
      let valid_form = true;
      if (this.form.name.length === 0) {
        this.valid_name = false;
        valid_form = false;
      } else this.valid_name = null;

      if (this.form.pronouns.length === 0) {
        this.valid_pronouns = false;
        valid_form = false;
      } else this.valid_pronouns = null;

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email)) {
        this.valid_email = false;
        valid_form = false;
      } else this.valid_email = null;

      if (!/[^a-zA-Z]/.test(this.form.phone) || this.form.phone.length < 2) {
        this.valid_phone = false;
        valid_form = false;
      } else this.valid_phone = null;

      if (this.form.school_type.length === 0) {
        this.valid_school_type = false;
        valid_form = false;
      } else this.valid_school_type = null;

      if (this.form.school.length === 0) {
        this.valid_school = false;
        valid_form = false;
      } else this.valid_school = null;

      if (this.form.tshirt_size.length === 0) {
        this.valid_tshirt_size = false;
        valid_form = false;
      } else this.valid_tshirt_size = null;

      if (this.form.birthday.length === 0) {
        this.valid_birthday = false;
        valid_form = false;
      } else this.valid_birthday = null;

      if (!this.form.MLH_conduct) {
        this.valid_code_of_conduct = false;
        valid_form = false;
      } else this.valid_code_of_conduct = null;

      if (!this.form.MLH_privacy) {
        this.valid_mlh_privacy = false;
        valid_form = false;
      } else this.valid_mlh_privacy = null;

      if (this.form.track_selected.length === 0) {
        this.valid_track_selected = false;
        valid_form = false;
      } else this.valid_track_selected = null;

      if (this.form.track_selected === "hardware"
       && this.form.address1.length === 0
       && this.form.address2.length === 0
       && this.form.city.length === 0
       && this.form.state.length === 0
       && this.form.zip.length === 0
       && this.form.country.length === 0) {
        this.valid_address = false;
        valid_form = false;
      } else this.valid_address = null;

      return valid_form;
    },
    async upload(file) {
      const userParams = {
        id: this.random_id,
        filename: this.form.resume.name,
        filetype: this.form.resume.filetype,
      };
      // console.log(this.getEnvVariable("BACKEND_ENDPOINT"));
      const r = await this.performPostRequest(
        this.getEnvVariable('BACKEND_ENDPOINT'),
        'upload_resume',
        userParams,
      );
      await this.performRawPostRequest(r.putUrl, file);
      this.form.resume_link = r.uploadUrl;
      this.form.resume_id = this.random_id;

      // below is for resume parsing
      let text = '';
      const pdfVersion = '2.10.377';
      // eslint-disable-next-line no-import-assign
      PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;

      const loadingTask = PDFJS.getDocument(this.form.resume_link);
      await loadingTask.promise.then((doc) => {
        const { numPages } = doc;

        let lastPromise;
        lastPromise = doc.getMetadata();

        const loadPage = async (pageNum) => {
          const page = await doc.getPage(pageNum);

          return page.getTextContent().then((content) => {
            // we only want the page text (strings)
            const strings = content.items.map((item) => item.str);
            text += strings.join(' ');
          });
        };

        for (let i = 1; i <= numPages; i += 1) {
          lastPromise = lastPromise.then(loadPage.bind(null, i));
        }
        return lastPromise;
      });

      const resumeParams = {
        user_id: this.random_id,
        resume_text: text,
      };
      await this.performPostRequest(
        this.getEnvVariable("BACKEND_ENDPOINT"),
        'upload_text_resume',
        resumeParams,
      );


    },
  }
};
</script>

<style scoped>

h4 {
  margin-top: 1.25rem;
  margin-bottom: 0.25rem;
}

p {
  text-align: center;
}

.info {
  font-size: 1rem;
  text-align: left !important;
  margin-bottom: 1.25rem;
}

.row {
  overflow: hidden;
}

hr {
  position: relative;
  left: -50%;
  width: 200%;
  border-width: 0.125rem;
}

.registration-form {
  text-align: left;
}

.form-control:focus,
.form-control:active,
.custom-select:focus,
.custom-select:active {
  border-color: var(--dark-green) !important;
  outline: 0 !important;
  box-shadow: 0 0 0 0.15rem var(--green) !important;
}

.form-control,
.custom-select {
  border-color: var(--dark-green);
  border-radius: 0.6rem;
}

.btn-purple {
  background-color: #ed648d;
  color: var(--white);
  border-radius: 0.6rem;
  border-color: #dd5e84;
  align-self: center;
}

.btn-purple:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 16px 0px #ed648d;
}

.checkbox {
  padding-bottom: 1rem;
}

.submit-btn {
   width: 100%;
   height: 72px;

   text-align:center;
   margin:auto;

   background: radial-gradient(92.62% 25% at 33.31% 0%, #FFAA6C 0.01%, #FF6A37 50.52%, #FF6A37 100%);
   box-shadow: 0px 10px 30px rgba(176, 148, 132, 0.33);
   border-radius: 6px;
}

@media (min-width: 992px) {
  .submit-btn {
    display: block;
    margin: 0 auto;
  }
}

.submit-btn:disabled {
  animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}

</style>
