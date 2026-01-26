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
        :class="{ active: step.number === 4, completed: step.number < 4 }"
      >
        <div class="stepper-circle">
          <span v-if="step.number < 4" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        <div class="stepper-label">{{ step.label }}</div>
      </div>
    </div>

    <hr />

    <b-form @submit.prevent="handleNext">
      <h4 class="section-title">Campfire Games Survey</h4>
      <p class="info">
        This year, you'll once again be put into one of three teams based on your personality
        and interests. By winning unique challenges and attending workshops and mini-events,
        you and your fellow hackers will rack up points for your team. At the end of the
        event, members of the winning team will receive limited edition Bitcamp swag. So what
        are you waiting for? Take the survey and find your team!
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
        <b-button
          type="button"
          @click="handlePrevious"
          class="submit-btn prev-btn"
        >
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
        { label: "1. Blah blah blah?", options: [{ text: "Choice 1", value: "r" }, { text: "Choice 2", value: "b" }, { text: "Choice 3", value: "g" }, { text: "Choice 4", value: "r1" }] },
        { label: "2. Blah blah blah?", options: [{ text: "Choice 1", value: "r" }, { text: "Choice 2", value: "b" }, { text: "Choice 3", value: "g" }, { text: "Choice 4", value: "g1" }] },
        { label: "3. Blah blah blah?", options: [{ text: "Choice 1", value: "r" }, { text: "Choice 2", value: "b" }, { text: "Choice 3", value: "g" }, { text: "Choice 4", value: "b1" }] },
        { label: "4. Blah blah blah?", options: [{ text: "Choice 1", value: "r" }, { text: "Choice 2", value: "b" }, { text: "Choice 3", value: "g" }, { text: "Choice 4", value: "r1" }] },
        { label: "5. Blah blah blah?", options: [{ text: "Choice 1", value: "r" }, { text: "Choice 2", value: "b" }, { text: "Choice 3", value: "g" }, { text: "Choice 4", value: "g1" }] },
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
      fourthPageRequiredFields.forEach((key) => { this.touched[key] = true; });
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
/* These lines ensure there is NO white background or margins around the component */
.register-page {
  max-width: 760px;
  margin: 40px auto 80px;
  padding: 0 20px;
  text-align: left;
}

.row.no-gutters {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.p-0 {
  padding: 0 !important;
}

/* The card itself */
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

/* Orange for 1, 2, 3 (Completed) and 4 (Active) */
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

/* Responsive styles for mobile */
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