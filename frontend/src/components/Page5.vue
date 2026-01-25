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
      <h4 class="section-title">Team Matching Preferences</h4>
      <p class="info">
        Tell us a little about your skills and interests so we can find you the perfect team!
        If you have already found a team, you may opt out.
      </p>

      <b-form-group>
        <template #label>
          <span class="required-label">Do you want to opt into team matching? *</span>
        </template>
        <b-form-radio-group
          v-model="formData.opt_in_team_matching"
          name="opt_in_team_matching"
          :state="validations.opt_in_team_matching"
          @change="validateField('opt_in_team_matching'); clearAllValidationsIfOptOut()"
        >
          <b-form-radio value="yes">Yes</b-form-radio>
          <b-form-radio value="no">No</b-form-radio>
        </b-form-radio-group>
          <b-form-invalid-feedback :state="validations.opt_in_team_matching">
            Please select an answer
          </b-form-invalid-feedback>
      </b-form-group>
      
      <div v-if="formData.opt_in_team_matching === 'yes'">
        <h4 class="header">Track & Skills</h4>
        <div class="section-divider"></div>
        
        <b-form-group>
          <template #label>
            <span class="required-label">What track are you in? *</span>
          </template>
          <b-form-radio-group 
            v-model="formData.track" 
            name="track" 
            stacked
            :state="validations.track"
            @change="validateField('track')"
          >
            <b-form-radio value="general">General</b-form-radio>
            <b-form-radio value="quantum">Quantum</b-form-radio>
            <b-form-radio value="cybersecurity">Cybersecurity</b-form-radio>
            <b-form-radio value="ml">Machine Learning</b-form-radio>
            <b-form-radio value="app dev">App Development</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="required-label">Have you participated in a hackathon before? *</span>
          </template>
          <b-form-radio-group
            v-model="formData.hackathon"
            name="hackathon"
            :state="validations.hackathon"
            @change="validateField('hackathon')"
          >
            <b-form-radio value="yes">Yes</b-form-radio>
            <b-form-radio value="no">No</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="required-label"
              >What programming languages and frameworks are you comfortable
              with? *</span
            >
          </template>
          <b-form-checkbox-group 
            v-model="formData.languages" 
            stacked
            :state="validations.languages"
            @change="validateField('languages')"
          >
            <b-form-checkbox value="html/css">HTML/CSS</b-form-checkbox>
            <b-form-checkbox value="javascript">Javascript</b-form-checkbox>
            <b-form-checkbox value="react/vue">React/Vue</b-form-checkbox>
            <b-form-checkbox value="python">Python</b-form-checkbox>
            <b-form-checkbox value="sql">SQL</b-form-checkbox>
            <b-form-checkbox value="flask">Flask</b-form-checkbox>
            <b-form-checkbox value="java">Java</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="required-label">What is your experience level? *</span>
          </template>
          <b-form-radio-group 
            v-model="formData.experience" 
            name="experience" 
            stacked
            :state="validations.experience"
            @change="validateField('experience')"
          >
            <b-form-radio value="beginner"
              >Beginner (skill level 1-2)</b-form-radio
            >
            <b-form-radio value="inter"
              >Intermediate (skill level 3-4)</b-form-radio
            >
            <b-form-radio value="advanced">Advanced (skill level 5)</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <h4 class="header">Team Preferences</h4>
        <div class="section-divider"></div>

        <b-form-group>
          <template #label>
            <span class="required-label"
              >Do you prefer working with someone with a similar skill
              level? *</span
            >
          </template>
          <b-form-radio-group 
            v-model="formData.skill_level" 
            name="skill-level"
            :state="validations.skill_level"
            @change="validateField('skill_level')"
          >
            <b-form-radio value="yes">Yes</b-form-radio>
            <b-form-radio value="no">No</b-form-radio>
            <b-form-radio value="idc">Don't Care</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="required-label"
              >What kind of technologies do you want your teammates to have
              knowledge of? *</span
            >
          </template>
          <b-form-checkbox-group 
            v-model="formData.skills_wanted" 
            stacked
            :state="validations.skills_wanted"
            @change="validateField('skills_wanted')"
          >
            <b-form-checkbox value="html/css">HTML/CSS</b-form-checkbox>
            <b-form-checkbox value="javascript">Javascript</b-form-checkbox>
            <b-form-checkbox value="react/vue">React/Vue</b-form-checkbox>
            <b-form-checkbox value="python">Python</b-form-checkbox>
            <b-form-checkbox value="sql">SQL</b-form-checkbox>
            <b-form-checkbox value="flask">Flask</b-form-checkbox>
            <b-form-checkbox value="java">Java</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="required-label"
              >How many team members do you already have? (Select 1 if you are the only one in the team) *</span
            >
          </template>
          <b-form-radio-group 
            v-model="formData.num_team_members" 
            name="team-members"
            :state="validations.num_team_members"
            @change="validateField('num_team_members')"
          >
            <b-form-radio value="one">1</b-form-radio>
            <b-form-radio value="two">2</b-form-radio>
            <b-form-radio value="three">3</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <h4 class="header">Project Preferences</h4>
        <div class="section-divider"></div>

        <b-form-group>
          <template #label>
            <span class="required-label"
              >What kind of projects are you interested in (i.e. web, mobile, AI,
              etc.)? *</span
            >
          </template>
          <b-form-checkbox-group 
            v-model="formData.projects" 
            stacked
            :state="validations.projects"
            @change="validateField('projects')"
          >
            <b-form-checkbox value="web_dev">Web Development</b-form-checkbox>
            <b-form-checkbox value="mobile_app">Mobile App</b-form-checkbox>
            <b-form-checkbox value="ai/ml">AI/ML</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="required-label"
              >What Bitcamp prizes are you interested in catering your project
              towards? *</span
            >
          </template>
          <b-form-checkbox-group 
            v-model="formData.prizes" 
            stacked
            :state="validations.prizes"
            @change="validateField('prizes')"
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
        </b-form-group>

        <h4 class="header">Commitment</h4>
        <div class="section-divider"></div>

        <b-form-group>
          <template #label>
            <span class="required-label">How serious are you? *</span>
          </template>
          <b-form-radio-group 
            v-model="formData.serious" 
            name="serious"
            :state="validations.serious"
            @change="validateField('serious')"
          >
            <b-form-radio value="win">I want to win! (16-20 hours)</b-form-radio>
            <b-form-radio value="funsies"
              >I'm just doing this for fun (9-13 hours)</b-form-radio
            >
            <b-form-radio value="learning"
              >I want to learn, if I win that will be a plus (1-8
              hours)</b-form-radio
            >
          </b-form-radio-group>
        </b-form-group>

        <b-form-group>
          <template #label>
            <span class="required-label"
              >Which way would you prefer collaborating with your team? *</span
            >
          </template>
          <b-form-checkbox-group 
            v-model="formData.collab" 
            stacked
            :state="validations.collab"
            @change="validateField('collab')"
          >
            <b-form-checkbox value="remote">Remote</b-form-checkbox>
            <b-form-checkbox value="hybrid">Hybrid</b-form-checkbox>
            <b-form-checkbox value="in-person">In Person</b-form-checkbox>
          </b-form-checkbox-group>
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
  name: "Page5",
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
    const requiredFields = [
      'opt_in_team_matching',
      'track',
      'hackathon',
      'languages',
      'experience',
      'skill_level',
      'skills_wanted',
      'projects',
      'prizes',
      'serious',
      'collab',
      'num_team_members',
    ];

    const validations = {};
    requiredFields.forEach(key => {
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
      steps: [
        { number: 1, label: "Personal Info" },
        { number: 2, label: "Track & Experience" },
        { number: 3, label: "Attendance Details" },
        { number: 4, label: "Campfire Games" },
        { number: 5, label: "Team Matching" }, // Active step
        { number: 6, label: "Minor Waivers" },
        { number: 7, label: "Finalize & Submit" },
      ],
      validations: validations,
      requiredFields: requiredFields,
      arrayFields: ['languages', 'skills_wanted', 'projects', 'prizes', 'collab'],
      formFieldsDefaults: formFieldsDefaults,
    };
  },

  mounted() {
    // Initialize all form fields in formData if they don't exist
    Object.keys(this.formFieldsDefaults).forEach(key => {
      if (!this.formData.hasOwnProperty(key)) {
        this.$set(this.formData, key, this.formFieldsDefaults[key]);
      }
    });
  },

  methods: {
    validateField(key) {
      const value = this.formData[key];
      let isValid = true;

      if (this.arrayFields.includes(key)) {
        // Checkbox group validation: check if array has at least one item
        isValid = Array.isArray(value) && value.length > 0;
      } else {
        // Text/Radio group validation: check for null, undefined, or empty string
        isValid = value !== null && value !== undefined && value !== '';
      }

      this.$set(this.validations, key, isValid ? null : false);
      return isValid;
    },
    
    // Helper to clear validation errors when user opts out
    clearAllValidationsIfOptOut() {
        if (this.formData.opt_in_team_matching === 'no') {
            this.requiredFields.forEach(key => {
                // Keep the opt-in validation, but clear everything else
                if (key !== 'opt_in_team_matching') {
                    this.$set(this.validations, key, null);
                }
            });
        }
    },

    validateForm() {
      let valid = true;
      let fieldsToValidate = ['opt_in_team_matching'];

      // Check the primary opt-in question first
      if (!this.validateField('opt_in_team_matching')) {
          valid = false;
      }

      // If opted in, validate all other required fields
      if (this.formData.opt_in_team_matching === 'yes') {
        fieldsToValidate = this.requiredFields.filter(key => key !== 'opt_in_team_matching');
        
        fieldsToValidate.forEach(key => {
          const fieldIsValid = this.validateField(key);
          if (!fieldIsValid) {
            valid = false;
          }
        });
      } else if (this.formData.opt_in_team_matching === 'no') {
        // If opted out, ensure all other fields are clear of errors
        this.clearAllValidationsIfOptOut();
      }

      return valid;
    },

    handleNext() {
      if (this.validateForm()) {
        this.$emit("next");
        return;
      }

      // NOTE: Using console.error instead of $bvToast.toast as per instructions
      console.error("Please fill out all required fields");
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
  top: 25px;
  left: calc(50% + 25px); 
  width: calc(100% - 25px);
  height: 3px;
  border-radius: 999px;
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
  padding: 10px 30px;
  font-weight: 700;
  border-radius: 6px;
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

  .stepper {
    display: flex !important;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 20px; 
  }

  .stepper-item {
    flex: 0 0 25%; /* Row 1: 4 items */
    max-width: 25%;
    position: relative; /* Essential for line positioning */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stepper-circle {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    z-index: 2; /* Ensure circle stays above the line */
  }

  .stepper-label {
    font-size: 0.8rem;
  }

  .stepper-line {
    display: block !important; 
    position: absolute;
    top: 17.5px; 
    left: calc(50% + 17.5px); 
    width: calc(100% - 35px);
    height: 2px;
    background: #e8e8e8; 
    z-index: 1;
  }

  .stepper-item:nth-child(4) .stepper-line,
  .stepper-item:nth-child(7) .stepper-line {
    display: none !important;
  }

  .actions {
    display: flex;
    justify-content: center; /* center the row */
    gap: 10px;               /* spacing between buttons */
  }

  .submit-btn {
    flex: 0 0 auto;          /* don't stretch, keep natural size */
    padding: 8px 20px;
    font-size: 0.9rem;
  }

  /* Form fields */
  .b-form-group {
    margin-bottom: 15px;
  }

  .b-form-radio-group,
  .b-form-checkbox-group {
    font-size: 0.9rem;
  }
}
</style>