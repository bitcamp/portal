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
        :class="{ active: step.number === 7, completed: step.number < 7 }"
      >
        <div class="stepper-circle">
          <span v-if="step.number < 7" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        <div class="stepper-label">{{ step.label }}</div>
      </div>
    </div>

    <hr />

    <b-form :disabled="isSending" @submit.prevent="handleNext">
      <h4 class="section-title">Rules and privacy policies</h4>
      <p class="info">
        Please read and agree to the necessary terms and conditions to proceed with your
        registration.
      </p>

      <div class="checkbox-wrapper">
        <b-form-checkbox
          id="checkbox-1"
          v-model="formData.MLH_privacy"
          name="checkbox-1"
          class="checkbox mb-3"
          :state="validations.valid_mlh_privacy"
          @change="clearValidation('valid_mlh_privacy')"
        >
          I authorize you to share my application/registration information with Major League
          Hacking for event administration, ranking, and MLH administration in-line with the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>. I further
          agree to the terms of both the
          <a
            href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
            target="_blank"
            >MLH Contest Terms and Conditions</a
          >
          and the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>.
          <span class="text-danger">*</span>
          <b-form-invalid-feedback :state="validations.valid_mlh_privacy">
            Please agree to MLH's privacy policy and terms
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-2"
          v-model="formData.MLH_conduct"
          name="checkbox-2"
          :state="validations.valid_code_of_conduct"
          class="checkbox mb-3"
          style="padding-bottom: 1rem"
          @change="clearValidation('valid_code_of_conduct')"
        >
          I have read and agree to the
          <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank"
            >MLH Code of Conduct</a
          >. <span class="text-danger">*</span>
          <b-form-invalid-feedback :state="validations.valid_code_of_conduct">
            Please agree to MLH's code of conduct
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-3"
          v-model="formData.MLH_emails"
          name="checkbox-3"
          class="checkbox"
        >
          I authorize MLH to send me occasional emails about relevant events, career
          opportunities, and community announcements.
        </b-form-checkbox>
      </div>

      <div class="actions">
        <b-button
          type="button"
          @click="handlePrevious"
          class="submit-btn prev-btn"
        >
          <b-icon icon="arrow-left" class="mr-1" /> Previous
        </b-button>
        <b-button type="submit" class="submit-btn next-btn">
          Complete Registration
          <b-icon icon="arrow-right" class="ml-1" />
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import generalMixin from "../mixins/general";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "SubmitPage7",
  mixins: [generalMixin],
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

      validations: {
        valid_mlh_privacy: null,
        valid_code_of_conduct: null,
      },

      isSending: false,
    };
  },

  computed: {
    // The step number for this page (used by the stepper UI)
    currentPage() {
      return 7;
    },
  },

  mounted() {
    // Initialize MLH checkbox values in formData if they don't exist
    const keys = ["MLH_emails", "MLH_conduct", "MLH_privacy"];
    keys.forEach((key) => {
      if (!this.formData.hasOwnProperty(key)) {
        this.$set(this.formData, key, false);
      }
    });
  },

  methods: {
    clearValidation(key) {
      if (key in this.validations) {
        this.validations[key] = null;
      }
    },

    async handleNext(event) {
      console.log(this.formData);
      event.preventDefault();

      if (!this.validateForm()) {
        this.$bvToast.toast("Please fill out all required fields", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });

        return;
      }

      const response = await this.registerUser();

      if (response && response.referral_id) {
        this.$router.push({ path: "thanks", query: { r: response.referral_id } });
      } else {
        this.$bvToast.toast("Something went wrong when submitting your registration", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
      }
    },

    async registerUser() {
      if (this.isSending) return;

      this.isSending = true;

      this.formData.name = `${this.formData.first_name} ${this.formData.last_name}`;

      // prevent blacklisted hackers from registering
      if (this.formData.name === "Auran Shereef" || this.formData.name === "Monte James") {
        this.$router.push({ path: "thanks" });
        return;
      }

      // time taken to fill out form in seconds
      this.formData.time_taken = (Date.now() - this.form_start) / 1000;

      if (this.$route.params.referral) {
        this.$gtag.event("got-referred", { method: "Google" });
        this.formData.referred_by = this.$route.params.referral;
        this.track({
          random_id: this.random_id,
          key: "got-referred",
          value: this.$route.params.referral,
        });
      }

      // Track "heard from" statistics
      // TODO - Uncomment this once we fixed the frontend for that
      // for (let heardFrom of this.heard_from_select) {
      //   this.track({
      //     random_id: this.random_id,
      //     key: `hf-${heardFrom}`,
      //     value: 1,
      //   });
      // }
      // for now will use what works with frontend atm
      this.track({
        random_id: this.random_id,
        key: `hf-${this.heard_from}`,
        value: 1,
      });

      if (this.heard_from_other) {
        this.track({
          random_id: this.random_id,
          key: "hf-other",
          value: 1,
        });
      }

      this.$gtag.event("submit-registration", { method: "Google" });
      this.$gtag.time({
        name: "completion-time",
        value: this.formData.time_taken,
        event_category: "Form completion duration",
      });
      this.track({
        random_id: this.random_id,
        key: "form-submitted",
        value: this.formData.time_taken,
      });

      const d = new Date();
      this.formData.secret =
        (d.getHours() * d.getDay() * 15).toString() +
        d.getFullYear().toString().split("").reverse().join("");

      const survey_count = { r: 0, b: 0, g: 0 };
      survey_count[this.formData.q1.substring(0, 1)] += 1;
      survey_count[this.formData.q2.substring(0, 1)] += 1;
      survey_count[this.formData.q3.substring(0, 1)] += 1;
      survey_count[this.formData.q4.substring(0, 1)] += 1;
      survey_count[this.formData.q5.substring(0, 1)] += 1;
      this.formData.red = survey_count["r"];
      this.formData.green = survey_count["g"];
      this.formData.blue = survey_count["b"];

      this.formData.dietary_restrictions = this.createDietaryRestrictionString();

      // TODO - Fix frontend to support this, atm it just uses ethnicity with no
      // multiselect
      // this.formData.ethnicity = this.createEthnicityString();

      // TODO - Heard from with the current frontend is not compatible with old frontend code
      // so will just use what works with the frontend for now
      // this.formData.heard_from = this.createHeardFromString();

      // TODO - From what I can tell this seems unused? Should check
      // this.formData.transport_select = this.createTransportString();

      const isMinor = this.formData.age.length > 0 && Number(this.formData.age) < 18;
      const endpoint = isMinor ? "register_minor" : "register";

      const response = await this.performPostRequest(
        this.getEnvVariable("BACKEND_ENDPOINT"),
        endpoint,
        this.formData
      );

      this.isSending = false;
      return response;
    },

    // Should probably revalidate previous page fields too
    validateForm() {
      let valid = true;
      const form = this.formData;

      if (!form.MLH_privacy) {
        this.validations.valid_mlh_privacy = false;
        valid = false;
      } else {
        this.validations.valid_mlh_privacy = null;
      }

      if (!form.MLH_conduct) {
        this.validations.valid_code_of_conduct = false;
        valid = false;
      } else {
        this.validations.valid_code_of_conduct = null;
      }

      return valid;
    },

    createDietaryRestrictionString() {
      let diet_string = this.formData.diet_select.join(",");

      if (this.formData.diet_none) {
        return "none";
      }
      if (this.formData.diet_other && this.formData.diet_other_text != "") {
        if (diet_string != "") {
          diet_string += ",";
        }
        diet_string = diet_string + "other(" + this.formData.diet_other_text + ")";
      }

      return diet_string;
    },

    // TODO - Fix Page 1 such that it supports this function, for now will just use
    // the 'ethnicity' field in the current frontend
    createEthnicityString() {
      let ethnicity_string = this.formData.ethnicity_select.join(",");

      if (this.ethnicity_prefer_no_answer) {
        return "prefer-not-to-answer";
      }
      if (this.ethnicity_other && this.ethnicity_other_text != "") {
        if (ethnicity_string != "") {
          ethnicity_string += ",";
        }
        ethnicity_string = ethnicity_string + "other(" + this.ethnicity_other_text + ")";
      }

      return ethnicity_string;
    },

    // TODO - Fix Page 1 such that it supports this function, for now will just use
    // the 'heard_from_select' field in the current frontend
    createHeardFromString() {
      let heard_from_string = this.heard_from_select.join(",");

      if (this.heard_from_other && this.heard_from_other_text != "") {
        if (heard_from_string != "") {
          heard_from_string += ",";
        }
        heard_from_string = heard_from_string + "other(" + this.heard_from_other_text + ")";
      }

      return heard_from_string;
    },

    // From what I can tell this seems unused now
    createTransportString() {
      return this.transport_select.join(",");
    },

    handlePrevious() {
      this.$emit("previous");
    },
  },
};
</script>

<style scoped>
.register-page {
  max-width: 760px;
  margin: 40px auto 80px;
  padding: 0 20px;
  text-align: left;
}

.page-content {
  background: #fff7ee;
  border-radius: 12px;

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
  margin-bottom: 22px;
}

.section-title {
  font-weight: 700;
  margin-bottom: 6px;
}

.info {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 18px;
}

.stepper {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.stepper-item {
  flex: 1 1 0;
  min-width: 0;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1; 
}

.stepper-item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 27px; 
  left: 50%;
  width: 100%;
  height: 2px; 
  background: #dddddd; 
  z-index: -1; 
}

.stepper-label {
  font-size: 0.75rem !important; 
  font-weight: 600;
  font-family: "Inter", sans-serif !important;
  color: #000000 !important;
  text-align: center;
  line-height: 1.2;
  margin-top: 8px;
}

.stepper-item.completed:not(:last-child)::after {
  background: #ff6b35 !important;
}

.stepper-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #f3f3f3; 
  color: #9a9a9a;
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 8px;
  position: relative; 
  z-index: 2;
  font-family: "Inter", sans-serif !important; 
}

.stepper-item.active .stepper-circle,
.stepper-item.completed .stepper-circle {
  background: #ff6b35 !important;
  color: #ffffff !important;
  border-color: #ff6b35 !important;
  box-shadow: 0 10px 18px rgba(255, 107, 53, 0.35);
}

.checkmark {
  font-size: 1.5rem;
  font-weight: 700;
}

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

.prev-btn {
  background-color: #f5f5f5;
  color: #ff6b35;
  border: 1px solid #ff6b35;
}

.next-btn {
  background-color: #ff6b35;
  color: #ffffff;
  border: none;
  box-shadow: 0 6px 16px rgba(255, 107, 53, 0.45);
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
