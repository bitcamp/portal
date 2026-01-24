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
        <!-- Connecting line before circle -->
        <div v-if="index > 0" class="stepper-line" :class="{ completed: step.number <= currentPage }"></div>
        
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
      <h4 class="section-title">Campfire Games Survey</h4>
      <p class="info">
        This year, you'll once again be put into one of three teams based on your personality and interests. By 
        winning unique challenges and attending workshops and mini-events, you and your fellow hackers will rack 
        up points for your team. At the end of the event, members of the winning team will receive limited edition 
        Bitcamp swag. So what are you waiting for? Take the survey and find your team!
      </p>

      <div class="campfire-questions-wrapper">
        <b-form-group
          v-for="(q, i) in questions"
          :key="i"
        >
          <template #label>
            <span class="required-label">{{ q.label }}</span>
          </template>

          <b-form-radio-group
            v-model="formData[`q${i+1}`]"
            :name="'q' + (i+1)"
            stacked
            :state="validations[`q${i+1}`]"
            @change="updateSelection(`q${i+1}`)"
          >
            <b-form-radio
              v-for="opt in q.options"
              :key="opt.value"
              :value="opt.value"
              class="d-block py-1"
            >
              {{ opt.text }}
            </b-form-radio>
          </b-form-radio-group>

          <b-form-invalid-feedback :state="validations[`q${i+1}`]">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
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
          Next Step <b-icon icon="arrow-right" class="ml-1" />
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
  name: "Page4",
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

      questions: [
        {
          label: "1. Blah blah blah? *",
          options: [
            { text: "Choice 1", value: "a" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "c" },
            { text: "Choice 4", value: "d" },
          ],
        },
        {
          label: "2. Blah blah blah? *",
          options: [
            { text: "Choice 1", value: "a" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "c" },
            { text: "Choice 4", value: "d" },
          ],
        },
        {
          label: "3. Blah blah blah? *",
          options: [
            { text: "Choice 1", value: "a" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "c" },
            { text: "Choice 4", value: "d" },
          ],
        },
        {
          label: "4. Blah blah blah? *",
          options: [
            { text: "Choice 1", value: "a" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "c" },
            { text: "Choice 4", value: "d" },
          ],
        },
        {
          label: "5. Blah blah blah? *",
          options: [
            { text: "Choice 1", value: "a" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "c" },
            { text: "Choice 4", value: "d" },
          ],
        },
      ],

      validations: {
        q1: null,
        q2: null,
        q3: null,
        q4: null,
        q5: null,
      },
    };
  },

  mounted() {
    this.questions.forEach((_, i) => {
      const key = `q${i+1}`;
      if (!this.formData[key]) this.$set(this.formData, key, null);
    });
  },

  methods: {
    updateSelection(key) {
      if (this.formData[key]) this.validations[key] = null;
    },

    validateForm() {
      let valid = true;
      this.questions.forEach((_, i) => {
        const key = `q${i+1}`;
        if (!this.formData[key]) {
          this.validations[key] = false;
          valid = false;
        }
      });
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

/* Buttons */
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.submit-btn {
  height: 44px;
  min-width: 160px;
  padding: 0 30px;

  font-size: 1rem !important;
  line-height: 1 !important;

  display: inline-flex;
  align-items: center;
  justify-content: center;
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