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
              :class="{ active: step.number === 5 }"
            >
              <div class="stepper-circle">{{ step.number }}</div>
              <div class="stepper-label">{{ step.label }}</div>
            </div>
          </div>

          <hr />

          <b-form @submit.prevent="handleNext">
            <h4 class="section-title">Team Matching Preferences</h4>
            <p class="info">
              Tell us a little about your skills and interests so we can find you the perfect team!
              If you have already found a team, you may opt out.
            </p>

            <b-form-group>
              <template #label>
                <span
                  >Do you want to opt into team matching? <span class="text-danger">*</span></span
                >
              </template>
              <b-form-radio-group
                v-model="formData.opt_in_team_matching"
                name="opt_in_team_matching"
                @click="touched.opt_in_team_matching = true"
              >
                <b-form-radio value="yes">Yes</b-form-radio>
                <b-form-radio value="no">No</b-form-radio>
              </b-form-radio-group>
              <div v-if="showInvalid('opt_in_team_matching')" class="invalid-feedback d-block">
                Please select an answer
              </div>
            </b-form-group>

            <div v-if="formData.opt_in_team_matching === 'yes'">
              <h4 class="header">Track & Skills</h4>
              <div class="section-divider"></div>

              <b-form-group>
                <template #label>
                  <span>What track are you in? <span class="text-danger">*</span></span>
                </template>
                <b-form-radio-group
                  v-model="formData.track"
                  name="track"
                  stacked
                  @click="touched.track = true"
                >
                  <b-form-radio value="general">General</b-form-radio>
                  <b-form-radio value="quantum">Quantum</b-form-radio>
                  <b-form-radio value="cybersecurity">Cybersecurity</b-form-radio>
                  <b-form-radio value="ml">Machine Learning</b-form-radio>
                  <b-form-radio value="app dev">App Development</b-form-radio>
                </b-form-radio-group>
                <div v-if="showInvalid('track')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <b-form-group>
                <template #label>
                  <span
                    >Have you participated in a hackathon before?
                    <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-radio-group
                  v-model="formData.hackathon"
                  name="hackathon"
                  @click="touched.hackathon = true"
                >
                  <b-form-radio value="yes">Yes</b-form-radio>
                  <b-form-radio value="no">No</b-form-radio>
                </b-form-radio-group>
                <div v-if="showInvalid('hackathon')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <b-form-group>
                <template #label>
                  <span
                    >What programming languages and frameworks are you comfortable with?
                    <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-checkbox-group
                  v-model="formData.languages"
                  stacked
                  @click="touched.languages = true"
                >
                  <b-form-checkbox value="html/css">HTML/CSS</b-form-checkbox>
                  <b-form-checkbox value="javascript">Javascript</b-form-checkbox>
                  <b-form-checkbox value="react/vue">React/Vue</b-form-checkbox>
                  <b-form-checkbox value="python">Python</b-form-checkbox>
                  <b-form-checkbox value="sql">SQL</b-form-checkbox>
                  <b-form-checkbox value="flask">Flask</b-form-checkbox>
                  <b-form-checkbox value="java">Java</b-form-checkbox>
                </b-form-checkbox-group>
                <div v-if="showInvalid('languages')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <b-form-group>
                <template #label>
                  <span>What is your experience level? <span class="text-danger">*</span></span>
                </template>
                <b-form-radio-group
                  v-model="formData.experience"
                  name="experience"
                  stacked
                  @change="touched.experience = true"
                >
                  <b-form-radio value="beginner">Beginner (skill level 1-2)</b-form-radio>
                  <b-form-radio value="inter">Intermediate (skill level 3-4)</b-form-radio>
                  <b-form-radio value="advanced">Advanced (skill level 5)</b-form-radio>
                </b-form-radio-group>
                <div v-if="showInvalid('experience')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <h4 class="header">Team Preferences</h4>
              <div class="section-divider"></div>

              <b-form-group>
                <template #label>
                  <span
                    >Do you prefer working with someone with a similar skill level?
                    <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-radio-group
                  v-model="formData.skill_level"
                  name="skill-level"
                  @click="touched.skill_level = true"
                >
                  <b-form-radio value="yes">Yes</b-form-radio>
                  <b-form-radio value="no">No</b-form-radio>
                  <b-form-radio value="idc">Don't Care</b-form-radio>
                </b-form-radio-group>
                <div v-if="showInvalid('skill_level')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <b-form-group>
                <template #label>
                  <span
                    >What kind of technologies do you want your teammates to have knowledge of?
                    <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-checkbox-group
                  v-model="formData.skills_wanted"
                  stacked
                  @change="touched.skills_wanted = true"
                >
                  <b-form-checkbox value="html/css">HTML/CSS</b-form-checkbox>
                  <b-form-checkbox value="javascript">Javascript</b-form-checkbox>
                  <b-form-checkbox value="react/vue">React/Vue</b-form-checkbox>
                  <b-form-checkbox value="python">Python</b-form-checkbox>
                  <b-form-checkbox value="sql">SQL</b-form-checkbox>
                  <b-form-checkbox value="flask">Flask</b-form-checkbox>
                  <b-form-checkbox value="java">Java</b-form-checkbox>
                </b-form-checkbox-group>
                <div v-if="showInvalid('skills_wanted')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <b-form-group>
                <template #label>
                  <span
                    >How many team members do you already have? (Select 1 if you are the only one in
                    the team) <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-radio-group
                  v-model="formData.num_team_members"
                  name="team-members"
                  @click="touched.num_team_members = true"
                >
                  <b-form-radio value="one">1</b-form-radio>
                  <b-form-radio value="two">2</b-form-radio>
                  <b-form-radio value="three">3</b-form-radio>
                </b-form-radio-group>
                <div v-if="showInvalid('num_team_members')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <h4 class="header">Project Preferences</h4>
              <div class="section-divider"></div>

              <b-form-group>
                <template #label>
                  <span
                    >What kind of projects are you interested in (i.e. web, mobile, AI, etc.)?
                    <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-checkbox-group
                  v-model="formData.projects"
                  stacked
                  @change="touched.projects = true"
                >
                  <b-form-checkbox value="web_dev">Web Development</b-form-checkbox>
                  <b-form-checkbox value="mobile_app">Mobile App</b-form-checkbox>
                  <b-form-checkbox value="ai/ml">AI/ML</b-form-checkbox>
                </b-form-checkbox-group>
                <div v-if="showInvalid('projects')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <b-form-group>
                <template #label>
                  <span
                    >What Bitcamp prizes are you interested in catering your project towards?
                    <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-checkbox-group
                  v-model="formData.prizes"
                  stacked
                  @change="touched.prizes = true"
                >
                  <b-form-checkbox value="hardware">Best Hardware Hack</b-form-checkbox>
                  <b-form-checkbox value="bitcamp">Best Bitcamp Hack</b-form-checkbox>
                  <b-form-checkbox value="first_time">Best First Time Hack</b-form-checkbox>
                  <b-form-checkbox value="ui/ux">Best UI/UX Hack</b-form-checkbox>
                  <b-form-checkbox value="moonshot">Best Moonshot Hack</b-form-checkbox>
                  <b-form-checkbox value="razzle_dazzle">Best Razzle Dazzle Hack</b-form-checkbox>
                  <b-form-checkbox value="social_good">Best Social Good Hack</b-form-checkbox>
                  <b-form-checkbox value="gamification">Best Gamification Hack</b-form-checkbox>
                  <b-form-checkbox value="peoples_choice">People's Choice Hack</b-form-checkbox>
                  <b-form-checkbox value="sustainability">Best Sustainability Hack</b-form-checkbox>
                  <b-form-checkbox value="no_pref">No Preference</b-form-checkbox>
                </b-form-checkbox-group>
                <div v-if="showInvalid('prizes')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <h4 class="header">Commitment</h4>
              <div class="section-divider"></div>

              <b-form-group>
                <template #label>
                  <span>How serious are you? <span class="text-danger">*</span></span>
                </template>
                <b-form-radio-group
                  v-model="formData.serious"
                  name="serious"
                  @click="touched.serious = true"
                >
                  <b-form-radio value="win">I want to win! (16-20 hours)</b-form-radio>
                  <b-form-radio value="funsies"
                    >I'm just doing this for fun (9-13 hours)</b-form-radio
                  >
                  <b-form-radio value="learning"
                    >I want to learn, if I win that will be a plus (1-8 hours)</b-form-radio
                  >
                </b-form-radio-group>
                <div v-if="showInvalid('serious')" class="invalid-feedback d-block">
                  Please select an answer
                </div>
              </b-form-group>

              <b-form-group>
                <template #label>
                  <span
                    >Which way would you prefer collaborating with your team?
                    <span class="text-danger">*</span></span
                  >
                </template>
                <b-form-checkbox-group
                  v-model="formData.collab"
                  stacked
                  @change="touched.collab = true"
                >
                  <b-form-checkbox value="remote">Remote</b-form-checkbox>
                  <b-form-checkbox value="hybrid">Hybrid</b-form-checkbox>
                  <b-form-checkbox value="in-person">In Person</b-form-checkbox>
                </b-form-checkbox-group>
                <div v-if="showInvalid('collab')" class="invalid-feedback d-block">
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

const fifthPageRequiredFields = [
  "opt_in_team_matching",
  "track",
  "hackathon",
  "languages",
  "experience",
  "skill_level",
  "skills_wanted",
  "num_team_members",
  "projects",
  "prizes",
  "serious",
  "collab",
];

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "TeamMatchingStep",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    const requiredFields = [
      "opt_in_team_matching",
      "track",
      "hackathon",
      "languages",
      "experience",
      "skill_level",
      "skills_wanted",
      "projects",
      "prizes",
      "serious",
      "collab",
      "num_team_members",
    ];

    const validations = {};
    requiredFields.forEach((key) => {
      validations[key] = null;
    });

    const formFieldsDefaults = {
      opt_in_team_matching: null, // New primary question
      track: null,
      hackathon: null,
      languages: [],
      experience: null,
      skill_level: null,
      skills_wanted: [],
      projects: [],
      prizes: [],
      serious: null,
      collab: [],
      num_team_members: null,
      // Removed: username, password, first_name, last_name, year, email
    };

    return {
      touched: Object.fromEntries([...fifthPageRequiredFields].map((key) => [key, false])),
      steps: [
        { number: 1, label: "Personal Info" },
        { number: 2, label: "Track & Experience" },
        { number: 3, label: "Attendance Details" },
        { number: 4, label: "Campfire Games" },
        { number: 5, label: "Team Matching" }, // Active step
        { number: 6, label: "Minor Waivers" },
        { number: 7, label: "Finalize & Submit" },
      ],
      requiredFields: requiredFields,
      arrayFields: ["languages", "skills_wanted", "projects", "prizes", "collab"],
      formFieldsDefaults: formFieldsDefaults,
    };
  },

  computed: {
    validations() {
      let checkValidBox = (field) => {
        let isValidBox = true;
        if (createCheckboxString(field).length === 0) {
          isValidBox = false;
        }
        return isValidBox;
      };

      let createCheckboxString = (field) => {
        if (!this.formData[field] || !Array.isArray(this.formData[field])) {
          return "";
        }
        return this.formData[field].join(",");
      };

      return {
        opt_in_team_matching:
          this.formData.opt_in_team_matching !== null &&
          this.formData.opt_in_team_matching !== undefined,
        track: this.formData.track !== null && this.formData.track !== undefined,
        hackathon: this.formData.hackathon !== null && this.formData.hackathon !== undefined,
        languages: checkValidBox("languages"),
        experience: this.formData.experience !== null && this.formData.experience !== undefined,
        skill_level: this.formData.skill_level !== null && this.formData.skill_level !== undefined,
        skills_wanted: checkValidBox("skills_wanted"),
        num_team_members:
          this.formData.num_team_members !== null && this.formData.num_team_members !== undefined,
        projects: checkValidBox("projects"),
        prizes: checkValidBox("prizes"),
        serious: this.formData.serious !== null && this.formData.serious !== undefined,
        collab: checkValidBox("collab"),
      };
    },
  },

  mounted() {
    // Initialize all form fields in formData if they don't exist
    Object.keys(this.formFieldsDefaults).forEach((key) => {
      if (!this.formData.hasOwnProperty(key)) {
        this.$set(this.formData, key, this.formFieldsDefaults[key]);
      }
    });
  },

  methods: {
    showInvalid(field) {
      return this.touched[field] === true && this.validations[field] === false;
    },

    validateForm() {
      if (this.formData.opt_in_team_matching === "no") {
        return this.validations.opt_in_team_matching;
      }

      return fifthPageRequiredFields.every((fieldName) => this.validations[fieldName]);
    },

    // Helper to clear validation errors when user opts out
    clearAllValidationsIfOptOut() {
      if (this.formData.opt_in_team_matching === "no") {
        fifthPageRequiredFields.forEach((key) => {
          // Keep the opt-in validation, but clear everything else
          if (key !== "opt_in_team_matching") {
            this.$set(this.validations, key, null);
          }
        });
      }
    },

    handleNext() {
      console.log("TOUCHED", this.touched);
      console.log("FORM DATA", this.formData);

      event.preventDefault();

      fifthPageRequiredFields.forEach((key) => {
        this.touched[key] = true;
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
/* Stepper and Page Content Styles */
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
  display: flex;
  justify-content: flex-end;
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

.header {
  margin-top: 2rem;
}

.section-divider {
  height: 2px;
  background-color: #ffeac7;
  margin: 0.5rem auto 1.5rem;
  border-radius: 2px;
}
</style>
