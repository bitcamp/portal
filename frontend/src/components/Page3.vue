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
        v-for="(step, index) in steps"
        :key="step.number"
        class="stepper-item"
        :class="{ 
          active: step.number === currentPage,
          completed: step.number < currentPage
        }"
      >
        <!-- Connecting line before circle -->
        <div v-if="index > 0" class="stepper-line" :class="{ completed: step.number <= currentPage }"></div>
        
        <div class="stepper-circle">
          <span v-if="step.number < currentPage" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        
        <!-- Connecting line after circle -->
        <div v-if="index < steps.length - 1" class="stepper-line" :class="{ completed: step.number < currentPage }"></div>
        
        <div class="stepper-label">
          {{ step.label }}
        </div>
      </div>
    </div>

    <hr />

    <b-form @submit.prevent="handleNext">
      <!-- TRAVEL AND TRANSPORTATION -->
      <div v-if="!atNoTransportUnis()">
        <h4 class="section-title">Travel and Transportation</h4>
        <div class="mt-2 form-group">
          <label class="form-label">
            Would you need travel assistance to the hackathon?*
          </label>
          <div class="radio-inline-group">
            <label class="radio-inline">
              <input
                type="radio"
                :value="true"
                v-model="formData.transport"
                @change="touched.transport = true; validations.transport = true"
                :class="getFieldClass('transport')"
              />
              Yes
            </label>
            <label class="radio-inline">
              <input
                type="radio"
                :value="false"
                v-model="formData.transport"
                @change="touched.transport = true; validations.transport = true"
                :class="getFieldClass('transport')"
              />
              No
            </label>
          </div>
          <div
            v-if="touched.transport && validations.transport === false"
            class="invalid-feedback d-block"
          >
            Please select an answer
          </div>
        </div>
        <hr />
      </div>

      <!-- SHIPPING ADDRESS -->
      <h4 class="section-title">Want to give us a shipping address?</h4>
      <p class="info">
        We plan on handing out all swag in-person at the event, but in case we need to ship swag to you instead,
        this is where we'll send it to. Please note that we can only ship to the USA.
      </p>

      <b-form-row>
        <b-form-group
          label="Shipping Address"
          label-for="shipping-address"
          class="col-md-6"
        >
          <b-form-input
            id="shipping-address"
            v-model="formData.address"
            placeholder="8125 Paint Branch Dr"
          />
        </b-form-group>

        <b-form-group
          label="Shipping Address Line 2"
          label-for="shipping-address2"
          class="col-md-6"
        >
          <b-form-input
            id="shipping-address2"
            v-model="formData.address2"
            placeholder="Apartment or Unit Number (optional)"
          />
        </b-form-group>
      </b-form-row>

      <b-form-row>
        <b-form-group
          label="City"
          label-for="shipping-city"
          class="col-md-3"
        >
          <b-form-input
            id="shipping-city"
            v-model="formData.city"
            placeholder="College Park"
          />
        </b-form-group>

        <b-form-group
          label="State"
          label-for="shipping-state"
          class="col-md-2"
        >
          <b-form-input
            id="shipping-state"
            v-model="formData.state"
            placeholder="MD"
          />
        </b-form-group>

        <b-form-group
          label="Zip Code"
          label-for="shipping-zip"
          class="col-md-3"
        >
          <b-form-input
            id="shipping-zip"
            v-model="formData.zip"
            placeholder="20740"
          />
        </b-form-group>

        <b-form-group
          label="Country"
          label-for="shipping-country"
          class="col-md-4"
        >
          <b-form-input
            id="shipping-country"
            v-model="formData.country"
            placeholder="USA"
          />
        </b-form-group>
      </b-form-row>

      <hr />

      <!-- T-SHIRT SIZE -->
      <h4 class="section-title mb-2">Select a T-shirt size!</h4>
      <p class="info">
        We've got unisex T-shirts in sizes XS–2XL! Choose whichever size you like, and your very own
        Bitcamp 2026 shirt will be given to you once you arrive.
      </p>

      <b-form-row>
        <b-form-group
          id="input-group-tshirt"
          label="T-shirt Size*"
          label-for="input-tshirt"
          class="col-md-12"
        >
          <b-form-select
            id="input-tshirt"
            v-model="formData.tshirt_size"
            class="form-select"
            :options="tshirtSizeOptions"
            @change="touched.tshirt_size = true; validations.tshirt_size = formData.tshirt_size ? true : false"
            :state="getFieldState('tshirt_size')"
          />
          <b-form-invalid-feedback :state="getFieldState('tshirt_size')">
            Please select a T-shirt size
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form-row>

      <hr />

      <!-- DIETARY RESTRICTIONS -->
      <h4 class="section-title">Do you have any dietary restrictions?</h4>
      <p class="info">Select all that apply*</p>

      <b-form-row>
        <b-form-group
          id="input-dietary-restrictions"
          class="col-12 col-md-6"
        >
          <div class="checkbox-group">
            <label class="checkbox-inline">
              <input
                type="checkbox"
                v-model="formData.diet_none"
                @change="uncheckDietaryRestrictions; touched.diet = true; updateDietValidation()"
              />
              None
            </label>

            <label
              v-for="option in dietOptions"
              :key="option.value"
              class="checkbox-inline"
            >
              <input
                type="checkbox"
                :value="option.value"
                v-model="formData.diet_select"
                :disabled="formData.diet_none"
                @change="touched.diet = true; updateDietValidation()"
              />
              {{ option.text }}
            </label>

            <label class="checkbox-inline">
              <input
                type="checkbox"
                v-model="formData.diet_other"
                :disabled="formData.diet_none"
                @change="touched.diet = true; updateDietValidation()"
              />
              Other
            </label>

            <div
              v-if="touched.diet && validations.diet === false"
              class="invalid-feedback d-block"
            >
              Please select your dietary restrictions ("None" is an option)
            </div>
          </div>

          <b-form-input
            v-if="formData.diet_other"
            v-model="formData.diet_other_text"
            class="mt-2"
            aria-label="Dietary Restriction Other Text Box"
            @input="touched.diet = true; updateDietValidation()"
            placeholder="Other dietary restriction"
          />
        </b-form-group>
      </b-form-row>

      <!-- Navigation Buttons -->
      <div class="actions">
        <b-button
          type="button"
          class="submit-btn prev-btn"
          @click="handlePrevious"
        >
          <b-icon icon="arrow-left" class="mr-1" />
          Previous
        </b-button>
        <b-button
          type="submit"
          class="submit-btn next-btn"
        >
          Next Step
          <b-icon icon="arrow-right" class="ml-1" />
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { IconsPlugin } from "bootstrap-vue";
import Vue from "vue";

Vue.use(IconsPlugin);

const no_transport_unis = ["The University of Maryland, College Park"];

export default {
  name: "Page3",
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
      tshirtSizeOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "xs", text: "XS" },
        { value: "s", text: "S" },
        { value: "m", text: "M" },
        { value: "l", text: "L" },
        { value: "xl", text: "XL" },
        { value: "2xl", text: "2XL" },
      ],
      dietOptions: [
        { text: "Vegan", value: "vegan" },
        { text: "Vegetarian", value: "vegetarian" },
        { text: "Gluten Free", value: "gluten-free" },
        { text: "Dairy Free", value: "dairy-free" },
        { text: "Nut Allergy", value: "nut-allergy" },
        { text: "Kosher", value: "kosher" },
        { text: "Halal", value: "halal" },
      ],
      validations: {
        transport: null,
        tshirt_size: null,
        diet: null,
      },
      touched: {
        transport: false,
        tshirt_size: false,
        diet: false,
      },
    };
  },
  methods: {
    getFieldClass(field) {
      if (!this.touched[field]) return null;
      if (this.validations[field] === true) return 'is-valid';
      if (this.validations[field] === false) return 'is-invalid';
      return null;
    },
    getFieldState(field) {
      if (!this.touched[field]) return null;
      return this.validations[field];
    },
    atNoTransportUnis() {
      return no_transport_unis.includes(this.formData.school);
    },
    uncheckDietaryRestrictions() {
      // when "None" is checked, clear others & other-text
      if (this.formData.diet_none) {
        this.formData.diet_select = [];
        this.formData.diet_other = false;
        this.formData.diet_other_text = "";
      }
    },
    updateDietValidation() {
      // Update diet validation based on current selections
      const dietString = this.createDietaryRestrictionString();
      if (dietString.length === 0) {
        this.validations.diet = false;
      } else if (this.formData.diet_other && !this.formData.diet_other_text.trim()) {
        this.validations.diet = false;
      } else {
        this.validations.diet = true;
      }
    },
    createDietaryRestrictionString() {
      let diet_string = this.formData.diet_select.join(",");

      if (this.formData.diet_none) {
        return "none";
      }
      if (this.formData.diet_other && this.formData.diet_other_text !== "") {
        if (diet_string !== "") {
          diet_string += ",";
        }
        diet_string =
          diet_string + "other(" + this.formData.diet_other_text + ")";
      }

      return diet_string;
    },
    validateForm() {
      let isValid = true;

      // Transport (only if not at no-transport unis)
      if (!this.atNoTransportUnis() && this.formData.transport === null) {
        this.validations.transport = false;
        this.touched.transport = true;
        isValid = false;
      } else {
        this.validations.transport = null;
      }

      // T-shirt Size
      if (!this.formData.tshirt_size || this.formData.tshirt_size.length === 0) {
        this.validations.tshirt_size = false;
        this.touched.tshirt_size = true;
        isValid = false;
      } else {
        this.validations.tshirt_size = null;
      }

      // Dietary Restrictions
      if (this.createDietaryRestrictionString().length === 0) {
        this.validations.diet = false;
        this.touched.diet = true;
        isValid = false;
      } else if (this.formData.diet_other && !this.formData.diet_other_text.trim()) {
        this.validations.diet = false;
        this.touched.diet = true;
        isValid = false;
      } else {
        this.validations.diet = null;
      }

      return isValid;
    },
    handleNext() {
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
  padding: 0 20px 40px;
  text-align: left;
}

.page-title {
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1rem;
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
  font-size: 0.95rem;
  opacity: 0.9;
  color: #777;
  margin-bottom: 18px;
}

label.form-label {
  font-size: 0.9rem;
  color: #666;
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
  height: 3px;
  background: #d3d3d3;
  top: 25px;
  z-index: 1;
  transition: background 0.3s ease;
}

.stepper-item:not(:last-child) .stepper-line:last-of-type {
  width: calc(100% + 10px);
  left: 25px;
}

.stepper-item:first-child .stepper-line:first-of-type {
  display: none;
}

.stepper-line.completed {
  background: #ff6b35;
}

.checkmark {
  font-size: 1.5rem;
  font-weight: 700;
}

.stepper-label {
  line-height: 1.2;
}

.stepper-item.active .stepper-label {
  color: #ff6b35;
  font-weight: 600;
}

/* Radio + checkbox groups */
.radio-inline-group {
  display: flex;
  gap: 20px;
  margin-top: 6px;
}

.radio-inline {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.radio-inline input[type="radio"] {
  display: inline-block !important;
  margin-right: 6px;
}

.radio-inline input[type="radio"].is-valid {
  accent-color: #28a745;
}

.radio-inline input[type="radio"].is-invalid {
  accent-color: #dc3545;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.checkbox-inline {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.checkbox-inline input[type="checkbox"] {
  display: inline-block !important;
  margin-right: 6px;
}

.checkbox-inline input[type="checkbox"].is-valid {
  accent-color: #28a745;
}

.checkbox-inline input[type="checkbox"].is-invalid {
  accent-color: #dc3545;
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

.next-btn:hover,
.next-btn:focus {
  background-color: #ff7b47;
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

  /* Stepper adjustments */
  .stepper-circle {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    margin-right: 10px;
  }

  .stepper-label {
    font-size: 0.8rem;
  }

  .stepper-line {
    display: none; /* optional: hide lines on mobile for simplicity */
  }

  /* Form fields */
  .b-form-group {
    margin-bottom: 15px;
  }

  .b-form-radio-group,
  .b-form-checkbox-group {
    font-size: 0.9rem;
  }

  /* Buttons */
  .submit-btn {
    padding: 8px 20px;
    font-size: 0.9rem;
  }
}
</style>