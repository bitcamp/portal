<template>
  <b-container>
    <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
      <!-- Page 1: Tell us about yourself -->
      <Page1
        v-if="currentPage === 1"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(2)"
        @email-filled="handleEmailFilled"
      />

      <!-- Page 2: Choose a track -->
      <Page2
        v-if="currentPage === 2"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(3)"
        @previous="goToPage(1)"
      />

      <!-- Page 3: Travel and T-shirt -->
      <Page3
        v-if="currentPage === 3"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(4)"
        @previous="goToPage(2)"
      />

      <!-- Page 4 and beyond would go here as needed -->
      <Page4
        v-if="currentPage === 4"
        :form-data="formData"
        @next="goToPage(5)"
        @previous="goToPage(3)"
      />

      <Page5
        v-if="currentPage === 5"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(6)"
        @previous="goToPage(4)"
      />

      <Page7
        v-if="currentPage === 6"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(7)"
        @previous="goToPage(5)"
      />
      <!-- For now, this could be a summary or additional forms page -->
    </b-card>
  </b-container>
</template>

<script>
import Page1 from "./Page1.vue";
import Page2 from "./Page2.vue";
import Page3 from "./Page3.vue";
import Page4 from "./Page4.vue";
import Page5 from "./Page5.vue";
import Page7 from "./Page7.vue";
import { v4 as uuid } from "uuid";

export default {
  name: "RegistrationFormParent",
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page7,
  },
  props: {
    default_track: {
      type: String,
      default: "general",
    },
    type: {
      type: String,
      default: "hacker",
    },
  },
  data() {
    return {
      currentPage: 1,
      formData: {
        // Page 1 data
        email: this.$route.query.redo != null ? this.$route.query.redo : "",
        phone: "",
        first_name: "",
        last_name: "",
        age: "",
        country_of_residence: "",
        gender: "",
        ethnicity: "",
        ethnicity_select: [],
        ethnicity_other: false,
        ethnicity_other_text: "",
        ethnicity_prefer_no_answer: false,
        school: "",
        school_other: "",
        school_other_selected: false,
        school_year: "",
        major: "",
        heard_from: "",
        heard_from_select: "",
        heard_from_other: false,
        heard_from_other_text: "",

        // Page 2 data
        track_selected: this.default_track || "general",
        quantum_track: null,
        beginner_content_opt_in: null,
        hack_count: "",
        question1: "",
        question2: "",
        recruit: "",
        portfolio: "",

        // Page 3 data
        transport: null,
        tshirt_size: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        diet_select: [],
        diet_other: false,
        diet_other_text: "",
        diet_none: false,

        // Other form data (to be continued in full form)
        MLH_emails: false,
        MLH_conduct: false,
        MLH_privacy: false,
        name: "",
        resume: "",
        resume_link: "",
        resume_id: "",
        minors_form: false,
        transport_select: "",
        transport_deposit: null,
        address1: "",
        gmaps_place_id: "",
        referred_by: "",
        waitlist_track_selected: "",
        citizen: null,
        waitlist: true,
        photo_name: "",
        photo_date: "",
        photo_signature: "",
        p_photo_name: "",
        p_photo_date: "",
        p_photo_signature: "",
        chap_name: "",
        chap_date: "",
        chap_signature: "",
        p_chap_name: "",
        p_chap_date: "",
        p_chap_signature: "",
        terms_minor_name: "",
        terms_minor_date: "",
        terms_minor_signature: "",
        terms_parent_name: "",
        terms_parent_date: "",
        terms_parent_signature: "",
        school_minor_name: "",
        school_minor_date: "",
        school_minor_signature: "",
        school_teacher_name: "",
        school_teacher_date: "",
        school_teacher_signature: "",
        school_principal_name: "",
        school_principal_date: "",
        school_principal_signature: "",
        selected_survey_1: "",
        selected_survey_2: "",
        selected_survey_3: "",
        selected_survey_4: "",
        selected_survey_5: "",
        waiverType: null,
      },
      random_id: uuid(),
      form_start: Date.now(),
    };
  },
  methods: {
    goToPage(pageNumber) {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.currentPage = pageNumber;
    },
    handleEmailFilled(email) {
      this.formData.email = email;
      // You can add analytics tracking here if needed
    },
  },
};
</script>

<style scoped>
.main-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
