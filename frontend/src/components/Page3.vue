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
        :class="{ active: step.number === currentPage, completed: step.number < currentPage }"
      >
        <div v-if="index > 0" class="stepper-line" :class="{ completed: step.number <= currentPage }"></div>
        <div class="stepper-circle">
          <span v-if="step.number < currentPage" class="checkmark">&#10003;</span>
          <span v-else>{{ step.number }}</span>
        </div>
        <div v-if="index < steps.length - 1" class="stepper-line" :class="{ completed: step.number < currentPage }"></div>
        <div class="stepper-label">
          {{ step.label }}
        </div>
      </div>
    </div>

    <hr />

    <b-form @submit.prevent="handleNext">
      <div v-if="!atNoTransportUnis()">
        <h4 class="section-title">Travel and Transportation</h4>
        <div class="mt-2 form-group">
          <label class="form-label">
            Would you need travel assistance to the hackathon?
            <span class="text-danger">*</span>
          </label>

          <div class="radio-inline-group">
            <label class="radio-inline">
              <input
                v-model="formData.transport"

                .stepper {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                  margin: 18px 0 14px;
                }

                .stepper-item {
                  flex: 1;
                  text-align: center;
                  font-size: 0.7rem;
                  color: #c4c4c4;
                  position: relative;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }

                .stepper-circle {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  margin: 0 auto 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: #f3f3f3;
                  color: #9a9a9a;
                  border: 1px solid #dddddd;
                  font-size: 1.3rem;
                  font-weight: 600;
                  position: relative;
                  z-index: 2;
                }

                .stepper-line {
                  flex: 1 1 0;
                  height: 4px;
                  background: #e5e5e5;
                  margin: 0 0 8px 0;
                  width: 40px;
                  align-self: center;
                  border-radius: 2px;
                  z-index: 1;
                }
                .stepper-line.completed {
                  background: #ff6b35;
                }
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
        <b-form-group label="City" label-for="shipping-city" class="col-md-3">
          <b-form-input
            id="shipping-city"
            v-model="formData.city"
            placeholder="College Park"
            :state="showState('city')"
            @input="touched.city = true"
          />
        </b-form-group>

        <b-form-group label="State" label-for="shipping-state" class="col-md-2">
          <b-form-input
            id="shipping-state"
            v-model="formData.state"
            placeholder="MD"
            :state="showState('state')"
            @input="touched.state = true"
          />
        </b-form-group>

        <b-form-group label="Zip Code" label-for="shipping-zip" class="col-md-3">
          <b-form-input
            id="shipping-zip"
            v-model="formData.zip"
            placeholder="20740"
            :state="showState('zip')"
            @input="touched.zip = true"
          />
        </b-form-group>

        <b-form-group label="Country" label-for="shipping-country" class="col-md-4">
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

      <h4 class="section-title mb-2">Select a T-shirt size!</h4>
      <p class="info">
        We've got unisex T-shirts in sizes XS–2XL! Choose whichever size you like, and your very own
        Bitcamp 2026 shirt will be given to you once you arrive.
      </p>

      <b-form-row>
        <b-form-group id="input-group-tshirt" class="col-md-12">
          <template #label>
            T-shirt Size <span class="text-danger">*</span>
          </template>

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

      <h4 class="section-title">Do you have any dietary restrictions?</h4>
      <p class="info">Select all that apply <span class="text-danger">*</span></p>

      <b-form-row>
        <b-form-group id="input-dietary-restrictions" class="col-12 col-md-12">
          <div class="checkbox-group">
            <label class="checkbox-inline">
              <input type="checkbox" :checked="formData.diet_none" @change="toggleDietNoneOption" />
              None
            </label>

            <label v-for="option in dietOptions" :key="option.value" class="checkbox-inline">
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

            <div v-if="showInvalid('diet')" class="invalid-feedback d-block">
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

      <div class="actions">
        <b-button type="button" class="submit-btn prev-btn" @click="handlePrevious">
          <b-icon icon="arrow-left" class="mr-1" />
          Previous
        </b-button>

        <b-button type="submit" class="submit-btn next-btn">
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
const thirdPageRequiredFields = ["tshirt_size", "diet"];
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
    formData: { type: Object, required: true },
  },
  data() {
    return {
      touched: Object.fromEntries(
        [...thirdPageRequiredFields, ...thirdPageOptionalFields].map((key) => [key, false])
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
    currentPage() {
      return 3;
    },
    validations() {
      const req = (v) => v && v.toString().trim().length > 0;

      const createDietaryRestrictionString = () => {
        let diet_string = this.formData.diet_select.join(",");
        if (this.formData.diet_none) return "none";
        if (this.formData.diet_other && this.formData.diet_other_text !== "") {
          if (diet_string !== "") diet_string += ",";
          diet_string = diet_string + "other(" + this.formData.diet_other_text + ")";
        }
        return diet_string;
      };

      let isValidDiet = true;
      if (createDietaryRestrictionString().length === 0) isValidDiet = false;
      else if (this.formData.diet_other && !this.formData.diet_other_text.trim()) isValidDiet = false;

      return {
        transport: this.formData.transport !== null && this.formData.transport !== undefined,
        tshirt_size: req(this.formData.tshirt_size),
        address: req(this.formData.address),
        city: req(this.formData.city),
        state: req(this.formData.state),
        zip: req(this.formData.zip),
        country: req(this.formData.country),
        diet: isValidDiet,
        diet_other_text: req(this.formData.diet_other_text),
      };
    },
    optionalFieldsRequired() {
      const res = [];
      if (!this.atNoTransportUnis()) res.push("transport");
      if (this.formData.diet_other) res.push("diet_other_text");
      if (
        ["address", "city", "state", "zip", "country"].some(
          (fieldName) => this.formData[fieldName] && this.formData[fieldName].trim() !== ""
        )
      ) {
        res.push(...["address", "city", "state", "zip", "country"]);
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
      return this.validations[field] === true ? true : false;
    },
    showInvalid(field) {
      return this.touched[field] === true && this.validations[field] === false;
    },
    atNoTransportUnis() {
      return no_transport_unis.includes(this.formData.school);
    },
    toggleDietNoneOption() {
      if (!this.formData.diet_none) {
        this.formData.diet_none = true;
        this.formData.diet_select = [];
        this.formData.diet_other = false;
        this.formData.diet_other_text = "";
      } else {
        this.formData.diet_none = false;
      }
    },
    validateForm() {
      return (
        thirdPageRequiredFields.every((fieldName) => this.validations[fieldName]) &&
        this.optionalFieldsRequired.every((fieldName) => this.validations[fieldName])
      );
    },
    handleNext(event) {
      event.preventDefault();
      thirdPageRequiredFields.forEach((key) => (this.touched[key] = true));
      thirdPageOptionalFields.forEach((key) => {
        this.touched[key] = this.optionalFieldsRequired.includes(key);
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
/* Unified with Page 2 global styles */
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

/* Stepper logic from Page 2 */
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 18px 0 14px;
}

.stepper-item {
  flex: 1;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stepper-item::before {
  content: '';
  position: absolute;
  width: calc(100% - 50px);
  height: 3px;
  background: #d3d3d3;
  top: 23px;
  left: 25px;
  z-index: 0;
}

.stepper-item:first-child::before {
  display: none;
}

.stepper-item.completed::before {
  background: #ff6b35 !important;
}

.stepper-circle {
  height: 50px;
  width: 50px;
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
  position: relative;
  z-index: 1;
}

.stepper-item.active .stepper-circle,
.stepper-item.completed .stepper-circle {
  background: #ff6b35 !important;
  color: #ffffff !important;
  border-color: #ff6b35 !important;
}

.stepper-label {
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.4;
  color: #333;
}

.stepper-item.active .stepper-label,
.stepper-item.completed .stepper-label {
  color: #ff6b35 !important;
}

/* Form Styles */
label.form-label {
  font-size: 0.9rem;
  color: #666;
}

.form-control,
.form-select {
  font-size: 0.85rem;
  border-radius: 4px;
  border-color: #e3d7ca;
}

.radio-inline-group {
  display: flex;
  gap: 20px;
  margin-top: 6px;
}

.radio-inline, .checkbox-inline {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.radio-inline input, .checkbox-inline input {
  margin-right: 6px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

hr {
  border-top: 1px solid #f0e0d1;
  margin: 26px 0 22px;
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
</style>