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
        :class="{ active: step.number === currentPage, completed: step.number < currentPage }"
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
        <b-form-group class="col-md-6">
          <template #label> First Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-first-name"
            v-model="formData.first_name"
            @input="touched.first_name = true"
            :state="showState('first_name')"
          />
          <b-form-invalid-feedback :state="showState('first_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Last Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-last-name"
            v-model="formData.last_name"
            @input="touched.last_name = true"
            :state="showState('last_name')"
          />
          <b-form-invalid-feedback :state="showState('last_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Email & Phone -->
      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Email <span class="text-danger">*</span></template>
          <b-form-input
            v-model="formData.email"
            type="email"
            @input="touched.email = true"
            :state="showState('email')"
          />
          <b-form-invalid-feedback :state="showState('email')">
            Please enter a valid email
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Phone Number <span class="text-danger">*</span></template>
          <b-form-input
            v-model="formData.phone"
            type="tel"
            @input="touched.phone = true"
            :state="showState('phone')"
          />
          <b-form-invalid-feedback :state="showState('phone')">
            Please enter a valid phone number
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Age / Country -->
      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Age <span class="text-danger">*</span></template>
          <b-form-input
            v-model="formData.age"
            type="number"
            @input="touched.age = true"
            :state="showState('age')"
          />
          <b-form-invalid-feedback :state="showState('age')">
            Please enter your real age
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Country of Residence <span class="text-danger">*</span></template>
          <b-form-select
            v-model="formData.country_of_residence"
            :options="countryOptions"
            @change="touched.country_of_residence = true"
            :state="showState('country_of_residence')"
          />
          <b-form-invalid-feedback :state="showState('country_of_residence')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Gender / Ethnicity -->
      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Gender Identity <span class="text-danger">*</span></template>
          <b-form-select
            v-model="formData.gender"
            :options="genderOptions"
            @change="touched.gender = true"
            :state="showState('gender')"
          />
          <b-form-invalid-feedback :state="showState('gender')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Race / Ethnicity <span class="text-danger">*</span></template>
          <b-form-select
            v-model="formData.ethnicity"
            :options="ethnicityOptionsSelect"
            @change="touched.ethnicity = true"
            :state="showState('ethnicity')"
          />
          <b-form-invalid-feedback :state="showState('ethnicity')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <hr />

      <h4 class="section-title">How about your school?</h4>

      <!-- School Name -->
      <b-form-row>
        <b-form-group class="col-12">
          <template #label> School Name <span class="text-danger">*</span></template>
          <vue-bootstrap-autocomplete
            v-model="formData.school"
            no-results-info="No results found."
            :input-class="school_class"
            :data="universityOptions"
            :disabled="formData.school_other_selected"
            @input="touched.school = true"
            :state="showState('school')"
          />
          <b-form-invalid-feedback v-if="formData.school.length === 0" :state="showState('school')">
            Please enter your school name
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else :state="showState('school')">
            Please select a school from the list
          </b-form-invalid-feedback>
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
          <b-form-invalid-feedback :state="showState('school_other')">
            Please enter a valid school
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Level of Study / Major -->
      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Current Level of Study <span class="text-danger">*</span></template>
          <b-form-select
            v-model="formData.school_year"
            :options="schoolYearOptions"
            @change="touched.school_year = true"
            :state="showState('school_year')"
          />
          <b-form-invalid-feedback :state="showState('school_year')">
            Required Field
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Primary Major <span class="text-danger">*</span></template>
          <b-form-select
            v-model="formData.major"
            :options="majorOptions"
            @change="touched.major = true"
            :state="showState('major')"
          />
          <b-form-invalid-feedback :state="showState('major')">
            Required Field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <hr />

      <h4 class="section-title">How did you hear about us?</h4>

      <!-- Single-select dropdown -->
      <b-form-row>
        <b-form-group class="col-12">
          <template #label> Select one <span class="text-danger">*</span></template>
          <b-form-select
            v-model="formData.heard_from"
            :options="heardFromOptions"
            @change="touched.heard_from = true"
            :state="showState('heard_from')"
          />
          <b-form-invalid-feedback :state="showState('heard_from')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <!-- Navigation Buttons -->
      <div class="actions">
        <b-button type="button" class="submit-btn prev-btn" @click="$emit('previous')">
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

const firstPageValidatedFields = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "age",
  "gender",
  "country_of_residence",
  "ethnicity",
  "school",
  "school_other",
  "school_year",
  "major",
  "heard_from",
];

export default {
  name: "Page1",

  props: {
    formData: {
      type: Object,
      required: true,
    },
  },

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

      touched: Object.fromEntries(firstPageValidatedFields.map((key) => [key, false])),

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
        { value: "less than high school", text: "Less than Secondary / High School" },
        { value: "high school", text: "Secondary / High School" },
        {
          value: "undergrad 2 year",
          text: "Undergraduate University (2 year - community college or similar)",
        },
        { value: "undergrad 3+ year", text: "Undergraduate University (3+ year)" },
        { value: "grad", text: "Graduate University (Masters, Professional, Doctoral, etc)" },
        { value: "bootcamp", text: "Code School / Bootcamp" },
        { value: "vocational", text: "Other Vocational / Trade Program or Apprenticeship" },
        { value: "postdoc", text: "Post Doctorate" },
        { value: "other", text: "Other" },
        { value: "not a student", text: "I’m not currently a student" },
        { value: "prefer not to answer", text: "Prefer not to answer" },
      ],

      majorOptions: [
        { value: "", text: "Select one...", disabled: true },
        ...major_map,
        { value: "other", text: "Other" },
      ],

      universityOptions: [...university_list],

      countryOptions: [{ value: "", text: "Select one...", disabled: true }, ...country_list],
    };
  },

  computed: {
    validations() {
      const req = (v) => v && v.toString().trim().length > 0;
      const phone = parsePhoneNumber(this.formData.phone || "", "US");

      return {
        first_name: req(this.formData.first_name),
        last_name: req(this.formData.last_name),
        age: req(this.formData.age) && this.formData.age > 0 && this.formData.age <= 120,
        gender: req(this.formData.gender),
        country_of_residence: req(this.formData.country_of_residence),
        ethnicity: req(this.formData.ethnicity),
        school_year: req(this.formData.school_year),
        major: req(this.formData.major),
        heard_from: req(this.formData.heard_from),
        email: EmailValidator.validate(this.formData.email),
        phone: phone && phone.isValid(),
        school: !this.formData.school_other_selected
          ? req(this.formData.school) && univ_list.default.includes(this.formData.school)
          : true,
        school_other: this.formData.school_other_selected ? req(this.formData.school_other) : true,
      };
    },

    school_class() {
      const state = this.showState("school");
      if (state === true) return "typeahead is-valid";
      if (state === false) return "typeahead is-invalid";
      return "typeahead";
    },

    // The step number for this page (used by the stepper UI)
    currentPage() {
      return 1;
    },
  },

  methods: {
    showState(field) {
      if (!this.touched[field]) return null;
      return this.validations[field] === true ? true : false;
    },

    resetSchool() {
      if (this.formData.school_other_selected) {
        this.formData.school = "";
        this.touched.school = false;
      } else {
        this.formData.school_other = "";
        this.touched.school_other = false;
      }
    },

    validate() {
      return firstPageValidatedFields.every((fieldName) => this.validations[fieldName]);
    },

    handleNext(e) {
      console.log("TOUCHED", this.touched);
      console.log("FORM DATA", this.formData);
      e.preventDefault();

      firstPageValidatedFields.forEach((key) => {
        if (
          (key === "school" && this.formData.school_other_selected) ||
          (key === "school_other" && !this.formData.school_other_selected)
        ) {
          this.touched[key] = false;
          return;
        }
        this.touched[key] = true;
      });

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

/* Stepper */
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 40px 0;
  position: relative;
  padding: 0 20px;
}

.stepper-item {
  flex: 1;
  text-align: center;
  font-size: 1rem;
  color: #666;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stepper-circle {
  width: 50px;
  height: 50px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: #999;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  flex-shrink: 0;
  border: 3px solid #e0e0e0;
}

.stepper-item.active .stepper-circle {
  background: #ff6b35;
  color: #ffffff;
  border-color: #ff6b35;
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
}
.stepper-item.completed .stepper-circle {
  background: #ff6b35;
  color: #ffffff;
  border-color: #ff6b35;
}

.stepper-item.completed .stepper-circle {
  background: #ff6b35;
  color: white;
  border-color: #ff6b35;
}

.stepper-label {
  font-weight: 400;
  line-height: 1.4;
  padding: 0 8px;
  color: #333;
  font-size: 0.95rem;
}

.stepper-item.active .stepper-label {
  color: #ff6b35;
  font-weight: 700;
}
.stepper-item.completed .stepper-label {
  color: #ff6b35;
  font-weight: 700;
}

.stepper-item.completed .stepper-label {
  color: #ff6b35;
  font-weight: 700;
}

/* Connecting lines */
.stepper-item::before {
  content: '';
  position: absolute;
  width: calc(100% - 80px);
  height: 4px;
  background: #d3d3d3;
  top: 40px;
  left: 40px;
  z-index: 1;
  transition: background 0.3s ease;
}

.stepper-item:first-child::before {
  display: none;
}

.stepper-item.completed::before {
  background: #ff6b35;
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
