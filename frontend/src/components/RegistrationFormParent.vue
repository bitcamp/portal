<template>
  <b-container>
    <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
      <!-- Page 1: Tell us about yourself -->
      <PersonalInfoPage1
        v-if="currentPage === 1"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(2)"
        @email-filled="handleEmailFilled"
      />

      <!-- Page 2: Choose a track -->
      <TrackExperiencePage2
        v-if="currentPage === 2"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(3)"
        @previous="goToPage(1)"
        @resume-change="handleResumeChange"
      />

      <!-- Page 3: Travel and T-shirt -->
      <AttendancePage3
        v-if="currentPage === 3"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(4)"
        @previous="goToPage(2)"
      />

      <!-- Page 4 and beyond would go here as needed -->
      <CampfireGamesPage4
        v-if="currentPage === 4"
        :form-data="formData"
        @next="goToPage(5)"
        @previous="goToPage(3)"
      />

      <TeamMatchingPage5
        v-if="currentPage === 5"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(isMinor ? 6 : 7)"
        @previous="goToPage(4)"
      />

      <MinorFormsPage6
        v-if="currentPage === 6"
        :form-data="formData"
        :current-page="currentPage"
        @next="goToPage(7)"
        @previous="goToPage(5)"
      />

      <SubmitPage7
        v-if="currentPage === 7"
        :form-data="formData"
        @next="goToPage(8)"
        @previous="goToPage(isMinor ? 6 : 5)"
      />
      <!-- For now, this could be a summary or additional forms page -->
    </b-card>
  </b-container>
</template>

<script>
import PersonalInfoPage1 from "./PersonalInfoPage1.vue";
import TrackExperiencePage2 from "./TrackExperiencePage2.vue";
import AttendancePage3 from "./AttendancePage3.vue";
import CampfireGamesPage4 from "./CampfireGamesPage4.vue";
import TeamMatchingPage5 from "./TeamMatchingPage5.vue";
import SubmitPage7 from "./SubmitPage7.vue";
import { v4 as uuid } from "uuid";
import MinorFormsPage6 from "./MinorFormsPage6.vue";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf.js";
import "pdfjs-dist/build/pdf.worker.entry";
import generalMixin from "../mixins/general";

export default {
  name: "RegistrationFormParent",
  components: {
    PersonalInfoPage1,
    TrackExperiencePage2,
    AttendancePage3,
    CampfireGamesPage4,
    TeamMatchingPage5,
    MinorFormsPage6,
    SubmitPage7,
  },
  mixins: [generalMixin],
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
        first_name: "",
        last_name: "",
        email: this.$route.query.redo != null ? this.$route.query.redo : "",
        phone: "",
        age: "",
        country_of_residence: "",
        gender: "",
        ethnicity: [],
        school: "",
        school_other: "",
        school_other_selected: false,
        school_year: "",
        major: "",
        heard_from: [],

        // Page 2 data
        track_selected: this.default_track || "general",
        quantum_track: null,
        beginner_content_opt_in: null,
        hack_count: "",
        question1: "",
        question2: "",
        recruit: "",
        portfolio: "",
        resume_link: "",
        resume_id: "",

        // Page 3 data
        transport: null,
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        tshirt_size: "",
        diet_select: [],
        diet_other: false,
        diet_other_text: "",
        diet_none: false,

        // Page 4 data
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",

        // Page 5 data
        opt_in_team_matching: null,
        track: null,
        hackathon: null,
        languages: [],
        experience: null,
        skill_level: null,
        skills_wanted: [],
        num_team_members: null,
        projects: [],
        prizes: [],
        serious: null,
        collab: [],

        // Page 6 data
        photo_name: "",
        photo_date: "",
        photo_signature: "",
        p_photo_name: "",
        p_photo_date: "",
        p_photo_signature: "",
        terms_minor_name: "",
        terms_minor_date: "",
        terms_minor_signature: "",
        terms_parent_name: "",
        terms_parent_date: "",
        terms_parent_signature: "",
        waiverType: "",
        chap_name: "",
        chap_date: "",
        chap_signature: "",
        p_chap_name: "",
        p_chap_date: "",
        p_chap_signature: "",
        school_minor_name: "",
        school_minor_date: "",
        school_minor_signature: "",
        school_teacher_name: "",
        school_teacher_date: "",
        school_teacher_signature: "",
        school_principal_name: "",
        school_principal_date: "",
        school_principal_signature: "",

        // Page 7 data
        MLH_privacy: false,
        MLH_conduct: false,
        MLH_emails: false,

        // unused fields (figure out later)
        // ethnicity_select: [],
        // ethnicity_other: false,
        // ethnicity_other_text: "",
        // ethnicity_prefer_no_answer: false,
        // heard_from_select: "",
        // heard_from_other: false,
        // heard_from_other_text: "",
        // selected_survey_1: "",
        // selected_survey_2: "",
        // selected_survey_3: "",
        // selected_survey_4: "",
        // selected_survey_5: "",
        // name: "",
        // resume: "",
        // minors_form: false,
        // transport_select: "",
        // transport_deposit: null,
        // address1: "",
        // gmaps_place_id: "",
        // referred_by: "",
        // waitlist_track_selected: "",
        // citizen: null,
        // waitlist: true,
      },
      random_id: uuid(),
      form_start: Date.now(),
    };
  },
  computed: {
    isMinor() {
      const age = parseInt(this.formData.age, 10);
      return !isNaN(age) && age < 18;
    },
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
    getFileExtension(filename) {
      const parts = filename.split(".");
      const extension = parts.pop();
      return extension;
    },
    async handleResumeChange(event) {
      const file = event.target.files && event.target.files[0];
      if (!file || !file.name) return;

      // 5MB upload limit
      if (file.size > 1024 * 1024 * 5) {
        this.$bvToast.toast("Please ensure that your resume file size does not exceed 5MB.", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
        return;
      }

      const fileExtension = this.getFileExtension(file.name);
      const cleanname =
        this.formData.first_name
          .replace(/[^a-z0-9_-]/gi, "_")
          .toLowerCase()
          .replace(/_{2,}/g, "_")
          .substring(0, 48) +
        "_" +
        this.formData.last_name
          .replace(/[^a-z0-9_-]/gi, "_")
          .toLowerCase()
          .replace(/_{2,}/g, "_")
          .substring(0, 48) +
        "." +
        fileExtension;

      const userParams = {
        id: this.random_id,
        filename: cleanname,
        filetype: fileExtension,
      };

      const r = await this.performPostRequest(
        this.getEnvVariable("BACKEND_ENDPOINT"),
        "upload_resume",
        userParams
      );

      if (!(r && r.putUrl)) {
        this.$bvToast.toast("Oops! We couldn't upload your resume, try again later!", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
        return;
      }

      const cleanFile = new File([file], cleanname, {
        type: file.type,
        lastModified: file.lastModified,
      });

      const r2 = await this.performRawPostRequest(r.putUrl, cleanFile);
      this.formData.resume_link = r.uploadUrl;
      this.formData.resume_id = this.random_id;

      if (!(r2 && r2.status == 200)) {
        this.$bvToast.toast("Oops! We couldn't upload your resume, try again later!", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
        return;
      }

      // below is for resume parsing
      let text = "";
      const pdfVersion = "2.10.377";
      // eslint-disable-next-line no-import-assign
      PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;

      const loadingTask = PDFJS.getDocument(this.formData.resume_link);
      await loadingTask.promise.then((doc) => {
        const { numPages } = doc;

        let lastPromise;
        lastPromise = doc.getMetadata();

        const loadPage = async (pageNum) => {
          const page = await doc.getPage(pageNum);

          return page.getTextContent().then((content) => {
            // we only want the page text (strings)
            const strings = content.items.map((item) => item.str);
            text += strings.join(" ");
          });
        };

        for (let i = 1; i <= numPages; i += 1) {
          lastPromise = lastPromise.then(loadPage.bind(null, i));
        }
        return lastPromise;
      });

      const resumeParams = {
        user_id: this.random_id,
        resume_text: text,
      };
      await this.performPostRequest(
        this.getEnvVariable("BACKEND_ENDPOINT"),
        "upload_text_resume",
        resumeParams
      );
    },
  },
};
</script>

<style scoped>
.main-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
