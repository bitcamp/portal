<template>
  <div class="register-wrapper">
    <b-row class="justify-content-center">
      <b-col md="8" lg="7">
        <div class="page-content">
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

            <!-- Row 1: Name -->
            <b-form-row>
              <!-- First Name -->
              <b-form-group
                id="input-group-first-name"
                label="First Name *"
                label-for="input-first-name"
                class="col-md-6"
              >
                <b-form-input
                  id="input-first-name"
                  v-model="formData.first_name"
                  name="firstname"
                  autocomplete="given-name"
                  placeholder="Sophie"
                  :state="validations.first_name"
                />
                <b-form-invalid-feedback :state="validations.first_name">
                  Please enter your first name
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Last Name -->
              <b-form-group
                id="input-group-last-name"
                label="Last Name *"
                label-for="input-last-name"
                class="col-md-6"
              >
                <b-form-input
                  id="input-last-name"
                  v-model="formData.last_name"
                  name="lastname"
                  autocomplete="family-name"
                  placeholder="Wilson"
                  :state="validations.last_name"
                />
                <b-form-invalid-feedback :state="validations.last_name">
                  Please enter your last name
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <!-- Row 2: Email / Phone -->
            <b-form-row>
              <!-- Email -->
              <b-form-group
                id="input-group-email"
                label="Email *"
                label-for="input-email"
                class="col-md-6"
              >
                <b-form-input
                  id="input-email"
                  v-model="formData.email"
                  name="email"
                  autocomplete="email"
                  placeholder="hello@bit.camp"
                  :state="validations.email"
                  type="email"
                  @blur="emailFilledOut"
                />
                <b-form-invalid-feedback :state="validations.email">
                  Please enter a valid email address
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Phone Number -->
              <b-form-group
                id="input-group-phone"
                label="Phone Number *"
                label-for="input-phone"
                class="col-md-6"
              >
                <b-form-input
                  id="input-phone"
                  v-model="formData.phone"
                  name="phone"
                  autocomplete="tel"
                  placeholder="555-555-5555"
                  :state="validations.phone"
                  type="tel"
                />
                <b-form-invalid-feedback :state="validations.phone">
                  Please enter a valid phone number
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <!-- Row 3: Age / Country -->
            <b-form-row>
              <!-- Age -->
              <b-form-group
                id="input-group-age"
                label="Age *"
                label-for="input-age"
                class="col-md-6"
              >
                <b-form-input
                  id="input-age"
                  v-model="formData.age"
                  name="age"
                  autocomplete="age"
                  type="number"
                  min="0"
                  max="120"
                  placeholder="19"
                  :state="validations.age"
                />
                <b-form-invalid-feedback v-if="formData.age.length === 0" :state="validations.age">
                  Please enter your age
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Country of Residence -->
              <b-form-group
                id="input-group-country"
                label="Country of Residence *"
                label-for="input-country"
                class="col-md-6"
              >
                <b-form-select
                  id="input-country"
                  v-model="formData.country_of_residence"
                  class="form-select"
                  :options="countryOptions"
                  :state="validations.country_of_residence"
                />
                <b-form-invalid-feedback :state="validations.country_of_residence">
                  Please select your country of residence
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <!-- Row 4: Gender / Race -->
            <b-form-row>
              <!-- Gender -->
              <b-form-group
                id="input-group-gender"
                label="Gender Identity *"
                label-for="input-gender"
                class="col-md-6"
              >
                <b-form-select
                  id="input-gender"
                  v-model="formData.gender"
                  class="form-select"
                  :options="genderOptions"
                  :state="validations.gender"
                />
                <b-form-invalid-feedback :state="validations.gender">
                  Please select a gender identity
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Race / Ethnicity -->
              <b-form-group
                id="input-group-ethnicity"
                label="Race / Ethnicity *"
                label-for="input-ethnicity"
                class="col-md-6"
              >
                <b-form-select
                  id="input-ethnicity"
                  v-model="formData.ethnicity"
                  :options="ethnicityOptionsSelect"
                  :state="validations.ethnicity"
                />
                <b-form-input
                  v-if="formData.ethnicity === 'other'"
                  v-model="formData.ethnicity_other_text"
                  class="mt-2"
                  aria-label="Ethnicity Other Text Box"
                  placeholder="Other race / ethnicity"
                />
                <b-form-invalid-feedback :state="validations.ethnicity">
                  Please select your race / ethnicity
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <hr />

            <h4 class="section-title">How about your school?</h4>

            <!-- School Name -->
            <b-form-row>
              <b-form-group
                id="input-group-school"
                label="School Name *"
                label-for="input-school"
                class="col-md-12"
              >
                <vue-bootstrap-autocomplete
                  id="input-school"
                  v-model="formData.school"
                  :input-class="schoolClass"
                  input-name="school"
                  placeholder="University of Maryland, College Park"
                  :data="universityOptions"
                  no-results-info="No results found."
                  :disabled="formData.school_other_selected"
                  :state="validations.school"
                />
                <b-form-invalid-feedback v-if="formData.school.length === 0" :state="validations.school">
                  Please enter your school name
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-else :state="validations.school">
                  Please select a school from the list
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <!-- School not listed -->
            <b-form-row>
              <div class="col-md-12">
                <b-form-checkbox
                  v-model="formData.school_other_selected"
                  :state="validations.school_other"
                  @input="resetSchool"
                >
                  My school is not listed above
                </b-form-checkbox>
              </div>
              <b-form-group class="col-md-12">
                <b-form-input
                  v-if="formData.school_other_selected"
                  v-model="formData.school_other"
                  aria-label="School Other Text Box"
                  placeholder="Other school"
                  :state="validations.school_other"
                />
                <b-form-invalid-feedback :state="validations.school_other">
                  Please enter your school name
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <!-- School Year and Major -->
            <b-form-row>
              <b-form-group
                id="input-group-schoolyear"
                label="Current Level of Study *"
                label-for="input-schoolyear"
                class="col-md-6"
              >
                <b-form-select
                  id="input-schoolyear"
                  v-model="formData.school_year"
                  class="form-select"
                  :options="schoolYearOptions"
                  :state="validations.school_year"
                />
                <b-form-invalid-feedback :state="validations.school_year">
                  Please select a year
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-major"
                label="Primary Major *"
                label-for="input-major"
                class="col-md-6"
              >
                <b-form-select
                  id="input-major"
                  v-model="formData.major"
                  class="form-select"
                  :options="majorOptions"
                  :state="validations.major"
                />
                <b-form-invalid-feedback :state="validations.major">
                  Please select a major
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <hr />

            <h4 class="section-title">How did you hear about us?</h4>

            <b-form-row>
              <b-form-group
                id="input-heard-from"
                label="Select all that apply *"
                label-for="input-heard-from"
                class="col-md-12"
              >
                <b-form-select
                  id="input-heard-from"
                  v-model="formData.heard_from_select"
                  :options="heardFromOptions"
                  :state="validations.heard_from"
                  multiple
                />
                <b-form-invalid-feedback :state="validations.heard_from">
                  Please select at least one option
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <!-- Navigation Buttons -->
            <div class="actions">
              <b-button
                type="submit"
                class="submit-btn"
              >
                Next Step
                <b-icon icon="arrow-right" class="ml-1" />
              </b-button>
            </div>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import * as majors_list from "../assets/college-majors.json";
import * as univ_list from "../assets/university-list.json";
import * as country_codes from "../assets/country-codes.json";
import * as EmailValidator from "email-validator";
import parsePhoneNumber from "libphonenumber-js";
import VueBootstrapAutocomplete from "@vue-bootstrap-components/vue-bootstrap-autocomplete";
import Vue from "vue";
import { IconsPlugin } from "bootstrap-vue";

Vue.use(IconsPlugin);
Vue.component("VueBootstrapAutocomplete", VueBootstrapAutocomplete);

const DEFAULT_COUNTRY_PHONE = "US";
const university_list = univ_list.default;
const country_list = country_codes.default.map((country) => country["name"]);

const major_map = majors_list["rows"].map((major) => {
  return {
    value: major[2].toLowerCase(),
    text: major[2]
      .toLowerCase()
      .split(" ")
      .map((word) => (word === "and" ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join(" "),
  };
});

major_map.sort((major1, major2) => {
  return major1["value"] < major2["value"] ? -1 : major1["value"] > major2["value"] ? 1 : 0;
});

export default {
  name: "Page1",
  components: { VueBootstrapAutocomplete },
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
      schoolClass: "typeahead",
      genderOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "female", text: "Female" },
        { value: "male", text: "Male" },
        { value: "nonbinary", text: "Nonbinary" },
        { value: "prefer not to answer", text: "Prefer not to answer" },
        { value: "other", text: "Other" },
      ],
      ethnicityOptions: [
        { value: "asian-indian", text: "Asian Indian" },
        { value: "black-african", text: "Black or African" },
        { value: "chinese", text: "Chinese" },
        { value: "filipino", text: "Filipino" },
        { value: "guamanian-chamorro", text: "Guamanian or Chamorro" },
        { value: "hispanic", text: "Hispanic / Latino / Spanish Origin" },
        { value: "japanese", text: "Japanese" },
        { value: "korean", text: "Korean" },
        { value: "middle-eastern", text: "Middle Eastern" },
        { value: "native-american-alaskan-native", text: "Native American or Alaskan Native" },
        { value: "hawaiian", text: "Native Hawaiian" },
        { value: "samoan", text: "Samoan" },
        { value: "vietnamese", text: "Vietnamese" },
        { value: "white", text: "White" },
        { value: "other-asian", text: "Other Asian (Thai, Cambodian, etc.)" },
        { value: "other-pacific-islander", text: "Other Pacific Islander" },
      ],
      ethnicityOptionsSelect: [
        { value: "", text: "Select one...", disabled: true },
        { value: "asian-indian", text: "Asian Indian" },
        { value: "black-african", text: "Black or African" },
        { value: "chinese", text: "Chinese" },
        { value: "filipino", text: "Filipino" },
        { value: "guamanian-chamorro", text: "Guamanian or Chamorro" },
        { value: "hispanic", text: "Hispanic / Latino / Spanish Origin" },
        { value: "japanese", text: "Japanese" },
        { value: "korean", text: "Korean" },
        { value: "middle-eastern", text: "Middle Eastern" },
        { value: "native-american-alaskan-native", text: "Native American or Alaskan Native" },
        { value: "hawaiian", text: "Native Hawaiian" },
        { value: "samoan", text: "Samoan" },
        { value: "vietnamese", text: "Vietnamese" },
        { value: "white", text: "White" },
        { value: "other-asian", text: "Other Asian (Thai, Cambodian, etc.)" },
        { value: "other-pacific-islander", text: "Other Pacific Islander" },
        { value: "other", text: "Other" },
        { value: "prefer-not-to-answer", text: "Prefer Not to Answer" },
      ],
      schoolYearOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "less than high school", text: "Less than Secondary / High School" },
        { value: "high school", text: "Secondary / High School" },
        { value: "undergrad 2 year", text: "Undergraduate University (2 year - community college or similar)" },
        { value: "undergrad 3+ year", text: "Undergraduate University (3+ year)" },
        { value: "grad", text: "Graduate University (Masters, Professional, Doctoral, etc)" },
        { value: "bootcamp", text: "Code School / Bootcamp" },
        { value: "vocational", text: "Other Vocational / Trade Program or Apprenticeship" },
        { value: "postdoc", text: "Post Doctorate" },
        { value: "other", text: "Other" },
        { value: "not a student", text: "I'm not currently a student" },
        { value: "prefer not to answer", text: "Prefer not to answer" },
      ],
      majorOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "no major", text: "No Major" },
        ...major_map,
        { value: "other", text: "Other" },
      ],
      heardFromOptions: [
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
      universityOptions: [...university_list],
      countryOptions: [{ value: "", text: "Select one...", disabled: true }, ...country_list],
      validations: {
        first_name: null,
        last_name: null,
        age: null,
        email: null,
        phone: null,
        gender: null,
        country_of_residence: null,
        ethnicity: null,
        school: null,
        school_other: null,
        school_year: null,
        major: null,
        heard_from: null,
      },
    };
  },
  methods: {
    emailFilledOut() {
      this.$emit("email-filled", this.formData.email);
    },
    uncheckEthnicity() {
      this.formData.ethnicity = "";
      this.formData.ethnicity_other_text = "";
    },
    resetSchool() {
      if (this.formData.school_other_selected) {
        this.formData.school = "";
      } else {
        this.formData.school_other = "";
      }
    },
    createEthnicityString() {
      if (!this.formData.ethnicity) return "";
      if (this.formData.ethnicity === "other") {
        if (this.formData.ethnicity_other_text && this.formData.ethnicity_other_text.trim() !== "") {
          return `other(${this.formData.ethnicity_other_text.trim()})`;
        }
        return "other";
      }
      return this.formData.ethnicity;
    },
    createHeardFromString() {
      let heard_from_string = this.formData.heard_from_select.join(",");

      if (this.formData.heard_from_other && this.formData.heard_from_other_text != "") {
        if (heard_from_string != "") {
          heard_from_string += ",";
        }
        heard_from_string = heard_from_string + "other(" + this.formData.heard_from_other_text + ")";
      }

      return heard_from_string;
    },
    validateForm() {
      let isValid = true;

      // First Name
      if (this.formData.first_name.length === 0) {
        this.validations.first_name = false;
        isValid = false;
      } else {
        this.validations.first_name = null;
        this.formData.first_name = this.formData.first_name.trim();
      }

      // Last Name
      if (this.formData.last_name.length === 0) {
        this.validations.last_name = false;
        isValid = false;
      } else {
        this.validations.last_name = null;
        this.formData.last_name = this.formData.last_name.trim();
      }

      // Age
      if (this.formData.age.length === 0) {
        this.validations.age = false;
        isValid = false;
      } else {
        this.validations.age = null;
      }

      // Email
      if (!EmailValidator.validate(this.formData.email)) {
        this.validations.email = false;
        isValid = false;
      } else {
        this.validations.email = null;
      }

      // Phone
      const phoneNumber = parsePhoneNumber(this.formData.phone, DEFAULT_COUNTRY_PHONE);
      if (!phoneNumber || !phoneNumber.isValid()) {
        this.validations.phone = false;
        isValid = false;
      } else {
        this.validations.phone = null;
      }

      // Gender
      if (this.formData.gender.length === 0) {
        this.validations.gender = false;
        isValid = false;
      } else {
        this.validations.gender = null;
      }

      // Country of Residence
      if (this.formData.country_of_residence.length === 0) {
        this.validations.country_of_residence = false;
        isValid = false;
      } else {
        this.validations.country_of_residence = null;
      }

      // Ethnicity
      if (this.createEthnicityString().length === 0) {
        this.validations.ethnicity = false;
        isValid = false;
      } else if (this.formData.ethnicity === "other" && !this.formData.ethnicity_other_text.trim()) {
        this.validations.ethnicity = false;
        isValid = false;
      } else {
        this.validations.ethnicity = null;
      }

      // School
      if (this.formData.school_other_selected) {
        this.schoolClass = "typeahead";
        this.validations.school = null;
        if (this.formData.school_other.length === 0) {
          this.validations.school_other = false;
          isValid = false;
        } else {
          this.validations.school_other = null;
        }
      } else {
        if (!university_list.includes(this.formData.school)) {
          this.validations.school = false;
          this.schoolClass = "typeahead is-invalid";
          isValid = false;
        } else {
          this.schoolClass = "typeahead";
          this.validations.school = null;
        }
        this.validations.school_other = null;
      }

      // School Year
      if (this.formData.school_year.length === 0) {
        this.validations.school_year = false;
        isValid = false;
      } else {
        this.validations.school_year = null;
      }

      // Major
      if (this.formData.major.length === 0) {
        this.validations.major = false;
        isValid = false;
      } else {
        this.validations.major = null;
      }

      // Heard From
      if (this.createHeardFromString().length === 0) {
        this.validations.heard_from = false;
        isValid = false;
      } else if (this.formData.heard_from_other && !this.formData.heard_from_other_text.trim()) {
        this.validations.heard_from = false;
        isValid = false;
      } else {
        this.validations.heard_from = null;
      }

      return isValid;
    },
    handleNext(event) {
      event.preventDefault();
      if (this.validateForm()) {
        this.$emit("next");
      } else {
        this.$bvToast.toast("Please fill out all required fields", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
      }
    },
  },
};
</script>

<style scoped>
.register-wrapper {
  min-height: 100vh;
  padding: 40px 0;
  background: linear-gradient(135deg, #f97345 0%, #f9ad4b 55%, #f5a13e 100%);
}

.page-content {
  background: #fff7ee;
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
  padding: 40px 56px 48px;
  text-align: left;
}

.page-title {
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 0.9rem;
  opacity: 0.95;
  color: #555;
  margin-bottom: 22px;
}

.page-subtitle a {
  color: #ff6b35;
  text-decoration: none;
}

.page-subtitle a:hover {
  text-decoration: underline;
}

.section-title {
  font-weight: 700;
  margin-bottom: 6px;
}

.info {
  font-size: 0.9rem;
  opacity: 0.9;
  color: #777;
  margin-bottom: 18px;
}

/* Stepper */
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 18px 0 14px;
}

.stepper-item {
  flex: 1;
  text-align: center;
  font-size: 0.7rem;
  color: #c4c4c4;
}

.stepper-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 auto 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  color: #9a9a9a;
  border: 1px solid #dddddd;
  font-size: 0.85rem;
  font-weight: 600;
}

.stepper-item.active .stepper-circle {
  background: #ff6b35;
  color: #ffffff;
  border-color: #ff6b35;
}

.stepper-label {
  line-height: 1.2;
}

.stepper-item.active .stepper-label {
  color: #ff6b35;
  font-weight: 600;
}

/* Form typography */
label {
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 4px;
}

.form-control,
.form-select {
  font-size: 0.85rem;
  border-radius: 4px;
  border-color: #e3d7ca;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #ff6b35;
  box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.15);
}

hr {
  border-top: 1px solid #f0e0d1;
  margin: 26px 0 22px;
}

/* Button */
.actions {
  text-align: right;
  margin-top: 30px;
}

.submit-btn {
  background-color: #ff6b35;
  border: none;
  color: #ffffff;
  padding: 10px 32px;
  font-weight: 700;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(255, 107, 53, 0.45);
}

.submit-btn:hover,
.submit-btn:focus {
  background-color: #ff7b47;
}

/* Misc */
.b-form-checkbox {
  font-size: 0.8rem;
}
</style>