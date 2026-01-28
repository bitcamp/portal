<template>
  <div class="register-page">
    <h1 class="page-title">Register for Bitcamp 2026</h1>

    <p class="page-subtitle">
      Questions? Chat with us in the bottom right hand corner or email
      <a href="mailto:hello@bit.camp">hello@bit.camp</a>. You can also learn more at
      <a href="https://bit.camp" target="_blank" rel="noopener">bit.camp</a>!
    </p>

    <div class="stepper">
      <div
        v-for="step in steps"
        :key="step.number"
        class="stepper-item"
        :class="{
          active: step.number === currentPage,
          completed: step.number < currentPage,
          inactive: step.number > currentPage,
        }"
      >
        <div class="stepper-circle">
          <span v-if="step.number < currentPage" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
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

      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> First Name <span class="text-danger">*</span> </template>
          <b-form-input
            id="input-first-name"
            v-model="formData.first_name"
            :state="showState('first_name')"
            @input="touched.first_name = true"
          />
          <b-form-invalid-feedback :state="showState('first_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Last Name <span class="text-danger">*</span> </template>
          <b-form-input
            id="input-last-name"
            v-model="formData.last_name"
            :state="showState('last_name')"
            @input="touched.last_name = true"
          />
          <b-form-invalid-feedback :state="showState('last_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Email <span class="text-danger">*</span> </template>
          <b-form-input
            v-model="formData.email"
            type="email"
            :state="showState('email')"
            @input="touched.email = true"
          />
          <b-form-invalid-feedback :state="showState('email')">
            Please enter a valid email
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Phone Number <span class="text-danger">*</span> </template>
          <b-form-input
            v-model="formData.phone"
            type="tel"
            :state="showState('phone')"
            @input="touched.phone = true"
          />
          <b-form-invalid-feedback :state="showState('phone')">
            Please enter a valid phone number
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Age <span class="text-danger">*</span> </template>
          <b-form-input
            v-model="formData.age"
            type="number"
            :state="showState('age')"
            @input="touched.age = true"
          />
          <b-form-invalid-feedback :state="showState('age')">
            Please enter your real age
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Country of Residence <span class="text-danger">*</span> </template>
          <b-form-select
            v-model="formData.country_of_residence"
            :options="countryOptions"
            :state="showState('country_of_residence')"
            @change="touched.country_of_residence = true"
          />
          <b-form-invalid-feedback :state="showState('country_of_residence')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Gender Identity <span class="text-danger">*</span> </template>
          <b-form-select
            v-model="formData.gender"
            :options="genderOptions"
            :state="showState('gender')"
            @change="touched.gender = true"
          />
          <b-form-invalid-feedback :state="showState('gender')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Race / Ethnicity <span class="text-danger">*</span> </template>
          <b-form-tags
            id="tags-component-select"
            v-model="value"
            size="lg"
            class="mb-2"
            add-on-change
            no-outer-focus
          >
            <template #default="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
              <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                <li v-for="tag in tags" :key="tag" class="list-inline-item">
                  <b-form-tag
                    :title="tag"
                    :disabled="disabled"
                    variant="info"
                    @remove="removeTag(tag)"
                  >
                    {{ tag }}
                  </b-form-tag>
                </li>
              </ul>
              <b-form-select
                v-bind="inputAttrs"
                :disabled="disabled || availableOptions.length === 0"
                :options="availableOptions"
                v-on="inputHandlers"
              >
                <template #first>
                  <option disabled value="">Select...</option>
                </template>
              </b-form-select>
            </template>
          </b-form-tags>
          <!-- <b-form-select
            v-model="formData.ethnicity"
            :options="ethnicityOptionsSelect"
            :state="showState('ethnicity')"
            @change="touched.ethnicity = true"
          />
          <b-form-invalid-feedback :state="showState('ethnicity')">
            Required field
          </b-form-invalid-feedback> -->
        </b-form-group>
      </b-form-row>

      <hr />

      <h4 class="section-title">How about your school?</h4>

      <b-form-row>
        <b-form-group class="col-12">
          <template #label> School Name <span class="text-danger">*</span> </template>
          <vue-bootstrap-autocomplete
            v-model="formData.school"
            no-results-info="No results found."
            :input-class="school_class"
            :data="universityOptions"
            :disabled="formData.school_other_selected"
            @input="touched.school = true"
          />
          <b-form-invalid-feedback v-if="formData.school.length === 0" :state="showState('school')">
            Please enter your school name
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else :state="showState('school')">
            Please select a school from the list
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

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
            :state="showState('school_other')"
            placeholder="Other school"
            @input="touched.school_other = true"
          />
          <b-form-invalid-feedback :state="showState('school_other')">
            Please enter a valid school
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Current Level of Study <span class="text-danger">*</span> </template>
          <b-form-select
            v-model="formData.school_year"
            :options="schoolYearOptions"
            :state="showState('school_year')"
            @change="touched.school_year = true"
          />
          <b-form-invalid-feedback :state="showState('school_year')">
            Required Field
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="col-md-6">
          <template #label> Primary Major <span class="text-danger">*</span> </template>
          <b-form-select
            v-model="formData.major"
            :options="majorOptions"
            :state="showState('major')"
            @change="touched.major = true"
          />
          <b-form-invalid-feedback :state="showState('major')">
            Required Field
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <hr />

      <h4 class="section-title">How did you hear about us?</h4>

      <b-form-row>
        <b-form-group class="col-12">
          <template #label> Select all that apply <span class="text-danger">*</span> </template>
          <b-form-tags
            id="heard-from-tags"
            v-model="formData.heard_from"
            size="lg"
            add-on-change
            no-outer-focus
          >
            <template #default="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
              <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                <li v-for="tag in tags" :key="tag" class="list-inline-item">
                  <b-form-tag
                    :title="tag"
                    :disabled="disabled"
                    variant="info"
                    @remove="removeTag(tag)"
                  >
                    {{ tag }}
                  </b-form-tag>
                </li>
              </ul>
              <b-form-select
                v-bind="inputAttrs"
                :disabled="disabled || availableHeardFromOptions.length === 0"
                :options="availableHeardFromOptions"
                v-on="inputHandlers"
              >
                <template #first>
                  <option disabled value="">Select...</option>
                </template>
              </b-form-select>
            </template>
          </b-form-tags>
        </b-form-group>
      </b-form-row>

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
  name: "PersonalInfoPage1",

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
        // { value: "", text: "Select one...", disabled: true },
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
        // { value: "", text: "Select one...", disabled: true },
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
      value: [],
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
          ? req(this.formData.school) && university_list.includes(this.formData.school)
          : true,
        school_other: this.formData.school_other_selected ? req(this.formData.school_other) : true,
      };
    },

    availableOptions() {
      return this.ethnicityOptionsSelect.filter((opt) => this.value.indexOf(opt) === -1);
    },

    availableHeardFromOptions() {
      return this.heardFromOptions.filter((opt) => !this.formData.heard_from.includes(opt.text));
    },

    school_class() {
      const state = this.showState("school");
      if (state === true) return "typeahead is-valid";
      if (state === false) return "typeahead is-invalid";
      return "typeahead";
    },

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

<style scoped>
.register-page {
  max-width: 820px;
  margin: 40px auto 80px;
  padding: 0 20px;
  text-align: left;
}

.page-title {
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

::v-deep .b-form-tag {
  background-color: #f97345;
}

.page-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 30px;
}

/* --- STEPPER STYLES --- */
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
}

.stepper-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Base horizontal line */
.stepper-item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 27px;
  /* Starts the line 35px to the right of the circle center */
  left: calc(50% + 35px);
  /* Subtracts 70px (35px for each side) to create the gap */
  width: calc(100% - 70px);
  height: 4px;
  background: #e9ecef;
  z-index: -1;
}

/* Completed orange line logic */
.stepper-item.completed:not(:last-child)::after {
  background: #f97345;
}

.stepper-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #ebebeb;
  color: #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.stepper-label {
  font-size: 0.75rem !important;
  font-weight: 600;
  color: #837d7d !important; /* Force all labels to stay grey */
  text-align: center;
  line-height: 1.1;
  width: 65px;
  overflow-wrap: normal;
  word-break: normal;
  hyphens: none;
  margin-top: 8px;
}

/* Active & Completed Styling */
.stepper-item.active .stepper-circle,
.stepper-item.completed .stepper-circle {
  background: #f97345;
  color: white;
  box-shadow: 0 4px 10px rgba(249, 115, 69, 0.3);
}

::v-deep .b-form-tags.form-control {
  height: auto;
  padding: 0;
  border: none;
  background: none;
}

.stepper-item.active .stepper-label {
  color: #000;
}

/* Inactive State Styling */
.stepper-item.inactive .stepper-label {
  color: #a0a0a0;
}

.checkmark {
  font-size: 1.4rem;
}

/* --- FORM & ACTION STYLES --- */
.section-title {
  margin-top: 20px;
  font-weight: 700;
  color: #333;
}

.info {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 25px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}

.submit-btn {
  padding: 12px 24px;
  font-weight: 700;
  border-radius: 8px;
}

.prev-btn {
  background: transparent;
  color: #f97345 !important;
  border: 1px solid #f97345 !important;
}

.next-btn {
  background: #f97345 !important;
  border: none !important;
  color: white !important;
}

@media (max-width: 768px) {
  .page-content {
    padding: 30px 20px;
  }
  .page-title {
    font-size: 1.8rem;
  }
  .stepper {
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 10px;
  }
  .stepper-item {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .stepper-circle {
    width: 40px;
    height: 40px;
    font-size: 1.2rem !important;
    margin-bottom: 2px;
  }
  .checkmark {
    font-size: 1.2rem;
  }
  .stepper-label {
    font-size: 0.65rem !important;
    width: 55px;
  }
  .stepper-item:not(:last-child)::after {
    top: 20px;
    height: 2px;
  }
  .stepper-item:nth-child(4)::after {
    display: none !important;
  }
  .actions {
    flex-direction: column-reverse;
    gap: 15px;
  }
  .submit-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>
