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
          active: step.number === 4,
          completed: step.number < 4,
          inactive: step.number > 4,
        }"
      >
        <div class="stepper-circle">
          <span v-if="step.number < 4" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        <div class="stepper-label">
          {{ step.label }}
        </div>
      </div>
    </div>

    <hr />

    <b-form @submit.prevent="handleNext">
      <h4 class="section-title">Campfire Games Survey</h4>
      <p class="info">
        This year, you'll once again be put into one of three teams based on your personality and
        interests. By winning unique challenges and attending workshops and mini-events, you and
        your fellow hackers will rack up points for your team. At the end of the event, members of
        the winning team will receive limited edition Bitcamp swag. So what are you waiting for?
        Take the survey and find your team!
      </p>

      <div class="campfire-questions-wrapper">
        <b-form-group v-for="(q, i) in questions" :key="i">
          <template #label>
            <span class="form-label font-weight-bold">
              {{ q.label }} <span class="text-danger">*</span>
            </span>
          </template>

          <b-form-radio-group
            v-model="formData[`q${i + 1}`]"
            :name="'q' + (i + 1)"
            stacked
            @change="touched[`q${i + 1}`] = true"
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

          <div v-if="showInvalid(`q${i + 1}`)" class="invalid-feedback d-block">
            Please select an answer
          </div>
        </b-form-group>
      </div>

      <div class="actions">
        <b-button type="button" class="submit-btn prev-btn" @click="handlePrevious">
          <b-icon icon="arrow-left" class="mr-1" /> Previous
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
import Vue from "vue";
import { IconsPlugin } from "bootstrap-vue";

const fourthPageRequiredFields = ["q1", "q2", "q3", "q4", "q5"];
Vue.use(IconsPlugin);

export default {
  name: "CampfireGamesPage4",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      touched: Object.fromEntries([...fourthPageRequiredFields].map((key) => [key, false])),
      steps: [
        { number: 1, label: "Personal Info" },
        { number: 2, label: "Track & Experience" },
        { number: 3, label: "Attendance Details" },
        { number: 4, label: "Campfire Games" },
        { number: 5, label: "Team Matching" },
        { number: 6, label: "Minor Waivers" },
        { number: 7, label: "Finalize & Submit" },
      ],
      questions: [
        {
          label: "1. What color alien would you be?",
          options: [
            { text: "Green, obviously 💚", value: "r" },
            { text: "Pink", value: "b" },
            { text: "Orange", value: "g" },
            { text: "Blue", value: "r1" },
          ],
        },
        {
          label: "2. What planet would you most like to visit?",
          options: [
            { text: "Saturn 🪐", value: "r" },
            { text: "Mars", value: "b" },
            { text: "Neptune", value: "g" },
            { text: "Venus", value: "g1" },
          ],
        },
        {
          label: "3. If you were an alien, which special power would you like to have?",
          options: [
            { text: "Flying 🚀", value: "r" },
            { text: "Invisibility", value: "b" },
            { text: "Super Strength", value: "g" },
            { text: "Super Speed", value: "b1" },
          ],
        },
        {
          label: "4. What in space would you most like to visit?",
          options: [
            { text: "An alien city 🏙️", value: "r" },
            { text: "An abandoned planet", value: "b" },
            { text: "A black hole", value: "g" },
            { text: "A star", value: "r1" },
          ],
        },
        {
          label: "5. What is your favorite thing about Bitcamp?",
          options: [
            { text: "Hacking", value: "r" },
            { text: "Free stuff", value: "b" },
            { text: "Late night shenanigans", value: "g" },
            { text: "First time, I’ll find out!", value: "g1" },
          ],
        },
      ],
    };
  },
  computed: {
    validations() {
      return {
        q1: !!this.formData.q1,
        q2: !!this.formData.q2,
        q3: !!this.formData.q3,
        q4: !!this.formData.q4,
        q5: !!this.formData.q5,
      };
    },
  },
  mounted() {
    this.questions.forEach((_, i) => {
      const key = `q${i + 1}`;
      if (this.formData[key] === undefined) this.$set(this.formData, key, null);
    });
  },
  methods: {
    showInvalid(field) {
      return this.touched[field] === true && this.validations[field] === false;
    },
    validateForm() {
      return fourthPageRequiredFields.every((fieldName) => this.validations[fieldName]);
    },
    handleNext(event) {
      event.preventDefault();
      fourthPageRequiredFields.forEach((key) => {
        this.touched[key] = true;
      });
      if (this.validateForm()) {
        this.$emit("next");
        return;
      }
      this.$bvToast.toast("Please fill out all required fields", {
        toaster: "b-toaster-top-center",
        solid: true,
        variant: "danger",
      });
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
  padding: 0 20px;
  text-align: left;
}

.page-title {
  font-size: 2.3rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 30px;
}

/* --- STEPPER STYLES --- */
.stepper {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
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
  background: #e9ecef;
  z-index: -1;
}

.stepper-item.completed:not(:last-child)::after {
  background: #f97345 !important;
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
  position: relative;
  z-index: 2;
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

.stepper-item.active .stepper-circle,
.stepper-item.completed .stepper-circle {
  background: #f97345 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 10px rgba(249, 115, 69, 0.3);
}

.checkmark {
  font-size: 1.4rem;
}

/* --- FORM & ACTION STYLES --- */
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

.section-title {
  font-weight: 700;
}

.info {
  font-size: 0.95rem;
  opacity: 0.9;
  color: #555;
  margin-bottom: 18px;
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
