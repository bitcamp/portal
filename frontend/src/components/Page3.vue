<template>
  <b-row>
    <b-col md="1" />
    <b-col md="10">
      <br />
      <h1 style="text-align: left">Register for Bitcamp 2026</h1>

      <p style="font-size: 0.9rem; opacity: 95%">
        Questions? Chat with us in the bottom right hand corner or email
        <a href="mailto:hello@bit.camp">hello@bit.camp</a>. You can also learn more at
        <a href="https://bit.camp">bit.camp</a>!
      </p>

      <!-- Step Indicator -->
      <div style="text-align: center; margin: 20px 0">
        <span
          v-for="step in 7"
          :key="step"
          :style="getStepStyle(step)"
          style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; margin: 0 5px; line-height: 30px"
        >
          {{ step }}
        </span>
      </div>

      <hr />

      <b-form @submit="handleNext">
        <!-- Travel and Transportation -->
        <div v-if="!atNoTransportUnis()">
          <h4>Travel and Transportation</h4>
          <b-form-row class="pt-3">
            <b-form-group
              label="Would you need travel assistance to the hackathon?*"
              class="col-md-7"
              label-for="transport-bool"
            >
              <b-form-radio-group
                id="transport-bool"
                v-model="formData.transport"
                :state="validations.transport"
                class="pt-2"
                @change="resetTransport"
              >
                <b-form-radio :value="true"> Yes </b-form-radio>
                <b-form-radio :value="false"> No </b-form-radio>
              </b-form-radio-group>
              <b-form-invalid-feedback :state="validations.transport">
                Please select an answer
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>
          <hr />
        </div>

        <!-- T-Shirt Size -->
        <h4 class="mb-2">Select a T-shirt size!</h4>
        <p class="info">
          We've got unisex T-shirts in sizes XS-2XL! Choose whichever size you like, and your very
          own Bitcamp 2026 shirt will be given to you once you arrive.
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
              placeholder="Choose a T-shirt size"
              :options="tshirtSizeOptions"
              :state="validations.tshirt_size"
            />
            <b-form-invalid-feedback :state="validations.tshirt_size">
              Please select a T-shirt size
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <hr />

        <!-- Dietary Restrictions -->
        <h4>Do you have any dietary restrictions?</h4>
        <p class="info">Select all that apply</p>

        <b-form-row>
          <b-form-group
            id="input-dietary-restrictions"
            label="*"
            label-for="input-dietary-restrictions"
            class="col-12 col-md-6"
          >
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-2 mb-1">
              <b-form-checkbox
                v-model="formData.diet_none"
                :state="validations.diet"
                @change="uncheckDietaryRestrictions()"
              >
                None
              </b-form-checkbox>
              <b-form-checkbox
                v-for="option in dietOptions"
                :key="option.value"
                v-model="formData.diet_select"
                :value="option.value"
                :aria-describedby="ariaDescribedby"
                name="flavour-3a"
                :disabled="formData.diet_none"
                :state="validations.diet"
              >
                {{ option.text }}
              </b-form-checkbox>
              <b-form-checkbox v-model="formData.diet_other" :disabled="formData.diet_none" :state="validations.diet">
                Other
              </b-form-checkbox>
              <b-form-invalid-feedback :state="validations.diet">
                Please select your dietary restrictions ("None" is an option)
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-input
              v-if="formData.diet_other"
              v-model="formData.diet_other_text"
              class="col-12 col-md-12"
              aria-label="Dietary Restriction Other Text Box"
              placeholder="Other dietary restriction"
            />
          </b-form-group>
        </b-form-row>

        <!-- Navigation Buttons -->
        <div style="display: flex; justify-content: space-between; margin-top: 30px">
          <b-button
            @click="handlePrevious"
            type="button"
            class="submit-btn"
            style="background-color: #F5F5F5; color: #FF6B35; border: 1px solid #FF6B35"
          >
            <b-icon icon="arrow-left" style="margin-right: 5px" />
            Previous
          </b-button>
          <b-button type="submit" class="submit-btn" style="background-color: #FF6B35; color: white; border: none">
            Next Step
            <b-icon icon="arrow-right" style="margin-left: 5px" />
          </b-button>
        </div>
      </b-form>
    </b-col>
    <b-col md="1" />
  </b-row>
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
  },
  data() {
    return {
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
    };
  },
  methods: {
    getStepStyle(step) {
      if (step <= 3) {
        return {
          backgroundColor: "#FF6B35",
          color: "white",
          fontWeight: "bold",
        };
      }
      return {
        backgroundColor: "#F5F5F5",
        color: "#999",
        border: "1px solid #DDD",
      };
    },
    atNoTransportUnis() {
      return no_transport_unis.includes(this.formData.school);
    },
    resetTransport() {
      // Reset transport selection when toggling
    },
    uncheckDietaryRestrictions() {
      this.formData.diet_select = [];
      this.formData.diet_other = false;
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
    validateForm() {
      let isValid = true;

      // Transport (only if not at no-transport unis)
      if (!this.atNoTransportUnis() && this.formData.transport === null) {
        this.validations.transport = false;
        isValid = false;
      } else {
        this.validations.transport = null;
      }

      // T-shirt Size
      if (this.formData.tshirt_size.length === 0) {
        this.validations.tshirt_size = false;
        isValid = false;
      } else {
        this.validations.tshirt_size = null;
      }

      // Dietary Restrictions
      if (this.createDietaryRestrictionString().length === 0) {
        this.validations.diet = false;
        isValid = false;
      } else if (this.formData.diet_other && !this.formData.diet_other_text.trim()) {
        this.validations.diet = false;
        isValid = false;
      } else {
        this.validations.diet = null;
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
    handlePrevious() {
      this.$emit("previous");
    },
  },
};
</script>

<style scoped>
.info {
  font-size: 0.9rem;
  opacity: 95%;
  color: #666;
}
.submit-btn {
  padding: 10px 30px;
  font-weight: bold;
}
</style>
