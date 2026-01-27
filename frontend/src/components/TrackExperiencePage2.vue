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
          active: step.number === currentPage, 
          completed: step.number < currentPage,
          inactive: step.number > currentPage 
        }"
      >
        <div class="stepper-circle">
          <span v-if="step.number < currentPage" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        <div class="stepper-label">{{ step.label }}</div>
      </div>
    </div>

    <hr />

    <b-form @submit.prevent="handleNext">
      <h4 class="section-title">Choose a track! <span class="text-danger">*</span></h4>

      <p class="info">
        Select the track that interests you most. Each track offers unique workshops and mentorship
        opportunities.
      </p>

      <div class="track-scroll">
        <label class="track-card-wrapper">
          <input
            v-model="formData.track_selected"
            type="radio"
            value="general"
            @click="touched.track_selected = true"
          />
          <b-card
            class="track-card general-card"
            :class="{ 'track-card--active': formData.track_selected === 'general' }"
          >
            <h5 class="track-title">General</h5>
            <p>
              For any and all hackers! Build the perfect hack using hardware, software, and
              collaboration with other tech-lovers, design thinkers, and students – all skill and
              experience levels are welcome!
            </p>
          </b-card>
        </label>

        <label class="track-card-wrapper">
          <input
            v-model="formData.track_selected"
            type="radio"
            value="quantum"
            @click="touched.track_selected = true"
          />
          <b-card
            class="track-card"
            :class="{ 'track-card--active': formData.track_selected === 'quantum' }"
          >
            <h5 class="track-title">Quantum</h5>
            <p>
              Hackers will delve into the field of quantum computing with exclusive mentors,
              sponsors, and workshops. Use your knowledge of Python and other computing skills on
              interactive Quantum Track activities!
            </p>
          </b-card>
        </label>

        <label class="track-card-wrapper">
          <input
            v-model="formData.track_selected"
            type="radio"
            value="machine_learning"
            @click="touched.track_selected = true"
          />
          <b-card
            class="track-card"
            :class="{ 'track-card--active': formData.track_selected === 'machine_learning' }"
          >
            <h5 class="track-title">Machine Learning</h5>
            <p>
              If you are amazed by AI breakthroughs like ChatGPT and driven to create something
              impactful, this is your track! Dive into hands-on workshops and learn to build and
              deploy machine learning models.
            </p>
          </b-card>
        </label>

        <label class="track-card-wrapper">
          <input
            v-model="formData.track_selected"
            type="radio"
            value="app_dev"
            @click="touched.track_selected = true"
          />
          <b-card
            class="track-card"
            :class="{ 'track-card--active': formData.track_selected === 'app_dev' }"
          >
            <h5 class="track-title">App Dev</h5>
            <p>
              Ready to turn your innovative app idea into a reality? Join the App Dev track and
              learn full-stack development through exclusive workshops and mentors!
            </p>
          </b-card>
        </label>

        <label class="track-card-wrapper">
          <input
            v-model="formData.track_selected"
            type="radio"
            value="cybersecurity"
            @click="touched.track_selected = true"
          />
          <b-card
            class="track-card"
            :class="{ 'track-card--active': formData.track_selected === 'cybersecurity' }"
          >
            <h5 class="track-title">Cybersecurity</h5>
            <p>
              Explore the realm of cybersecurity and understand various aspects of the field through
              interactive workshops and real-world applications.
            </p>
          </b-card>
        </label>
      </div>

      <div v-if="formData.track_selected === 'quantum'" class="mt-4 form-group">
        <label class="form-label">
          Would you like to be placed in the beginner quantum or advanced quantum track?*
        </label>
        <div class="radio-inline-group">
          <label class="radio-inline">
            <input
              v-model="formData.quantum_track"
              type="radio"
              value="beginner"
              @click="touched.quantum_track = true"
            />
            Beginner
          </label>
          <label class="radio-inline">
            <input
              v-model="formData.quantum_track"
              type="radio"
              value="advanced"
              @click="touched.quantum_track = true"
            />
            Advanced
          </label>
        </div>
        <div v-if="showInvalid('quantum_track')" class="invalid-feedback d-block">
          Please select an answer
        </div>
      </div>

      <div class="mt-4 form-group">
        <label class="form-label">
          Although we are not offering a beginner (general) track this year, Bitcamp remains
          committed to being a hackathon for hackers of all skill levels. Would you like us to share
          beginner-friendly content with you? <span class="text-danger">*</span>
        </label>
        <div class="radio-inline-group">
          <label class="radio-inline">
            <input
              v-model="formData.beginner_content_opt_in"
              type="radio"
              :value="true"
              @click="touched.beginner_content_opt_in = true"
            />
            Yes
          </label>
          <label class="radio-inline">
            <input
              v-model="formData.beginner_content_opt_in"
              type="radio"
              :value="false"
              @click="touched.beginner_content_opt_in = true"
            />
            No
          </label>
        </div>
        <div v-if="showInvalid('beginner_content_opt_in')" class="invalid-feedback d-block">
          Please select an answer
        </div>
      </div>

      <hr class="mt-4" />
      <h4 class="section-title">Why Bitcamp?</h4>
      <p class="info">
        We'd like to get to know you a little better! Help us learn more about you and make Bitcamp
        even more amazing by answering some questions!
      </p>

      <b-form-group>
        <template #label>
          How many hackathons have you participated in before?
          <span class="text-danger">*</span>
        </template>
        <b-form-input
          id="num-hackathons"
          v-model="formData.hack_count"
          type="number"
          :state="showState('hack_count')"
          placeholder="Number of hackathons here..."
          @input="touched.hack_count = true"
        />
      </b-form-group>

      <b-form-group>
        <template #label>
          Why are you interested in attending Bitcamp?
          <span class="text-danger">*</span>
        </template>
        <b-form-textarea
          id="why-bitcamp"
          v-model="formData.question1"
          class="form-control"
          :state="showState('question1')"
          rows="4"
          :maxlength="1000"
          placeholder="Your response here..."
          @input="touched.question1 = true"
        />
        <small class="char-counter">
          {{ whyBitcampChars }} / 1000 characters (minimum 50 required)
        </small>
      </b-form-group>

      <b-form-group>
        <template #label>
          What do you plan on building at Bitcamp?
          <span class="text-danger">*</span>
        </template>
        <b-form-textarea
          id="what-build"
          v-model="formData.question2"
          class="form-control"
          :state="showState('question2')"
          rows="4"
          :maxlength="1000"
          placeholder="Your response here..."
          @input="touched.question2 = true"
        />
        <small class="char-counter">
          {{ whatBuildChars }} / 1000 characters (minimum 50 required)
        </small>
      </b-form-group>

      <hr class="mt-4" />
      <h4 class="section-title">Want to get hired?</h4>
      <p class="info">Let us know, and we’ll pass your info on to our sponsors!</p>

      <b-form-row>
        <b-form-group class="col-md-6">
          <template #label>
            Do you want to be recruited for jobs?
            <span class="text-danger">*</span></template
          >
          <b-form-select
            id="recruit-select"
            v-model="formData.recruit"
            :options="recruitOptions"
            :state="showState('recruit')"
            class="form-select"
            @change="touched.recruit = true"
          />
        </b-form-group>

        <b-form-group label="GitHub or Portfolio Link" class="col-md-6">
          <b-form-input
            id="github-link"
            v-model="formData.portfolio"
            :state="showState('portfolio')"
            placeholder="github.com/username"
            @input="touched.portfolio = true"
          />
        </b-form-group>
      </b-form-row>

      <b-form-group label="Resume (.pdf .doc .docx)">
        <div class="resume-upload" @click="triggerResumeFile">
          <span class="resume-placeholder">
            {{ resumeLabel }}
          </span>
          <span class="resume-browse"> Browse </span>
          <input
            id="resume-upload"
            ref="resumeInput"
            type="file"
            class="resume-file-input"
            accept=".pdf,.doc,.docx"
            @change="onResumeChange"
          />
        </div>
      </b-form-group>

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
import { IconsPlugin } from "bootstrap-vue";
import Vue from "vue";

Vue.use(IconsPlugin);

const secondPageRequiredFields = [
  "track_selected",
  "beginner_content_opt_in",
  "hack_count",
  "question1",
  "question2",
  "recruit",
];

const secondPageOptionalFields = ["quantum_track", "portfolio"];

export default {
  name: "TrackExperiencePage2",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      touched: Object.fromEntries(
        [...secondPageRequiredFields, ...secondPageOptionalFields].map((key) => [key, false])
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
      recruitOptions: [
        { value: "", text: "Select one...", disabled: true },
        { value: "yes", text: "Yes" },
        { value: "no", text: "No" },
        { value: "maybe", text: "Maybe later" },
      ],
      // NEW: label text for the resume upload UI
      resumeLabel: "Upload Resume (size limit: 5MB)",
    };
  },
  computed: {
    // The step number for this page (used by the stepper UI)
    currentPage() {
      return 2;
    },

    validations() {
      const req = (v) => v && v.toString().trim().length > 0;

      return {
        track_selected: this.formData.track_selected && req(this.formData.track_selected),
        quantum_track:
          this.formData.quantum_track !== null && this.formData.quantum_track !== undefined,
        beginner_content_opt_in:
          this.formData.beginner_content_opt_in !== null &&
          this.formData.beginner_content_opt_in !== undefined,
        hack_count: req(this.formData.hack_count) && Number(this.formData.hack_count) >= 0,
        question1: req(this.formData.question1) && (this.formData.question1 || "").length >= 50,
        question2: req(this.formData.question2) && (this.formData.question2 || "").length >= 50,
        recruit: req(this.formData.recruit),
        portfolio: req(this.formData.portfolio),
      };
    },
    whyBitcampChars() {
      return (this.formData.question1 || "").length;
    },
    whatBuildChars() {
      return (this.formData.question2 || "").length;
    },
    optionalFieldsRequired() {
      const res = [];

      if (this.formData.recruit === "yes") {
        res.push("portfolio");
      }

      if (this.formData.track_selected === "quantum") {
        res.push("quantum_track");
      }

      return res;
    },
  },
  methods: {
    showState(field) {
      if (
        secondPageOptionalFields.includes(field) &&
        !this.optionalFieldsRequired.includes(field)
      ) {
        return null;
      }
      if (!this.touched[field]) return null;
      return this.validations[field] === true ? true : false;
    },

    showInvalid(field) {
      // Note that "submitting" the form touches the fields so thats why I have this first part
      return this.touched[field] === true && this.validations[field] === false;
    },

    // NEW: open the hidden file input
    triggerResumeFile() {
      if (this.$refs.resumeInput) {
        this.$refs.resumeInput.click();
      }
    },

    // NEW: update label + bubble event to parent
    onResumeChange(event) {
      const file = event.target.files && event.target.files[0];
      this.resumeLabel = file ? file.name : "Upload Resume (size limit: 5MB)";
      this.$emit("resume-change", event);
    },

    validateForm() {
      return (
        secondPageRequiredFields.every((fieldName) => this.validations[fieldName]) &&
        this.optionalFieldsRequired.every((fieldName) => this.validations[fieldName])
      );
    },

    handleNext(event) {
      console.log("TOUCHED", this.touched);
      console.log("FORM DATA", this.formData);
      event.preventDefault();

      secondPageRequiredFields.forEach((key) => {
        this.touched[key] = true;
      });
      secondPageOptionalFields.forEach((key) => {
        if (this.optionalFieldsRequired.includes(key)) {
          this.touched[key] = true;
        } else {
          this.touched[key] = false;
        }
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
html,
body,
#app {
  height: 100%;
  margin: 0;
}

/* full orange gradient */
body {
  background-image: none !important;
  background: linear-gradient(135deg, #f97345 0%, #f9ad4b 55%, #f5a13e 100%) fixed;
}

/* center content, no big card */
.register-page {
  max-width: 820px; /* Slightly wider for labels */
  margin: 40px auto 80px;
  padding: 0 20px 40px;
  text-align: left;
}

/* titles / text (same vibe as page 1) */
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
.page-subtitle a:hover {
  text-decoration: underline;
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

/* --- UPDATED STEPPER STYLES --- */
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
  background: #e9ecef;
  z-index: -1;
}

/* Orange for completed lines */
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
  transition: all 0.3s ease;
}


.stepper-label {
  font-size: 0.75rem !important; 
  font-weight: 600; 
  color: #837d7d !important; /* Force all labels to stay grey */
  text-align: center;
  line-height: 1.1;
  width: 65px; 
  word-wrap: break-word;
  margin-top: 8px;
}

/* Remove or comment out any color overrides for active/completed labels */
/* .stepper-item.active .stepper-label { color: #000; }  <-- DELETE THIS */

/* Orange for Active and Completed */
.stepper-item.active .stepper-circle,
.stepper-item.completed .stepper-circle {
  background: #f97345 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 10px rgba(249, 115, 69, 0.3);
}

/* Grey label for future steps */
.stepper-item.inactive .stepper-label {
  color: #a0a0a0 !important;
}

.checkmark {
  font-size: 1.4rem;
}

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

/* HORIZONTAL SCROLL CONTAINER FOR TRACKS */
.track-scroll {
  display: flex;
  gap: 18px;
  margin-top: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;
}

/* Each card in the scroll strip */
.track-card-wrapper {
  flex: 0 0 280px;
  max-width: 320px;
  scroll-snap-align: start;
  cursor: pointer;
}

/* hide radios inside track cards */
.track-card-wrapper input[type="radio"] {
  display: none;
}

/* DEFAULT STATE — all cards white background, black text */
.track-card {
  height: 100%;
  border-radius: 8px;
  border: 1px solid #f0e0d1;
  background: #ffffff !important;
  padding: 18px;
  transition: all 0.25s ease;
  color: #000000 !important;
}

.track-card p,
.track-card h5 {
  color: #000000 !important;
}

/* CLICKED / ACTIVE — cards turn orange */
.track-card--active {
  background: #f97345 !important;
  border-color: #f97345 !important;
  color: #ffffff !important;
}
.track-card--active h5,
.track-card--active p {
  color: #ffffff !important;
}

.track-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 6px;
}

/* Form typography */
label.form-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 4px;
}

.form-control,
.form-select {
  font-size: 0.85rem;
  border-radius: 4px;
  border-color: #e3d7ca;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #f97345;
  box-shadow: 0 0 0 0.2rem rgba(249, 115, 69, 0.15);
}

/* Radio groups */
.radio-inline-group {
  display: flex;
  gap: 20px;
  margin-top: 6px;
}

.radio-inline {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.radio-inline input[type="radio"] {
  display: inline-block !important;
  margin-right: 6px;
}

/* Character counter */
.char-counter {
  display: block;
  margin-top: 4px;
  font-size: 0.75rem;
  color: #777;
}

/* Custom Resume upload UI */
.resume-upload {
  width: 100%;
  border: 1px solid #e3d7ca;
  border-radius: 6px;
  background-color: #ffffff;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 14px;
  font-size: 0.9rem;
  color: #9a9a9a;
  cursor: pointer;
}

.resume-placeholder {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 16px;
}

.resume-browse {
  height: 100%;
  padding: 0 18px;
  display: flex;
  align-items: center;
  border-left: 1px solid #e3d7ca;
  background-color: #f3f3f3;
  color: #555;
  font-weight: 500;
}

.resume-file-input {
  display: none;
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