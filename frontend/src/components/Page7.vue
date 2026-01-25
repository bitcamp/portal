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
        v-for="(step, index) in steps"
        :key="step.number"
        class="stepper-item"
        :class="{ 
          active: step.number === currentPage,
          completed: step.number < currentPage
        }"
      >
        <div class="stepper-circle">
          <span v-if="step.number < currentPage" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        
        <!-- Connecting line after circle -->
        <div v-if="index < steps.length - 1" class="stepper-line" :class="{ completed: step.number < currentPage }"></div>
        
        <div class="stepper-label">{{ step.label }}</div>
      </div>
    </div>

    <hr />

    <b-form @submit.prevent="handleNext">
      <h4 class="section-title">Rules and privacy policies</h4>
      <p class="info">
        Please read and agree to the necessary terms and conditions to proceed with your registration.
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
          I authorize you to share my application/registration information with Major League Hacking
          for event administration, ranking, and MLH administration in-line with the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>. I further agree
          to the terms of both the
          <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank">MLH Contest Terms
            and
            Conditions</a>
          and the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a><span class="red-asterisk">*</span>
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
          <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank">MLH Code of Conduct</a>.<span class="red-asterisk">*</span>
          <b-form-invalid-feedback :state="validations.valid_code_of_conduct">
            Please agree to MLH's code of conduct
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox id="checkbox-3" v-model="formData.MLH_emails" name="checkbox-3" class="checkbox">
          I authorize MLH to send me occasional emails about relevant events, career opportunities,
          and community announcements.
        </b-form-checkbox>
      </div>

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
          Submit
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "Page7",
  props: {
    formData: {
      type: Object,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
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
        { number: 7, label: "Rules & Policies" },
      ],

      validations: {
        valid_mlh_privacy: null,
        valid_code_of_conduct: null,
      },
    };
  },

  mounted() {
    // Initialize MLH checkbox values in formData if they don't exist
    const keys = ["MLH_emails", "MLH_conduct", "MLH_privacy"];
    keys.forEach(key => {
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

    handleNext() {
      if (this.validateForm()) {
        this.$emit("next");
        return;
      }

      this.$bvToast.toast("Please fill out all required fields", {
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: false,
        noCloseButton: true,
        variant: "danger",
      });
    },

    handlePrevious() {
      this.$emit("previous");
    },
  },
};
</script>

<style>
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
  align-items: flex-start;
  margin: 30px 0;
  position: relative;
}

.stepper-item {
  text-align: center;
  flex: 1;
  font-size: 0.85rem;
  color: #808080;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stepper-circle {
  width: 50px;
  height: 50px;
  margin: 0 auto 8px;
  border-radius: 50%;
  background: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: #666;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.stepper-item.active .stepper-circle {
  background: #ff6b35;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

.stepper-item.completed .stepper-circle {
  background: #ff6b35;
  color: white;
}

.stepper-label {
  font-weight: 500;
  line-height: 1.3;
  padding: 0 5px;
  color: #606060;
}

.stepper-item.active .stepper-label {
  color: #ff6b35;
  font-weight: 700;
}

.stepper-item.completed .stepper-label {
  color: #606060;
}

/* Connecting lines */
.stepper-line {
  position: absolute;
  top: 25px;
  left: calc(50% + 25px); 
  width: calc(100% - 25px);
  height: 3px;
  border-radius: 999px;
}

.stepper-line.completed {
  background: #ff6b35;
}

.checkmark {
  font-size: 1.5rem;
  font-weight: 700;
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

/* Responsive styles for mobile */
@media (max-width: 768px) {
  /* Page container */
  .register-page {
    margin: 20px auto 40px;
    padding: 0 10px;
  }

  /* Page titles */
  .page-title {
    font-size: 1.8rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .stepper {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 20px; 
  }

  .stepper-item {
    flex: 0 0 25%; /* Row 1: 4 items */
    max-width: 25%;
    position: relative; /* Essential for line positioning */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stepper-circle {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    z-index: 2; /* Ensure circle stays above the line */
  }

  .stepper-label {
    font-size: 0.8rem;
  }

  .stepper-line {
    display: block !important; 
    position: absolute;
    top: 17.5px; 
    left: calc(50% + 17.5px); 
    width: calc(100% - 35px);
    height: 2px;
    background: #e8e8e8; 
    z-index: 1;
  }

  .stepper-item:nth-child(4) .stepper-line,
  .stepper-item:nth-child(7) .stepper-line {
    display: none !important;
  }

  .actions {
    display: flex;
    justify-content: center; /* center the row */
    gap: 10px;               /* spacing between buttons */
  }

  .submit-btn {
    flex: 0 0 auto;          /* don't stretch, keep natural size */
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  /* Form fields */
  .b-form-group {
    margin-bottom: 15px;
  }

  .b-form-radio-group,
  .b-form-checkbox-group {
    font-size: 0.9rem;
  }
}
</style>