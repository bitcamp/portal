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

      <h4>Choose a track!</h4>
      <p class="info">
        Select the track that interests you most. Each track offers unique workshops and mentorship opportunities.
      </p>

      <div>
        <b-row class="row gx-12" cols="1">
          <b-col md="6" class="p-1 col d-flex align-items-stretch center">
            <label>
              <div class="color h-100 w-100">
                <input v-model="formData.track_selected" type="radio" value="general" @click="onSelectTrack('general')" />
                <b-card class="h-100 w-100 general" :class="{ active: formData.track_selected === 'general' }">
                  <h4>General</h4>
                  <p>
                    For any and all hackers! Build the perfect hack using hardware,
                    software, and collaboration with other tech-lovers, design
                    thinkers, and students - all skill and experience levels are
                    welcome!
                  </p>
                </b-card>
              </div>
            </label>
          </b-col>

          <b-col md="6" class="p-1 col d-flex align-items-stretch">
            <label>
              <div class="color h-100 w-100">
                <input v-model="formData.track_selected" type="radio" value="quantum" @click="onSelectTrack('quantum')" />
                <b-card class="h-100 w-100 general" :class="{ active: formData.track_selected === 'quantum' }">
                  <h4>Quantum</h4>
                  <p>
                    Hackers will delve into the field of quantum computing with
                    exclusive mentors, sponsors, and workshops! Hackers will use
                    their knowledge of Python and other computing skills on
                    educational and interactive Quantum Track activities.
                  </p>
                </b-card>
              </div>
            </label>
          </b-col>

          <b-col md="6" class="p-1 col d-flex align-items-stretch">
            <label>
              <div class="color h-100 w-100">
                <input v-model="formData.track_selected" type="radio" value="machine_learning" @click="onSelectTrack('machine_learning')" />
                <b-card class="h-100 w-100 general" :class="{ active: formData.track_selected === 'machine_learning' }">
                  <h4>Machine Learning</h4>
                  <p>
                    If you are amazed by AI breakthroughs like ChatGPT and driven to create something impactful, this is your track!
                    Dive into hands-on workshops and learn to build and deploy machine learning models.
                  </p>
                </b-card>
              </div>
            </label>
          </b-col>

          <b-col md="6" class="p-1 col d-flex align-items-stretch">
            <label>
              <div class="color h-100 w-100">
                <input v-model="formData.track_selected" type="radio" value="app_dev" @click="onSelectTrack('app_dev')" />
                <b-card class="h-100 w-100 general" :class="{ active: formData.track_selected === 'app_dev' }">
                  <h4>App Dev</h4>
                  <p>
                    Ready to turn your innovative app idea into a reality? Join the App Dev track
                    and learn full-stack development through exclusive workshops and mentors!
                  </p>
                </b-card>
              </div>
            </label>
          </b-col>

          <b-col md="6" offset-md="3" class="p-1 col d-flex align-items-stretch">
            <label>
              <div class="color h-100 w-100">
                <input v-model="formData.track_selected" type="radio" value="cybersecurity" @click="onSelectTrack('cybersecurity')" />
                <b-card class="h-100 w-100 general" :class="{ active: formData.track_selected === 'cybersecurity' }">
                  <h4>Cybersecurity</h4>
                  <p>
                    Explore the realm of cybersecurity and understand various aspects of the field
                    through interactive workshops and real-world applications.
                  </p>
                </b-card>
              </div>
            </label>
          </b-col>
        </b-row>

        <!-- Quantum Track Selection -->
        <b-form-row v-if="formData.track_selected === 'quantum'" class="mt-4">
          <b-form-group
            label="Would you like to be placed in the beginner quantum or advanced quantum track?*"
            class="col-md-12"
            label-for="quantum-survey"
          >
            <b-form-radio-group
              id="quantum-survey"
              v-model="formData.quantum_track"
              class="font-weight pt-2"
              :state="validations.quantum_track"
            >
              <b-form-radio value="beginner"> Beginner </b-form-radio>
              <b-form-radio value="advanced"> Advanced </b-form-radio>
            </b-form-radio-group>
            <b-form-invalid-feedback :state="validations.quantum_track">
              Please select an answer
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- Beginner Content Opt-in -->
        <b-form-row class="mt-4">
          <b-form-group
            label="Although we are not offering a beginner (general) track this year, Bitcamp remains committed to being a hackathon for hackers of all skill levels. Would you like us to share beginner-friendly content with you?*"
            label-for="beginner-question"
            class="col-md-12 pt-2"
          >
            <b-form-radio-group
              id="beginner-question"
              v-model="formData.beginner_content_opt_in"
              class="font-weight-normal pt-2"
              :state="validations.beginner_content_opt_in"
            >
              <b-form-radio :value="true"> Yes </b-form-radio>
              <b-form-radio :value="false"> No </b-form-radio>
            </b-form-radio-group>
            <b-form-invalid-feedback :state="validations.beginner_content_opt_in">
              Please select an answer
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>
      </div>

      <!-- Navigation Buttons -->
      <div style="display: flex; justify-content: space-between; margin-top: 30px">
        <b-button @click="handlePrevious" class="submit-btn" style="background-color: #F5F5F5; color: #FF6B35; border: 1px solid #FF6B35">
          <b-icon icon="arrow-left" style="margin-right: 5px" />
          Previous
        </b-button>
        <b-button @click="handleNext" class="submit-btn" style="background-color: #FF6B35; color: white; border: none">
          Next Step
          <b-icon icon="arrow-right" style="margin-left: 5px" />
        </b-button>
      </div>
    </b-col>
    <b-col md="1" />
  </b-row>
</template>

<script>
import { IconsPlugin } from "bootstrap-vue";
import Vue from "vue";

Vue.use(IconsPlugin);

export default {
  name: "Page2",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      validations: {
        track_selected: null,
        quantum_track: null,
        beginner_content_opt_in: null,
      },
    };
  },
  methods: {
    getStepStyle(step) {
      if (step <= 2) {
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
    onSelectTrack(track) {
      this.formData.track_selected = track;
      this.validations.track_selected = null;
    },
    validateForm() {
      let isValid = true;

      // Track Selection
      if (!this.formData.track_selected || this.formData.track_selected.length === 0) {
        this.validations.track_selected = false;
        isValid = false;
      } else {
        this.validations.track_selected = null;
      }

      // Quantum Track (if Quantum is selected)
      if (this.formData.track_selected === "quantum" && !this.formData.quantum_track) {
        this.validations.quantum_track = false;
        isValid = false;
      } else {
        this.validations.quantum_track = null;
      }

      // Beginner Content Opt-in
      if (this.formData.beginner_content_opt_in === null || this.formData.beginner_content_opt_in === undefined) {
        this.validations.beginner_content_opt_in = false;
        isValid = false;
      } else {
        this.validations.beginner_content_opt_in = null;
      }

      return isValid;
    },
    handleNext() {
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
label {
  cursor: pointer;
}
input[type="radio"] {
  display: none;
}
.general {
  transition: all 0.3s ease;
  border: 2px solid #f5f5f5;
}
.general.active {
  border: 2px solid #ff6b35;
  background-color: #fff5f0;
}
</style>
