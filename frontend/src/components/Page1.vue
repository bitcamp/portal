<template>
  <div class="register-page">
    <h1 class="page-title">Register for Bitcamp 2026</h1>

    <p class="page-subtitle">
      Questions? Chat with us in the bottom right hand corner or email
      <a href="mailto:hello@bit.camp">hello@bit.camp</a>. You can also learn more at
      <a href="https://bit.camp" target="_blank" rel="noopener">bit.camp</a>!
    </p>

    <!-- Step Indicator -->
    <div class="stepper">
      <div
        v-for="step in steps"
        :key="step.number"
        class="stepper-item"
        :class="{ active: step.number === 1 }"
      >
        <div class="stepper-circle">
          {{ step.number }}
        </div>
        <div class="stepper-label">
          {{ step.label }}
        </div>
      </div>
    </div>

    <hr />

    <b-form @submit="handleNext">
      <h4 class="section-title">Tell us about yourself!</h4>
      <p class="info">
        Once you register, you'll receive more info about Bitcamp 2026 at the email you provide.
      </p>

      <!-- First & Last Name -->
      <b-form-row>
        <b-form-group class="col-md-6" label="First Name *" label-for="input-first-name">
          <b-form-input
            id="input-first-name"
            v-model="formData.first_name"
            @input="touched.first_name = true"
            :state="showState('first_name')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6" label="Last Name *" label-for="input-last-name">
          <b-form-input
            id="input-last-name"
            v-model="formData.last_name"
            @input="touched.last_name = true"
            :state="showState('last_name')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Email & Phone -->
      <b-form-row>
        <b-form-group class="col-md-6" label="Email *">
          <b-form-input
            type="email"
            v-model="formData.email"
            @input="touched.email = true"
            :state="showState('email')"
          />
          <b-form-invalid-feedback>Please enter a valid email</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6" label="Phone Number *">
          <b-form-input
            type="tel"
            v-model="formData.phone"
            @input="touched.phone = true"
            :state="showState('phone')"
          />
          <b-form-invalid-feedback>Please enter a valid phone number</b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Age / Country -->
      <b-form-row>
        <b-form-group class="col-md-6" label="Age *">
          <b-form-input
            type="number"
            v-model="formData.age"
            @input="touched.age = true"
            :state="showState('age')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6" label="Country of Residence *">
          <b-form-select
            v-model="formData.country_of_residence"
            :options="countryOptions"
            @change="touched.country_of_residence = true"
            :state="showState('country_of_residence')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Gender / Ethnicity -->
      <b-form-row>
        <b-form-group class="col-md-6" label="Gender Identity *">
          <b-form-select
            v-model="formData.gender"
            :options="genderOptions"
            @change="touched.gender = true"
            :state="showState('gender')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6" label="Race / Ethnicity *">
          <b-form-select
            v-model="formData.ethnicity"
            :options="ethnicityOptionsSelect"
            @change="touched.ethnicity = true"
            :state="showState('ethnicity')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <hr />

      <h4 class="section-title">How about your school?</h4>

      <!-- School Name -->
      <b-form-row>
        <b-form-group class="col-12" label="School Name *">
          <vue-bootstrap-autocomplete
            v-model="formData.school"
            :data="universityOptions"
            @input="touched.school = true"
            :state="showState('school')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Other school checkbox -->
      <b-form-row>
        <div class="col-12">
          <b-form-checkbox v-model="formData.school_other_selected" @change="resetSchool">
            My school is not listed
          </b-form-checkbox>
        </div>

        <b-form-group class="col-12">
          <b-form-input
            v-if="formData.school_other_selected"
            v-model="formData.school_other"
            @input="touched.school_other = true"
            :state="showState('school_other')"
            placeholder="Other school"
          />
        </b-form-group>
      </b-form-row>

      <!-- Level of Study / Major -->
      <b-form-row>
        <b-form-group class="col-md-6" label="Current Level of Study *">
          <b-form-select
            v-model="formData.school_year"
            :options="schoolYearOptions"
            @change="touched.school_year = true"
            :state="showState('school_year')"
          />
        </b-form-group>

        <b-form-group class="col-md-6" label="Primary Major *">
          <b-form-select
            v-model="formData.major"
            :options="majorOptions"
            @change="touched.major = true"
            :state="showState('major')"
          />
        </b-form-group>
      </b-form-row>

      <hr />

      <h4 class="section-title">How did you hear about us?</h4>

      <!-- Single-select dropdown -->
      <b-form-row>
        <b-form-group class="col-12" label="Select one *">
          <b-form-select
            v-model="formData.heard_from_select"
            :options="heardFromOptions"
            @change="touched.heard_from = true"
            :state="showState('heard_from')"
          />
          <b-form-invalid-feedback>Required field</b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Navigation Buttons -->
      <div class="actions">
        <b-button
          type="button"
          class="submit-btn prev-btn"
          @click="$emit('previous')"
        >
          <b-icon icon="arrow-left" class="mr-1" /> Previous
        </b-button>

        <b-button type="submit" class="submit-btn next-btn">
          Next Step <b-icon icon="arrow-right" class="ml-1" />
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import * as majors_list from "../assets/college-majors.json";
import * as univ_list from "../assets/university-list.json";
import * as country_codes from "../assets/country-codes.json";
import EmailValidator from "email-validator";
import parsePhoneNumber from "libphonenumber-js";
import VueBootstrapAutocomplete from "@vue-bootstrap-components/vue-bootstrap-autocomplete";
import Vue from "vue";
import { IconsPlugin } from "bootstrap-vue";

Vue.use(IconsPlugin);
Vue.component("VueBootstrapAutocomplete", VueBootstrapAutocomplete);

const university_list = univ_list.default;
const country_list = country_codes.default.map((c) => c.name);

const major_map = majors_list.rows
  .map((major) => ({
    value: major[2].toLowerCase(),
    text: major[2],
  }))
  .sort((a, b) => a.text.localeCompare(b.text));

export default {
  name: "Page1",
  props: { formData: Object },

  data() {
    return {
      steps: [
        { number: 1, label: "Personal Info" },
        { number: 2, label: "Track & Experience" },
        { number: 3, label: "Attendance Details" },
        { number: 4, label: "Campfire Games" },
        { number: 5, label: "Team Matching" },
        { number: 6, label: "Minor Waivers" },
        { number: 7, label: "Finalize & Submit" },
      ],

      touched: {
        first_name: false,
        last_name: false,
        email: false,
        phone: false,
        age: false,
        gender: false,
        country_of_residence: false,
        ethnicity: false,
        school: false,
        school_other: false,
        school_year: false,
        major: false,
        heard_from: false,
      },

      validations: {},

      heardFromOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "instagram", text: "Instagram" },
        { value: "facebook", text: "Facebook" },
        { value: "twitter", text: "Twitter" },
        { value: "tiktok", text: "TikTok" },
        { value: "youtube", text: "YouTube" },
        { value: "linkedin", text: "LinkedIn" },
        { value: "google", text: "Google" },
        { value: "mlh", text: "Major League Hacking" },
        { value: "email", text: "Email Listserv" },
        { value: "flyer", text: "Flyer or Poster" },
        { value: "friend", text: "Friend" },
      ],

      genderOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "female", text: "Female" },
        { value: "male", text: "Male" },
        { value: "nonbinary", text: "Nonbinary" },
        { value: "prefer not to answer", text: "Prefer not to answer" },
        { value: "other", text: "Other" },
      ],

      ethnicityOptionsSelect: [
        { value: "", text: "Select one...", disabled: true },
        { value: "asian-indian", text: "Asian Indian" },
        { value: "black-african", text: "Black or African" },
        { value: "chinese", text: "Chinese" },
        { value: "filipino", text: "Filipino" },
        { value: "hispanic", text: "Hispanic / Latino" },
        { value: "white", text: "White" },
        { value: "other", text: "Other" },
      ],

      schoolYearOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "high school", text: "Secondary / High School" },
        { value: "undergrad", text: "Undergraduate" },
        { value: "grad", text: "Graduate" },
        { value: "other", text: "Other" },
      ],

      majorOptions: [
        { value: "", text: "Select one...", disabled: true },
        ...major_map,
        { value: "other", text: "Other" },
      ],

      universityOptions: [...university_list],

      countryOptions: [
        { value: "", text: "Select one...", disabled: true },
        ...country_list,
      ],
    };
  },

  methods: {
    showState(field) {
      if (!this.touched[field]) return null;
      const current = this.computeFieldValidity(field);
      if (current) return true;
      if (this.validations[field] !== undefined) return !!this.validations[field];
      return false;
    },

    req(v) {
      return v && v.toString().trim().length > 0;
    },

    computeFieldValidity(field) {
      if (field === "email") {
        return EmailValidator.validate(this.formData.email);
      }

      if (field === "phone") {
        const phone = parsePhoneNumber(this.formData.phone || "", "US");
        return phone && phone.isValid();
      }

      if (field === "school") {
        if (this.formData.school_other_selected) {
          return this.req(this.formData.school_other);
        }
        return this.req(this.formData.school);
      }

      if (field === "heard_from") {
        return this.req(this.formData.heard_from_select);
      }

      return this.req(this.formData[field]);
    },

    resetSchool() {
      if (this.formData.school_other_selected) {
        this.formData.school = "";
      } else {
        this.formData.school_other = "";
      }
    },

    validate() {
      const req = (v) => v && v.toString().trim().length > 0;

      this.validations.first_name = req(this.formData.first_name);
      this.validations.last_name = req(this.formData.last_name);
      this.validations.age = req(this.formData.age);
      this.validations.gender = req(this.formData.gender);
      this.validations.country_of_residence = req(
        this.formData.country_of_residence
      );
      this.validations.ethnicity = req(this.formData.ethnicity);
      this.validations.school_year = req(this.formData.school_year);
      this.validations.major = req(this.formData.major);
      this.validations.heard_from = req(this.formData.heard_from_select);

      this.validations.email = EmailValidator.validate(this.formData.email);

      const phone = parsePhoneNumber(this.formData.phone || "", "US");
      this.validations.phone = phone && phone.isValid();

      if (this.formData.school_other_selected) {
        this.validations.school_other = req(this.formData.school_other);
      } else {
        this.validations.school = req(this.formData.school);
      }

      return Object.values(this.validations).every((v) => v);
    },

    handleNext(e) {
      e.preventDefault();

      Object.keys(this.touched).forEach((key) => (this.touched[key] = true));

      if (!this.validate()) {
        this.$bvToast.toast("Please fill out all required fields", {
          toaster: "b-toaster-top-center",
          variant: "danger",
        });
        return;
      }

      this.$emit("next");
    },
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

/* gradient background */
body {
  background-image: none !important;
  background: linear-gradient(135deg, #f97345 0%, #f9ad4b 55%, #f5a13e 100%) fixed;
}

/* centered form */
.register-page {
  max-width: 760px;
  margin: 40px auto 80px;
  padding: 0 20px;
  text-align: left;
}

.page-title {
  font-size: 2.4rem;
  font-weight: 800;
}

.page-subtitle {
  font-size: 1rem;
  color: #333;
}

.page-subtitle a {
  color: #ff6b35;
  text-decoration: none;
}

/* Stepper */
.stepper {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.stepper-item {
  text-align: center;
  flex: 1;
  font-size: 0.75rem;
  color: #c4c4c4;
}

.stepper-circle {
  width: 30px;
  height: 30px;
  margin: 0 auto 6px;
  border-radius: 50%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepper-item.active .stepper-circle {
  background: #ff6b35;
  color: white;
}

/* Buttons */
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.submit-btn {
  padding: 10px 30px;
  font-weight: 700;
  border-radius: 6px;
}

/* FORCE override Bootstrap grey buttons */
button.btn.submit-btn.prev-btn,
a.btn.submit-btn.prev-btn {
  background-color: #f5f5f5 !important;
  color: #ff6b35 !important;
  border: 1px solid #ff6b35 !important;
}

button.btn.submit-btn.next-btn,
a.btn.submit-btn.next-btn {
  background-color: #ff6b35 !important;
  color: #ffffff !important;
  border: none !important;
  box-shadow: 0 6px 16px rgba(255, 107, 53, 0.45) !important;
}

button.btn.submit-btn.next-btn:hover,
a.btn.submit-btn.next-btn:hover {
  background-color: #ff7b47 !important;
}
</style>