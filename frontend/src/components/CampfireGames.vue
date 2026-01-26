<template>
  <div class="register-wrapper">
    <b-row class="justify-content-center">
      <b-col md="12" lg="12">
        <div class="page-content">
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
              :class="{ active: step.number === 4 }"
            >
              <div class="stepper-circle">{{ step.number }}</div>
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
                  <span>{{ q.label }} <span class="text-danger">*</span></span>
                </template>

                <b-form-radio-group
                  v-model="formData[`q${i + 1}`]"
                  :name="'q' + (i + 1)"
                  stacked
                  @click="touched[`q${i + 1}`] = true"
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
                class="submit-btn"
                style="margin-right: 10px"
              >
                <b-icon icon="arrow-left" /> Previous
              </b-button>
              <b-button type="submit" class="submit-btn">
                Next Step
                <b-icon icon="arrow-right" class="ml-1" />
              </b-button>
            </div>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

const fourthPageRequiredFields = ["q1", "q2", "q3", "q4", "q5"];

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "CampfireGames",
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
          label: "1. Blah blah blah?",
          options: [
            { text: "Choice 1", value: "r" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "g" },
            { text: "Choice 4", value: "r1" },
          ],
        },
        {
          label: "2. Blah blah blah?",
          options: [
            { text: "Choice 1", value: "r" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "g" },
            { text: "Choice 4", value: "g1" },
          ],
        },
        {
          label: "3. Blah blah blah?",
          options: [
            { text: "Choice 1", value: "r" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "g" },
            { text: "Choice 4", value: "b1" },
          ],
        },
        {
          label: "4. Blah blah blah?",
          options: [
            { text: "Choice 1", value: "r" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "g" },
            { text: "Choice 4", value: "r1" },
          ],
        },
        {
          label: "5. Blah blah blah?",
          options: [
            { text: "Choice 1", value: "r" },
            { text: "Choice 2", value: "b" },
            { text: "Choice 3", value: "g" },
            { text: "Choice 4", value: "g1" },
          ],
        },
      ],
    };
  },

  computed: {
    validations() {
      return {
        q1: this.formData.q1 !== null && this.formData.q1 !== undefined,
        q2: this.formData.q2 !== null && this.formData.q2 !== undefined,
        q3: this.formData.q3 !== null && this.formData.q3 !== undefined,
        q4: this.formData.q4 !== null && this.formData.q4 !== undefined,
        q5: this.formData.q5 !== null && this.formData.q5 !== undefined,
      };
    },
  },

  mounted() {
    this.questions.forEach((_, i) => {
      const key = `q${i + 1}`;
      if (!this.formData[key]) this.$set(this.formData, key, null);
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
      console.log("TOUCHED", this.touched);
      console.log("FORM DATA", this.formData);

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

<style scoped>
.page-content {
  background: #fff7ee;
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
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
  display: flex;
  justify-content: space-between;
  margin: 18px 0 14px;
}

.stepper-item {
  flex: 1;
  text-align: center;
  font-size: 0.7rem;
}

.stepper-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 auto 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  color: #9a9a9a;
  border: 1px solid #dddddd;
  font-size: 1rem;
  font-weight: 600;
}

.stepper-item.active .stepper-circle {
  background: #ff6b35;
  color: #ffffff;
  border-color: #ff6b35;
}

.stepper-item.active .stepper-label {
  color: #ff6b35;
  font-weight: 600;
}

.actions {
  text-align: right;
  margin-top: 30px;
}

.submit-btn {
  background-color: #ff6b35;
  border: none;
  color: #ffffff;
  padding: 10px 32px;
  font-weight: 700;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(255, 107, 53, 0.45);
}
</style>
