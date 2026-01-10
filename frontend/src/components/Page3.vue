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
        :class="{ active: step.number === 3 }"
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
                v-model="formData.transport"
                type="radio"
                :value="true"
                @change="touched.transport = true"
              />
              Yes
            </label>
            <label class="radio-inline">
              <input
                v-model="formData.transport"
                type="radio"
                :value="false"
                @change="touched.transport = true"
              />
              No
            </label>
          </div>
          <div
            v-if="showInvalid('transport')"
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
            :state="showState('address')"
            @input="touched.address = true"
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
            :state="showState('address2')"
            @input="touched.address2 = true"
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
            :state="showState('city')"
            @input="touched.city = true"
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
            :state="showState('state')"
            @input="touched.state = true"
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
            :state="showState('zip')"
            @input="touched.zip = true"
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
            :state="showState('country')"
            @input="touched.country = true"
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
            :state="showState('tshirt_size')"
            @change="touched.tshirt_size = true"
          />
          <b-form-invalid-feedback :state="validations.tshirt_size">
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
                :checked="formData.diet_none"
                @change="toggleDietNoneOption"
              />
              None
            </label>

            <label
              v-for="option in dietOptions"
              :key="option.value"
              class="checkbox-inline"
            >
              <input
                v-model="formData.diet_select"
                type="checkbox"
                :value="option.value"
                :disabled="formData.diet_none"
                @change="touched.diet_select = true"
              />
              {{ option.text }}
            </label>

            <label class="checkbox-inline">
              <input
                v-model="formData.diet_other"
                type="checkbox"
                :disabled="formData.diet_none"
                @change="touched.diet_other = true"
              />
              Other
            </label>

            <div
              v-if="showInvalid('diet')"
              class="invalid-feedback d-block"
            >
              Please select your dietary restrictions ("None" is an option)
            </div>
          </div>

          <b-form-input
            v-if="formData.diet_other"
            v-model="formData.diet_other_text"
            :state="showState('diet_other_text')"
            class="mt-2"
            aria-label="Dietary Restriction Other Text Box"
            placeholder="Other dietary restriction"
            @input="touched.diet_other_text = true"
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

const thirdPageRequiredFields = [
  "tshirt_size",
  "diet",
];

const thirdPageOptionalFields = [
  "transport",
  "diet_other_text",
  "address",
  "address2",
  "city",
  "state",
  "zip",
  "country",
];

export default {
  name: "Page3",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      touched: Object.fromEntries(
        [...thirdPageRequiredFields, ...thirdPageOptionalFields].map(key => [key, false])
      ),
      steps: [
        { number: 1, label: "Personal Info" },
        { number: 2, label: "Track & Experience" },
        { number: 3, label: "Attendance Details" },
        { number: 4, label: "Campfire Games" },
        { number: 5, label: "Team Matching" },
        { number: 6, label: "Minor Waivers" },
        { number: 7, label: "Finalize & Submit" },
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
    };
  },

  computed: {
    validations() {
      const req = (v) => v && v.toString().trim().length > 0;

      let createDietaryRestrictionString = () => {
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
      };

      let isValidDiet = true;
      if (createDietaryRestrictionString().length === 0) {
        isValidDiet = false;
      } else if (this.formData.diet_other && !this.formData.diet_other_text.trim()) {
        isValidDiet = false;
      }

      return {
        transport: this.formData.transport !== null && this.formData.transport !== undefined,
        tshirt_size: req(this.formData.tshirt_size),
        address: req(this.formData.address),
        address2: true,
        city: req(this.formData.city),
        state: req(this.formData.state),
        zip: req(this.formData.zip),
        country: req(this.formData.country),
        diet: isValidDiet,
        diet_other_text: req(this.formData.diet_other_text),
      }
    },

    optionalFieldsRequired() {
      const res = [];

      if (!this.atNoTransportUnis()) {
        res.push("transport");
      }
      
      if (this.formData.diet_other) {
        res.push("diet_other_text");
      }

      if (["address", "address2", "city", "state", "zip", "country"].some((fieldName) => this.formData[fieldName] !== "")) {
        res.push(...["address", "city", "state", "zip", "country"]);
        if (this.formData["address2"] && this.formData["address2"].length > 0) {
          res.push("address2");
        }
      }

      return res;
    },
  },

  methods: {
    showState(field) {
      if (thirdPageOptionalFields.includes(field) && !this.optionalFieldsRequired.includes(field)) {
        return null;
      }
      if (!this.touched[field]) return null;
      return this.validations[field] === true ? null : false;
    },

    showInvalid(field) {
      // Note that "submitting" the form touches the fields so thats why I have this first part
      return this.touched[field] === true && this.validations[field] === false;
    },

    atNoTransportUnis() {
      return no_transport_unis.includes(this.formData.school);
    },

    toggleDietNoneOption() {
      if (!this.formData.diet_none) {
        this.formData.diet_none = true;
        // when "None" is checked, clear others & other-text
        this.formData.diet_select = [];
        this.formData.diet_other = false;
        this.formData.diet_other_text = "";
      } else {
        this.formData.diet_none = false;
      }
    },

    validateForm() {
      return thirdPageRequiredFields.every((fieldName) => this.validations[fieldName]) &&
        this.optionalFieldsRequired.every((fieldName) => this.validations[fieldName]);
    },

    handleNext(event) {
      event.preventDefault();

      thirdPageRequiredFields.forEach((key) => {
        this.touched[key] = true;
      });
      thirdPageOptionalFields.forEach((key) => {
        if (this.optionalFieldsRequired.includes(key)) {
          this.touched[key] = true;
        } else {
          this.touched[key] = false;
        }
      });

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
</style>