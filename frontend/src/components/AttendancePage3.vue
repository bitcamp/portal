<template>
  <div class="register-page">
    <h1 class="page-title">Register for Bitcamp 2026</h1>

    <p class="page-subtitle">
      Questions? Email us at
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

    <b-form @submit.prevent="handleNext">
      <div v-if="!atNoTransportUnis()">
        <h4 class="section-title">Travel and Transportation</h4>
        <p class="info">
          Bitcamp is offering travel reimbursements through a rolling application this year. The
          application will be emailed to hackers who expressed interest in travel reimbursement
          during registration. We will consider reimbursing public transportation, rideshare, and
          inter-state travel. Please note that we cannot guarantee reimbursement or full coverage
          due to budget limits. Reimbursement decisions will be sent within 3-4 days after applying.
          For more details, check out our website FAQ or BitBot.
        </p>
        <div class="mt-2 form-group">
          <label class="form-label">
            Would you need travel assistance to the hackathon?
            <span class="text-danger">*</span>
          </label>

          <div class="radio-inline-group">
            <label class="radio-inline">
              <b-form-radio
                v-model="formData.transport"
                type="radio"
                value="yes"
                @change="touched.transport = true"
              />
              Yes
            </label>

            <label class="radio-inline">
              <b-form-radio
                v-model="formData.transport"
                type="radio"
                value="no"
                @change="touched.transport = true"
              />
              No
            </label>
          </div>
        </div>
      </div>

      <b-form-row>
        <b-form-group label-for="shipping-address" class="col-md-6">
          <template #label>
            Shipping Address
            <span v-if="optionalFieldsRequired.includes('address1')" class="text-danger">*</span>
          </template>
          <b-form-input
            id="shipping-address"
            v-model="formData.address1"
            placeholder="8125 Paint Branch Dr"
            :state="showState('address1')"
            @input="touched.address1 = true"
          />
        </b-form-group>

        <b-form-group label-for="shipping-address2" class="col-md-6">
          <template #label> Shipping Address Line 2 </template>
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
        <b-form-group label-for="shipping-country" class="col-md-4">
          <template #label>
            Country
            <span v-if="optionalFieldsRequired.includes('country')" class="text-danger">*</span>
          </template>
          <vue-bootstrap-autocomplete
            v-model="formData.country"
            no-results-info="No Results found"
            :input-class="country_class"
            :data="countriesOptions"
            @input="touched.country = true"
          />
          <!-- <b-form-input
            id="shipping-country"
            v-model="formData.country"
            placeholder="US"
            :state="showState('country')"
            @input="touched.country = true"
          /> -->
          <b-form-text class="helper-text"> e.g., "United States", "Canada" </b-form-text>
          <b-form-invalid-feedback :state="showState('country')">
            Please enter a valid country name or code
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label-for="shipping-state" class="col-md-2">
          <template #label>
            State
            <span v-if="optionalFieldsRequired.includes('state')" class="text-danger">*</span>
          </template>
          <vue-bootstrap-autocomplete
            v-model="formData.state"
            :data="statesOptions"
            :disabled="!selectedCountryHasStates"
            :input-class="state_class"
            placeholder="Maryland"
            no-results-info="No Results found"
            @input="touched.state = true"
          />
          <b-form-text class="helper-text"> e.g., "Maryland", "California" </b-form-text>
          <b-form-invalid-feedback :state="showState('state')">
            Please enter a valid state code
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label-for="shipping-city" class="col-md-3">
          <template #label>
            City
            <span v-if="optionalFieldsRequired.includes('city')" class="text-danger">*</span>
          </template>
          <vue-bootstrap-autocomplete
            v-model="formData.city"
            :data="citiesOptions"
            :disabled="!selectedStateHasCities"
            :input-class="city_class"
            placeholder="College Park"
            no-results-info="No Results found"
            @input="touched.city = true"
          />
          <b-form-text class="helper-text"> e.g., "New York", "Los Angeles" </b-form-text>
          <b-form-invalid-feedback :state="showState('city')">
            Please enter a valid city name
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label-for="shipping-zip" class="col-md-3">
          <template #label> Zip Code </template>
          <b-form-input
            id="shipping-zip"
            v-model="formData.zip"
            placeholder="20740"
            :state="showState('zip')"
            @input="touched.zip = true"
          />
          <b-form-invalid-feedback :state="showState('zip')">
            Please enter a valid zip code
          </b-form-invalid-feedback>
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
          <template #label> T-shirt Size <span class="text-danger">*</span> </template>

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
              <b-form-checkbox
                type="checkbox"
                :checked="formData.diet_none"
                @change="toggleDietNoneOption"
              />
              None
            </label>

            <label v-for="option in dietOptions" :key="option.value" class="checkbox-inline">
              <b-form-checkbox
                v-model="formData.diet_select"
                type="checkbox"
                :value="option.value"
                :disabled="formData.diet_none"
                @change="touched.diet_select = true"
              />
              {{ option.text }}
            </label>

            <label class="checkbox-inline">
              <b-form-checkbox
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
import * as count_list from "../assets/countries+states+cities.json";
import VueBootstrapAutocomplete from "@vue-bootstrap-components/vue-bootstrap-autocomplete";

Vue.component("VueBootstrapAutocomplete", VueBootstrapAutocomplete);
Vue.use(IconsPlugin);

const countries_list = count_list.default;
const no_transport_unis = ["The University of Maryland, College Park"];
const thirdPageRequiredFields = ["tshirt_size", "diet"];
const thirdPageOptionalFields = [
  "transport",
  "diet_other_text",
  "address1",
  "address2",
  "city",
  "state",
  "zip",
  "country",
];

export default {
  name: "AttendancePage3",
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
      countriesOptions: countries_list.map((c) => c.name),
    };
  },

  computed: {
    country_class() {
      const state = this.showState("country");
      if (state === true) return "typeahead is-valid";
      if (state === false) return "typeahead is-invalid";
      return "typeahead";
    },
    state_class() {
      const state = this.showState("state");
      if (state === true) return "typeahead is-valid";
      if (state === false) return "typeahead is-invalid";
      return "typeahead";
    },
    city_class() {
      const state = this.showState("city");
      if (state === true) return "typeahead is-valid";
      if (state === false) return "typeahead is-invalid";
      return "typeahead";
    },
    selectedCountryObj() {
      if (!this.formData.country) return null;
      return (
        countries_list.find(
          (c) => c.name.toLowerCase() === this.formData.country.trim().toLowerCase()
        ) || null
      );
    },
    statesOptions() {
      if (!this.selectedCountryObj) return [];
      return (this.selectedCountryObj.states || []).map((s) => s.name);
    },
    selectedCountryHasStates() {
      return this.statesOptions.length > 0;
    },
    selectedStateObj() {
      if (!this.selectedCountryObj || !this.formData.state) return null;
      return (
        (this.selectedCountryObj.states || []).find(
          (s) => s.name.toLowerCase() === this.formData.state.trim().toLowerCase()
        ) || null
      );
    },
    citiesOptions() {
      if (!this.selectedStateObj) return [];
      return (this.selectedStateObj.cities || []).map((c) => c.name);
    },
    selectedStateHasCities() {
      return this.citiesOptions.length > 0;
    },
    currentPage() {
      return 3;
    },
    validations() {
      const req = (v) => v && v.toString().trim().length > 0;

      const isValidZip = (zip) => {
        const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        return zipRegex.test(zip.trim());
      };

      const isValidCountry = (country) => {
        if (!country) return false;
        return countries_list.some((c) => c.name.toLowerCase() === country.trim().toLowerCase());
      };

      const isValidState = (state) => {
        if (!state || !this.selectedCountryObj) return false;
        return (this.selectedCountryObj.states || []).some(
          (s) => s.name.toLowerCase() === state.trim().toLowerCase()
        );
      };

      const isValidCity = (city) => {
        if (!city || !this.selectedStateObj) return false;
        return (this.selectedStateObj.cities || []).some(
          (c) => c.name.toLowerCase() === city.trim().toLowerCase()
        );
      };

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
      else if (this.formData.diet_other && !this.formData.diet_other_text.trim())
        isValidDiet = false;

      return {
        transport: this.formData.transport !== null && this.formData.transport !== undefined,
        tshirt_size: req(this.formData.tshirt_size),
        address1: req(this.formData.address1),
        city: this.selectedStateHasCities
          ? req(this.formData.city) && isValidCity(this.formData.city)
          : true,
        state: this.selectedCountryHasStates
          ? req(this.formData.state) && isValidState(this.formData.state)
          : true,
        zip: isValidZip(this.formData.zip),
        country: req(this.formData.country) && isValidCountry(this.formData.country),
        diet: isValidDiet,
        diet_other_text: req(this.formData.diet_other_text),
      };
    },
    optionalFieldsRequired() {
      const res = [];
      if (!this.atNoTransportUnis()) res.push("transport");
      if (this.formData.diet_other) res.push("diet_other_text");

      const addressFields = ["address1", "city", "state", "zip", "country"];
      const anyAddressFilled = addressFields.some(
        (fieldName) => this.formData[fieldName] && this.formData[fieldName].trim() !== ""
      );

      if (anyAddressFilled) {
        res.push("address1", "country");
        if (this.selectedCountryHasStates) {
          res.push("state");
        }
        if (this.selectedStateHasCities) {
          res.push("city");
        }
      }

      return res;
    },
  },

  watch: {
    selectedCountryObj() {
      this.formData.state = "";
      this.formData.city = "";
    },
    selectedStateObj() {
      this.formData.city = "";
    },
  },

  mounted() {
    this.$nextTick(() => {
      const input = document.getElementById("shipping-address");
      if (!input || typeof google === "undefined") return;

      // const autocomplete = new google.maps.places.Autocomplete(input, {
      //   types: ["address"],
      // });

      // autocomplete.addListener("place_changed", () => {
      //   const place = autocomplete.getPlace();
      //   // this.formData.gmaps_place_id = place.place_id;
      //   this.formData.address1 = place.formatted_address;
      //   this.fillInAddress(place);
      // });

      input.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
        }
      });

      const typeahead = document.getElementsByClassName("typeahead")[0];
      if (typeahead) {
        typeahead.setAttribute("autocomplete", "off");
      }
    });
  },

  methods: {
    fillInAddress(place) {
      const components = place.address_components || [];

      let streetNumber = "";
      let route = "";

      for (const component of components) {
        const type = component.types[0];

        switch (type) {
          case "street_number":
            streetNumber = component.long_name;
            break;
          case "route":
            route = component.long_name;
            break;
          case "locality":
            this.formData.city = component.long_name;
            break;
          case "administrative_area_level_1":
            this.formData.state = component.short_name;
            break;
          case "postal_code":
            this.formData.zip = component.long_name;
            break;
          case "country":
            this.formData.country = component.long_name;
            break;
        }
      }

      this.formData.address1 = `${streetNumber} ${route}`.trim();
    },

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
.register-page {
  max-width: 820px;
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
  font-size: 0.9rem;
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
  color: #555;
  margin-bottom: 18px;
}

/* --- STEPPER STYLES --- */
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
  /* Starts the line 35px to the right of the circle center */
  left: calc(50% + 35px);
  /* Subtracts 70px (35px for each side) to create the gap */
  width: calc(100% - 70px);
  height: 4px;
  background: #dedede;
  z-index: -1;
}

.stepper-item.completed:not(:last-child)::after {
  background: #f97345 !important;
}

.stepper-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #dedede;
  color: #a0a0a0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 12px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.stepper-label {
  font-size: 0.75rem !important;
  font-weight: 600;
  color: #837d7d !important;
  /* Force all labels to stay grey */
  text-align: center;
  line-height: 1.1;
  width: 65px;
  overflow-wrap: normal;
  word-break: normal;
  hyphens: none;
  margin-top: 8px;
}

.stepper-item.active .stepper-circle,
.stepper-item.completed .stepper-circle {
  background: #f97345 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 10px rgba(249, 115, 69, 0.3);
}

.checkmark {
  font-size: 1.4rem;
}

/* --- ACTIONS --- */
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.submit-btn {
  padding: 12px 24px;
  font-weight: 700;
  border-radius: 8px;
}

.prev-btn {
  background-color: transparent !important;
  color: #f97345 !important;
  border: 1px solid #f97345 !important;
}

.next-btn {
  background-color: #f97345 !important;
  color: #ffffff !important;
  border: none !important;
}

/* --- FORM STYLES --- */
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

.radio-inline,
.checkbox-inline {
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  line-height: 1;
}

.radio-inline input,
.checkbox-inline input {
  transform: translateY(-1px);
  margin: 0 6px 0 0;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

::v-deep .custom-control.custom-radio {
  display: flex;
  align-items: center;
}

::v-deep .custom-control.custom-radio .custom-control-label {
  margin-bottom: 0;
  line-height: 1.2;
}

::v-deep .custom-control.custom-radio .custom-control-label::before,
::v-deep .custom-control.custom-radio .custom-control-label::after {
  top: 45%;
  transform: translateY(-55%);
}

.helper-text {
  font-size: 0.75rem;
  color: #6c757d;
  font-style: italic;
  margin-top: 2px;
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
