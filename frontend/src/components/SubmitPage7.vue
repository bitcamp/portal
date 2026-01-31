<template>
  <div class="register-page">
    <h1 class="page-title">Register for Bitcamp 2026</h1>

    <p class="page-subtitle">
      Questions? Chat with us in the bottom right hand corner or email
      <a href="mailto:hello@bit.camp">hello@bit.camp</a>. You can also learn more at
      <a href="https://bit.camp" target="_blank" rel="noopener">bit.camp</a>!
    </p>

    <div class="stepper">
      <div v-for="step in steps" :key="step.number" class="stepper-item" :class="{
        active: step.number === currentPage,
        completed: step.number < currentPage,
        inactive: step.number > currentPage,
      }">
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

    <b-form :disabled="isSending" @submit.prevent="handleNext">
      <h4 class="section-title">Rules and privacy policies</h4>
      <p class="info">
        Please read and agree to the necessary terms and conditions to proceed with your
        registration.
      </p>

      <div class="checkbox-wrapper">
        <b-form-checkbox id="checkbox-1" v-model="formData.MLH_privacy" name="checkbox-1" class="checkbox mb-3"
          :state="validations.valid_mlh_privacy" @change="clearValidation('valid_mlh_privacy')">
          I authorize you to share my application/registration information with Major League Hacking
          for event administration, ranking, and MLH administration in-line with the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>. I further agree
          to the terms of both the
          <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank">MLH Contest Terms and
            Conditions</a>
          and the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>.
          <span class="text-danger">*</span>
          <b-form-invalid-feedback :state="validations.valid_mlh_privacy">
            Please agree to MLH's privacy policy and terms
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox id="checkbox-2" v-model="formData.MLH_conduct" name="checkbox-2"
          :state="validations.valid_code_of_conduct" class="checkbox mb-3" style="padding-bottom: 1rem"
          @change="clearValidation('valid_code_of_conduct')">
          I have read and agree to the
          <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank">MLH Code of Conduct</a>. <span
            class="text-danger">*</span>
          <b-form-invalid-feedback :state="validations.valid_code_of_conduct">
            Please agree to MLH's code of conduct
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox id="checkbox-3" v-model="formData.MLH_emails" name="checkbox-3" class="checkbox">
          I authorize MLH to send me occasional emails about relevant events, career opportunities,
          and community announcements.
        </b-form-checkbox>
      </div>

      <div class="actions">
        <b-button type="button" class="submit-btn prev-btn" :disabled="isSending" @click="handlePrevious">
          <b-icon icon="arrow-left" class="mr-1" /> Previous
        </b-button>
        <b-button type="submit" class="submit-btn next-btn" :disabled="isSending">
          <template v-if="isSending">
            <b-spinner small class="mr-2" />
            Submitting...
          </template>
          <template v-else>
            Complete Registration
            <b-icon icon="arrow-right" class="ml-1" />
          </template>
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import generalMixin from "../mixins/general";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "SubmitPage7",
  mixins: [generalMixin],
  props: {
    formData: {
      type: Object,
      required: true,
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
        { number: 7, label: "Finalize & Submit" },
      ],

      validations: {
        valid_mlh_privacy: null,
        valid_code_of_conduct: null,
      },

      isSending: false,
    };
  },

  computed: {
    currentPage() {
      return 7;
    },
    whyBitcampChars() {
      return (this.formData.question1 || "").length;
    },
    whatBuildChars() {
      return (this.formData.question2 || "").length;
    },
  },

  mounted() {
    const keys = ["MLH_emails", "MLH_conduct", "MLH_privacy"];
    keys.forEach((key) => {
      if (!this.formData.hasOwnProperty(key)) {
        this.$set(this.formData, key, false);
      }
    });
  },

  methods: {
    clearValidation(key) {
      if (key in this.validations) {
        this.validations[key] = null;
      }
    },

    async handleNext(event) {
      event.preventDefault();
      if (!this.validateForm()) {
        this.$bvToast.toast("Please fill out all required fields", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
        return;
      }
      const response = await this.registerUser();
      if (response && response.referral_id) {
        this.$router.push({ path: "thanks", query: { r: response.referral_id } });
      } else {
        this.$bvToast.toast("Something went wrong when submitting your registration", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
      }
    },

    async registerUser() {
      if (this.isSending) return;
      this.isSending = true;

      const name = `${this.formData.first_name} ${this.formData.last_name}`;
      if (name === "Auran Shereef" || name === "Monte James") {
        this.$router.push({ path: "thanks" });
        return;
      }

      const time_taken = (Date.now() - this.form_start) / 1000;
      let referred_by = null;
      if (this.$route.params.referral) {
        this.$gtag.event("got-referred", { method: "Google" });
        referred_by = this.$route.params.referral;
        this.track({
          random_id: this.random_id,
          key: "got-referred",
          value: this.$route.params.referral,
        });
      }

      this.track({ random_id: this.random_id, key: `hf-${this.heard_from}`, value: 1 });
      if (this.heard_from_other) {
        this.track({ random_id: this.random_id, key: "hf-other", value: 1 });
      }

      this.$gtag.event("submit-registration", { method: "Google" });
      this.$gtag.time({
        name: "completion-time",
        value: time_taken,
        event_category: "Form completion duration",
      });
      this.track({
        random_id: this.random_id,
        key: "form-submitted",
        value: time_taken,
      });

      // Unused for some reason...
      // const d = new Date();
      // this.formData.secret =
      //   (d.getHours() * d.getDay() * 15).toString() +
      //   d.getFullYear().toString().split("").reverse().join("");

      const survey_count = { r: 0, b: 0, g: 0 };
      survey_count[this.formData.q1.substring(0, 1)] += 1;
      survey_count[this.formData.q2.substring(0, 1)] += 1;
      survey_count[this.formData.q3.substring(0, 1)] += 1;
      survey_count[this.formData.q4.substring(0, 1)] += 1;
      survey_count[this.formData.q5.substring(0, 1)] += 1;

      const isMinor = this.formData.age.length > 0 && Number(this.formData.age) < 18;
      const endpoint = isMinor ? "register_minor" : "register";

      const requestBody = {
        // Registration fields
        email: this.formData.email,
        phone: this.formData.phone,
        MLH_emails: this.formData.MLH_emails,
        MLH_conduct: this.formData.MLH_conduct,
        MLH_privacy: this.formData.MLH_privacy,
        name: name,
        first_name: this.formData.first_name,
        last_name: this.formData.last_name,
        country_of_residence: this.formData.country_of_residence,
        gender: this.formData.gender,
        ethnicity: this.formData.ethnicity,
        major: this.formData.major,
        recruit: this.formData.recruit,
        portfolio: this.formData.portfolio,
        school_year: this.formData.school_year,
        school: this.formData.school,
        school_other: this.formData.school_other,
        resume_link: this.formData.resume_link,
        resume_id: this.formData.resume_id,
        age: this.formData.age,
        transport: this.formData.transport,
        // transport_select: this.formData.transport_select,
        // transport_deposit: this.formData.transport_deposit,
        address: this.createAddressString(),
        address1: this.formData.address1,
        address2: this.formData.address2,
        city: this.formData.city,
        state: this.formData.state,
        country: this.formData.country,
        zip: this.formData.zip,
        tshirt_size: this.formData.tshirt_size,
        hack_count: this.formData.hack_count,
        question1: this.formData.question1,
        question2: this.formData.question2,
        heard_from: this.formData.heard_from,
        dietary_restrictions: this.createDietaryRestrictionString(),
        // gmaps_place_id: this.formData.gmaps_place_id,
        referred_by: referred_by,
        track_selected: this.formData.track_selected,
        waitlist_track_selected: [], // HARDCODED TO EMPTY ARRAY FOR NOW
        // citizen: this.formData.citizen,
        quantum_track: this.formData.quantum_track,
        beginner_content_opt_in: this.formData.beginner_content_opt_in,
        green: survey_count["g"],
        red: survey_count["r"],
        blue: survey_count["b"],

        // Team matching fields
        opt_in_team_matching: this.formData.opt_in_team_matching,
        collab: this.formData.collab,
        experience: this.formData.experience,
        languages: this.formData.languages,
        languages_other: this.formData.languages_other,
        skills_wanted_other: this.formData.skills_wanted_other,
        num_team_members: this.formData.num_team_members,
        prizes: this.formData.prizes,
        projects: this.formData.projects,
        serious: this.formData.serious,
        skill_level: this.formData.skill_level,
        skills_wanted: this.formData.skills_wanted,
        track: this.formData.track,
        year: this.formData.school_year,
      };

      if (isMinor) {
        Object.assign(requestBody, {
          waiver_type: this.formData.waiverType,
          photo_name: this.formData.photo_name,
          photo_date: this.formData.photo_date,
          photo_signature: this.formData.photo_signature,
          p_photo_name: this.formData.p_photo_name,
          p_photo_date: this.formData.p_photo_date,
          p_photo_signature: this.formData.p_photo_signature,
          terms_minor_name: this.formData.terms_minor_name,
          terms_minor_date: this.formData.terms_minor_date,
          terms_minor_signature: this.formData.terms_minor_signature,
          terms_parent_name: this.formData.terms_parent_name,
          terms_parent_date: this.formData.terms_parent_date,
          terms_parent_signature: this.formData.terms_parent_signature,
          chap_name: this.formData.chap_name,
          chap_date: this.formData.chap_date,
          chap_signature: this.formData.chap_signature,
          p_chap_name: this.formData.p_chap_name,
          p_chap_date: this.formData.p_chap_date,
          p_chap_signature: this.formData.p_chap_signature,
          school_minor_name: this.formData.school_minor_name,
          school_minor_date: this.formData.school_minor_date,
          school_minor_signature: this.formData.school_minor_signature,
          school_teacher_name: this.formData.school_teacher_name,
          school_teacher_date: this.formData.school_teacher_date,
          school_teacher_signature: this.formData.school_teacher_signature,
          school_principal_name: this.formData.school_principal_name,
          school_principal_date: this.formData.school_principal_date,
          school_principal_signature: this.formData.school_principal_signature,
        });
      }

      const response = await this.performPostRequest(
        this.getEnvVariable("BACKEND_ENDPOINT"),
        endpoint,
        requestBody
      );
      this.isSending = false;
      return response;
    },

    validateForm() {
      let valid = true;
      const form = this.formData;
      if (!form.MLH_privacy) {
        this.validations.valid_mlh_privacy = false;
        valid = false;
      } else {
        this.validations.valid_mlh_privacy = null;
      }
      if (!form.MLH_conduct) {
        this.validations.valid_code_of_conduct = false;
        valid = false;
      } else {
        this.validations.valid_code_of_conduct = null;
      }
      return valid;
    },

    createAddressString() {
      return [
        this.formData.address1,
        this.formData.address2,
        [this.formData.city, this.formData.state, this.formData.zip].filter(Boolean).join(" "),
        this.formData.country,
      ]
        .filter(Boolean)
        .join(", ");
    },

    createDietaryRestrictionString() {
      let diet_string = this.formData.diet_select.join(",");
      if (this.formData.diet_none) return "none";
      if (this.formData.diet_other && this.formData.diet_other_text != "") {
        if (diet_string != "") diet_string += ",";
        diet_string = diet_string + "other(" + this.formData.diet_other_text + ")";
      }
      return diet_string;
    },

    // createEthnicityString() {
    //   let ethnicity_string = this.formData.ethnicity_select.join(",");
    //   if (this.ethnicity_prefer_no_answer) return "prefer-not-to-answer";
    //   if (this.ethnicity_other && this.ethnicity_other_text != "") {
    //     if (ethnicity_string != "") ethnicity_string += ",";
    //     ethnicity_string = ethnicity_string + "other(" + this.ethnicity_other_text + ")";
    //   }
    //   return ethnicity_string;
    // },

    // createHeardFromString() {
    //   let heard_from_string = this.heard_from_select.join(",");
    //   if (this.heard_from_other && this.heard_from_other_text != "") {
    //     if (heard_from_string != "") heard_from_string += ",";
    //     heard_from_string = heard_from_string + "other(" + this.heard_from_other_text + ")";
    //   }
    //   return heard_from_string;
    // },

    // createTransportString() {
    //   return this.transport_select.join(",");
    // },

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

.checkbox-wrapper {
  margin-top: 20px;
}

.checkbox {
  font-size: 0.9rem;
  color: #555;
}

::v-deep .custom-control {
  align-items: center;
}

::v-deep .custom-control-label {
  margin-bottom: 0;
  line-height: 1.2;
}

::v-deep .custom-control-label::before,
::v-deep .custom-control-label::after {
  top: 0%;
  transform: translateY(-5%);
}

.checkbox a {
  color: #f97345;
  text-decoration: underline;
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
