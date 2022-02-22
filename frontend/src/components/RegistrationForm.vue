<template>
  <b-row>
    <b-col md="1"></b-col>
    <b-col md="10">
      <br />
      <h1 style="text-align: left">Register for Bitcamp 2022</h1>

      <p style="font-size: 0.9rem; opacity: 95%">
        Questions? Chat with us in the bottom right hand corner or email
        <a href="mailto:hello@bit.camp">hello@bit.camp</a>.
        <br> You can also learn more at <a href="https://bit.camp">bit.camp</a>!
      </p>
      <hr />
      <b-form @submit="registerUser" class="registration-form" autocomplete="on">
        <!-- Name -->
        <h4>Tell us about yourself!</h4>
        <p class="info">Once you register, you'll receive more info about Bitcamp 2022 at the email you provide.</p>
        <b-form-row>
          <b-form-group id="input-group-1" label="Full Name*" label-for="input-1" class="col-12 col-md-7">
            <b-form-input
              id="input-1"
              v-model="form.name"
              name="name"
              autocomplete="name"
              placeholder="Sophie Wilson"
              :state="valid_name"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_name">
              Please enter your name
            </b-form-invalid-feedback>
          </b-form-group>


          <!-- Date of Birth -->
          <b-form-group id="input-group-birthday" label="Birthday*" label-for="birthday" class="col-12 col-md-5">
            <b-form-input
              id="input-birthday"
              v-model="form.birthday"
              name="birthday"
              autocomplete="bday"
              placeholder="mm/dd/yyyy"
              :state="valid_birthday"
              type="date"
              min="1900-01-01"
              max="2022-01-01"
            ></b-form-input>
            <b-form-invalid-feedback :state="valid_birthday">
              Please enter your birthday
            </b-form-invalid-feedback>
          </b-form-group>

        </b-form-row>

        <!-- Email -->
        <b-form-row>
        <b-form-group id="input-group-2" label="Email*" label-for="input-2" class="col-7 col-md-7">
          <b-form-input
            id="input-2"
            v-model="form.email"
            name="email"
            autocomplete="email"
            placeholder="hello@bit.camp"
            :state="valid_email"
            @blur="this.emailFilledOut"
            type="email"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_email">
            Please enter a valid email address
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Phone Number -->
        <b-form-group id="input-group-9" label="Phone Number*" label-for="input-9" class="col-5 col-md-5">
          <b-form-input
            id="input-9"
            v-model="form.phone"
            name="phone"
            autocomplete="tel"
            placeholder="555-555-5555"
            :state="valid_phone"
            type="tel"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_phone">
            Please enter a valid phone number
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <!-- Ethnicity & Gender -->
        <b-form-row>
        <b-form-group id="input-group-gender" label="Gender Identity*" label-for="input-gender" class="col-md-6">
          <b-form-select
            id="input-gender"
            v-model="form.gender"
            placeholder="Choose a gender identity"
            :options="gender_options"
            :state="valid_gender"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_gender">
            Please select a gender identity
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-ethnicity" label="Ethnicity*" label-for="input-ethnicity" class="col-md-6">
          <b-form-select
            id="input-ethnicity"
            v-model="form.ethnicity"
            placeholder="Choose an ethnicity"
            :options="ethnicity_options"
            :state="valid_ethnicity"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_ethnicity">
            Please select an ethnicity
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <hr>
        <h4>How about your school?</h4>
        <br>

        <!-- School Type -->
        <b-form-row>
        
        <b-form-group id="input-group-school" label="School Name*" label-for="input-school" class="col-md-12">
          <vue-typeahead-bootstrap
            id="input-school"
            :inputClass="school_class"
            inputName="school"
            placeholder="University of Maryland at College Park"
            v-model="form.school"
            :data="university_options"
            :state="valid_school"></vue-typeahead-bootstrap>
          <b-form-invalid-feedback :state="valid_school">
            Please enter your school name
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <!-- More School Info -->
        <b-form-row>
        <b-form-group id="input-group-schoolyear" label="School Year*" label-for="input-schoolyear" class="col-md-6">
          <b-form-select
            id="input-schoolyear"
            v-model="form.school_year"
            placeholder="Choose a major"
            :options="school_year_options"
            :state="valid_school_year"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_school_year">
            Please select a year
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-major" label="Primary Major*" label-for="input-major" class="col-md-6">
          <b-form-select
            id="input-major"
            v-model="form.major"
            placeholder="Choose a major"
            :options="major_options"
            :state="valid_major"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_major">
            Please select a major
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <hr>
        <h4>Want to get hired?</h4>
        <p class="info">Let us know, and we'll pass your info on to our partners and sponsors!</p>

        <!-- recruitment info -->
        <b-form-row>
        <b-form-group id="input-group-recruit" label="Do you want to be recruited for jobs?*" label-for="input-recruit" class="col-6">
          <b-form-select
            id="input-recruit"
            v-model="form.recruit"
            placeholder="Choose an option"
            :options="recruit_options"
            :state="valid_recruit"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_recruit">
            Please select an option
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-portfolio" label="GitHub or Portfolio Link" label-for="input-portfolio" class="col-md-6">
          <b-form-input
            id="input-portfolio"
            v-model="form.portfolio"
            autocomplete="input-portfolio"
            placeholder="github.com/yourname"
          ></b-form-input>
        </b-form-group>
        </b-form-row>

        <!-- resume upload -->
        <b-form-row>
        <b-form-group id="input-group-resume" label="Resume (.pdf .doc .docx)" label-for="input-resume" class="col-md-12">
          <b-form-file
            id="input-resume"
            v-model="form.resume"
            name="resume"
            accept=".pdf, .doc, .docx, .txt"
            placeholder="Upload Resume"
            drop-placeholder="Drop file here..."
            :state="valid_resume"
            @input="upload"
          ></b-form-file>
          <b-form-invalid-feedback :state="valid_resume">
            We couldn't upload your resume. Try again later, or check that you entered your name first!
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <!-- Track selection -->
        <hr />
        <h4>Choose a track!</h4>
        <track-selection v-bind:default="'general'" @picked="updateTrack" />


        <!-- Shipping Address -->
        <hr />
        <h4>Want to give us a shipping address?</h4>
        <p class="info">We plan on handing out all swag in-person at the event, but in case we need to ship swag to you instead, this is where we'll send it to. Please note that we can only ship to the USA.</p>
        <b-form-group>
        <b-form-row>
        <b-form-group id="input-group-5" label="Shipping Address" label-for="input-5" class="col-5 col-md-7">
          <b-form-input
            id="input-5"
            v-model="form.address1"
            name="address"
            autocomplete="off"
            placeholder="8125 Paint Branch Drive"
            class="form-input"
            :state="valid_address"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-address-line2"
          label="Shipping Address Line 2"
          label-for="input-address-line2"
          class="col-5 col-md-5"
        >
          <b-form-input
            id="input-address-line2"
            v-model="form.address2"
            name="address-line2"
            autocomplete="address-line2"
            placeholder="Apartment or Unit Number (optional)"
            class="form-input"
            :state="valid_address"
          ></b-form-input>
        </b-form-group>
        </b-form-row>
        <b-form-row>
          <b-form-group id="input-group-city" label="City" label-for="input-city" class="col-8 col-md-5">
            <b-form-input
              id="input-city"
              v-model="form.city"
              name="city"
              autocomplete="off"
              placeholder="College Park"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-state"
            label="State"
            label-for="input-state"
            class="col-4 col-md-2"
          >
            <b-form-input
              id="input-state"
              v-model="form.state"
              name="state"
              autocomplete="off"
              placeholder="MD"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-zip"
            label="Zip Code"
            label-for="input-zip"
            class="col-4 col-md-3"
          >
            <b-form-input
              id="input-zip"
              v-model="form.zip"
              name="zip"
              autocomplete="off"
              placeholder="20740"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-country"
            label="Country"
            label-for="input-country"
            class="col-8 col-md-2"
          >
            <b-form-input
              id="input-country"
              v-model="form.country"
              name="country"
              autocomplete="off"
              placeholder="USA"
              :state="valid_address"
            ></b-form-input>
          </b-form-group>
        </b-form-row>
          <b-form-invalid-feedback :state="valid_address" style="margin: 0">
            Please provide a valid shipping address to apply for the hardware track.
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Bitcamp Campfire Games Survey -->
        <hr />
        <h4>Campfire Games Survey</h4>
        <p class="info">This year, you’ll once again be put into one of three teams based on your personality and interests. By winning unique challenges and attending workshops and mini-events, you and your fellow hackers will rack up points for your team. At the end of the event, members of the winning team will receive limited edition Bitcamp apparel. So what are you waiting for? Take the survey and find your team!
</p>
        <b-form-group class="font-weight-bold" label="How willing are you to do Karaoke?">
          <b-form-radio-group
            class="font-weight-normal pt-2"
            id="survey-1"
            v-model="form.selected_survey_1"
            :state=valid_survey_1
          >
            <b-form-radio value="r">I'm up on the stage!</b-form-radio>
            <b-form-radio value="g">Takes some convincing</b-form-radio>
            <b-form-radio value="b">Never in my life</b-form-radio>
            <b-form-radio value="g1">Karaoke? What's that?</b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_1">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold"  label="Would you rather go to:">
          <b-form-radio-group
            class="font-weight-normal pt-2"
            id="survey-2"
            v-model="form.selected_survey_2"
            :state=valid_survey_2
          >
            <b-form-radio value="b">Broadway Show</b-form-radio>
            <b-form-radio value="g">Concert</b-form-radio>
            <b-form-radio value="r">Mosh Pit</b-form-radio>
            <b-form-radio value="b1">I'll stay in for the night</b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_2">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold"  label="When do you get to class?">
          <b-form-radio-group
            class="font-weight-normal pt-2"
            id="survey-3"
            v-model="form.selected_survey_3"
            :state=valid_survey_3
          >
            <b-form-radio value="g">10 minutes early</b-form-radio>
            <b-form-radio value="b">Right on time</b-form-radio>
            <b-form-radio value="r">5 minutes late</b-form-radio>
            <b-form-radio value="r1">Wait, I had class today?</b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_3">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="Your pizza order is:">
          <b-form-radio-group
            class="font-weight-normal pt-2"
            id="survey-4"
            v-model="form.selected_survey_4"
            :state=valid_survey_4
          >
            <b-form-radio value="b">Classic cheese</b-form-radio>
            <b-form-radio value="r">ALL THE TOPPINGS</b-form-radio>
            <b-form-radio value="g">Different every time</b-form-radio>
            <b-form-radio value="r1">Pineapple. Pizza.</b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_4">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="What's your favorite thing about hackathons?">
          <b-form-radio-group
            class="font-weight-normal pt-2"
            id="survey-5"
            v-model="form.selected_survey_5"
            :state=valid_survey_5
          >
            <b-form-radio value="r">Hacking</b-form-radio>
            <b-form-radio value="g">Free stuff</b-form-radio>
            <b-form-radio value="b">Workshops </b-form-radio>
            <b-form-radio value="g1">First hackathon, I’ll find out!</b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_5">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>

        <hr />
        <!-- T-Shirt Size -->
        <h4 class="mb-2">Select a T-shirt size!</h4>
        <p class="info">We've got unisex T-shirts in XS-XL sizes! Choose whichever size you like, and your very own Bitcamp 2022
          shirt will be given to you once you arrive at UMD.</p>

        <b-form-row>
        <b-form-group id="input-group-tshirt" label="T-shirt Size*" label-for="input-tshirt" class="col-md-12">
          <b-form-select
            id="input-4"
            v-model="form.tshirt_size"
            placeholder="Choose a T-shirt size"
            :options="tshirt_size_options"
            :state="valid_tshirt_size"
          ></b-form-select>
          <b-form-invalid-feedback :state="valid_tshirt_size">
            Please select a T-shirt size.
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <hr />
         <!-- Short Questions -->
        <h4 class="mb-2">Why Bitcamp?</h4>
        <p class="info">We'd like to get to know you a little better! Help us learn more about you and make Bitcamp even more amazing by answering some questions!</p>


        <b-form-row>
        <b-form-group id="input-group-hackcount" label="How many hackathons have you participated in before?*" label-for="input-hackcount" class="col-md-12">
          <b-form-input
            id="input-hackcount"
            v-model="form.hack_count"
            name="input-hackcount"
            autocomplete="off"
            placeholder="Number of Hackathons here..."
            class="form-input"
            :state="valid_hackcount"
            type="number"
          ></b-form-input>
          <b-form-invalid-feedback :state="valid_hackcount">
            Please enter a number
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="input-group-question1" label="Why are you interested in attending Bitcamp?*" label-for="input-question1" class="font-weight-bold col-md-12">
          <b-form-textarea
            id="input-question1"
            v-model="form.question1"
            name="question1"
            autocomplete="off"
            placeholder="Your response here..."
            rows=3
            max-rows=3
            :state="valid_question1"
          ></b-form-textarea>
          <b-form-invalid-feedback :state="valid_question1">
            Oops! You forgot to fill out this question
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <b-form-row>
        <b-form-group id="input-group-question2" label="What do you plan on doing or building at Bitcamp?*" label-for="input-question2" class="font-weight-bold col-md-12">
          <b-form-textarea
            id="input-question2"
            v-model="form.question2"
            name="question2"
            autocomplete="off"
            placeholder="Your response here..."
            rows=3
            max-rows=3
            :state="valid_question2"
          ></b-form-textarea>
          <b-form-invalid-feedback :state="valid_question2">
            Oops! You forgot to fill out this question
          </b-form-invalid-feedback>
        </b-form-group>
        </b-form-row>

        <hr />
        <!-- MLH Stuff -->
        <h4 class="mb-2">Rules and privacy policies</h4>

        <b-form-checkbox
          id="checkbox-2"
          v-model="form.MLH_privacy"
          name="checkbox-2"
          class="checkbox"
          :state="valid_mlh_privacy"
        >
          I authorize you to share my application/registration information with Major League Hacking
          for event administration, ranking, and MLH administration in-line with the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>. I further agree
          to the terms of both the
          <a
            href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
            target="_blank"
            >MLH Contest Terms and Conditions</a
          >
          and the <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>.*
          <b-form-invalid-feedback :state="valid_mlh_privacy">
            Please agree to MLH's privacy policy and terms
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-3"
          v-model="form.MLH_conduct"
          name="checkbox-3"
          :state="valid_code_of_conduct"
          class="checkbox"
          style="padding-bottom: 1rem"
        >
          I have read and agree to the
          <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank"
            >MLH Code of Conduct</a
          >.*
          <b-form-invalid-feedback :state="valid_code_of_conduct">
            Please agree to MLH's code of conduct
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-1"
          v-model="form.MLH_emails"
          name="checkbox-1"
          class="checkbox"
        >
          I authorize MLH to send me pre- and post-event informational emails, which contain free
          credit and opportunities from their partners.
        </b-form-checkbox>

      <!-- Submit -->
      <div>
      <b-button type="submit" class="submit-btn m1 mx-auto" style="center" :disabled="isSending">
         <h5 class="m-1">Confirm Registration for Bitcamp!</h5>
      </b-button>
      </div>
      </b-form>
    </b-col>
    <b-col md="1"></b-col>
  </b-row>
</template>

<script>
import generalMixin from "../mixins/general";
import { v4 as uuid } from "uuid";
import Vue from "vue";
import { FormRadioPlugin, IconsPlugin, FormFilePlugin, BFormTextarea } from "bootstrap-vue";
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import TrackSelection from "./TrackSelection.vue";
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf.js';
import 'pdfjs-dist/build/pdf.worker.entry';
import * as majors_list from '../assets/college-majors.json';
import * as univ_list from '../assets/global-universities-list.json';
import * as EmailValidator from "email-validator"
import parsePhoneNumber from "libphonenumber-js"


Vue.use(FormRadioPlugin);
Vue.use(IconsPlugin);
Vue.use(FormFilePlugin)
Vue.component('b-form-textarea', BFormTextarea)
Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

let university_list = univ_list["list"].map(univ => univ["name"]);

let major_map = majors_list["rows"].map((major) => {
  return {
    value: major[2].toLowerCase(),
    text: major[2].toLowerCase().split(' ').map((word) => word === "and" ? word : word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  };
});

major_map.sort((major1, major2) => {
  return major1["value"] < major2["value"] ? -1 : (major1["value"] > major2["value"] ? 1 : 0) ;
});

const DEFAULT_COUNTRY_PHONE = 'US'

export default {
  name: "RegistrationForm",
  mixins: [generalMixin],
  components: { TrackSelection },

  data() {
    return {
      form: {
        email: (this.$route.query.redo != null)? this.$route.query.redo : "",
        phone: "",
        MLH_emails: false,
        MLH_conduct: false,
        MLH_privacy: false,
        underrepresented_Gender: false,
        name: "",
        pronouns: "",
        gender: "",
        ethnicity: "",
        major: "",
        recruit: "",
        portfolio: "",
        school_year: "",
        school_type: "",
        school: "",
        resume: "",
        resume_link: "",
        resume_id:"",
        birthday: "",
        address: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        tshirt_size: "",
        hack_count: "",
        question1: "",
        question2: "",
        gmaps_place_id: "",
        referred_by: "",
        track_selected: "general"
      },

      isSending: false,
      random_id: uuid(),
      form_start: Date.now(),
      valid_name: null,
      valid_pronouns: null,
      valid_email: null,
      valid_phone: null,
      valid_resume: null,
      valid_school_type: null,
      valid_school_year: null,
      valid_school: null,
      valid_gender: null,
      valid_ethnicity: null,
      valid_major: null,
      valid_recruit: null,
      valid_portfolio: null,
      valid_birthday: null,
      valid_code_of_conduct: null,
      valid_mlh_privacy: null,
      valid_track_selected: null,
      valid_address: null,
      valid_tshirt_size: null,
      valid_underrepresented_Gender: null,
      valid_hackcount: null,
      valid_survey_1: null,
      valid_survey_2: null,
      valid_survey_3: null,
      valid_survey_4: null,
      valid_survey_5: null,
      valid_question1: null,
      valid_question2: null,

      school_class: "typeahead",

      school_type_options: [
        { value: "", text: "Select one...", disabled: true },
        { value: "high school", text: "High School" },
        { value: "undergrad", text: "Undergraduate / Bachelors" },
        { value: "graduate", text: "Graduate School / Masters" },
        { value: "phd", text: "PhD / Doctorate" },
        { value: "graduated", text: "Graduated" },
        { value: "other", text: "Other" }
      ],

      school_year_options: [
        { value: "", text: "Select one...", disabled: true },
        { value: "high school", text: "High School" },
        { value: "freshman", text: "Freshman (1st year)" },
        { value: "sophomore", text: "Sophomore (2nd year)" },
        { value: "junior", text: "Junior (3rd year)" },
        { value: "senior", text: "Senior (4th year and above)" },
        { value: "graduated", text: "College Graduate" },
        { value: "other", text: "Other" }
      ],

      gender_options: [
        { value: "", text: "Select one...", disabled: true },
        { value: "female", text: "Female" },
        { value: "male", text: "Male" },
        { value: "nonbinary", text: "Nonbinary" },
        { value: "prefer not to answer", text: "Prefer not to answer" },
        { value: "other", text: "Other" }
      ],

      ethnicity_options: [
        { value: "", text: "Select one...", disabled: true },
        { value: "asian or pacific islander", text: "Asian or Pacific-Islander" },
        { value: "black or african-american", text: "Black or African-American" },
        { value: "caucasian", text: "Caucasian" },
        { value: "hispanic", text: "Hispanic" },
        { value: "native american", text: "Native American" },
        { value: "prefer not to answer", text: "Prefer not to answer" },
        { value: "other", text: "Other" }
      ],

      tshirt_size_options: [
        { value: "", text: "Select one...", disabled: true },
        //{ value: "no tshirt", text: "I don't want a T-shirt" },
        { value: "xs", text: "XS" },
        { value: "s", text: "S" },
        { value: "m", text: "M" },
        { value: "l", text: "L" },
        { value: "xl", text: "XL" }
      ],

      major_options: [
        { value: "", text: "Select one...", disabled: true},
        { value: "no major", text: "No Major" },
        ...major_map,
      ],

      recruit_options: [
        { value: "", text: "Select one...", disabled: true},
        { value: "yes fte", text: "Yes, for an internship" },
        { value: "yes intern", text: "Yes, for a full-time position" },
        { value: "yes both", text: "Yes, for an internship or full-time position" },
        { value: "no", text: "No" },
      ],

      university_options: [
        ...university_list
      ]
    };
  },

  mounted() {
    // log registration in google analytics
    this.$gtag.event("open-registration", { method: "Google" });
    this.track({
      random_id: this.random_id,
      key: "open-registration",
      value: true
    });
    this.sendAnalyticsEvent('registration_page_visit');
    document.addEventListener("DOMContentLoaded", () => {
      const input = document.getElementById("input-5");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["address"]
      });

      google.maps.event.addListener(autocomplete, "place_changed", () => {
        let place = autocomplete.getPlace();

        //updates v-model value
        this.form.gmaps_place_id = place.place_id;
        this.form.address = place.formatted_address;
        this.fillInAddress(place);
      });

      google.maps.event.addDomListener(input, "keydown", function(event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          this.form.gmaps_place_id = place.place_id;
        }
      });

      document.getElementsByClassName("typeahead")[0].setAttribute("autocomplete", "off");

      // document.getElementsByClassName("pac-container")[0].setAttribute("data-tap-disabled", "true");
    });
  },

  methods: {
    updateTrack (value) {
      this.form.track_selected = value;
    },
    fillInAddress(place) {
      let address1 = "";
      let postcode = "";

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      // place.address_components are google.maps.GeocoderAddressComponent objects
      // which are documented at http://goo.gle/3l5i5Mr
      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            address1 = `${component.long_name} ${address1}`;
            break;
          }

          case "route": {
            address1 += component.short_name;
            break;
          }

          case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
          }

          case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            break;
          }
          case "locality":
            this.form.city = document.getElementById("input-city").value = component.long_name;
            break;

          case "administrative_area_level_1": {
            this.form.state = document.getElementById("input-state").value = component.short_name;
            break;
          }
          case "country":
            this.form.country = document.getElementById("input-country").value =
              component.short_name;
            break;
        }
      }
      this.form.address1 = document.getElementById("input-5").value = address1;
      this.form.zip = document.getElementById("input-zip").value = postcode;
      // After filling the form with address components from the Autocomplete
      // prediction, set cursor focus on the second address line to encourage
      // entry of subpremise information such as apartment, unit, or floor number.
      document.getElementById("input-address-line2").focus();
    },
    emailFilledOut() {
      this.track({
        random_id: this.random_id,
        key: "filled-email",
        value: this.form.email
      });
    },
    showErrorToast() {
      this.$bvToast.toast(`Something went wrong. Are you sure you filled everything out?`, {
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: false,
        noCloseButton: true,
        variant: "danger"
      });
    },
    showErrorToastCustom(str) {
      this.$bvToast.toast(str, {
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: false,
        noCloseButton: true,
        variant: "danger"
      });
    },
    async registerUser(event) {
      event.preventDefault();
      if (this.formCheck()) {
        // time taken to fill out form in seconds
        this.form.time_taken = (Date.now() - this.form_start) / 1000;
        let phoneNumber = parsePhoneNumber(this.form.phone, DEFAULT_COUNTRY_PHONE)
        this.form.phone = phoneNumber.number

        this.isSending = true; // block double submits

        if (this.$route.params.referral) {
          this.$gtag.event("got-referred", { method: "Google" });
          this.form.referred_by = this.$route.params.referral;
          this.track({
            random_id: this.random_id,
            key: "got-referred",
            value: this.$route.params.referral
          });
        }

        this.$gtag.event("submit-registration", { method: "Google" });
        this.$gtag.time({
          name: "completion-time",
          value: this.form.time_taken,
          event_category: "Form completion duration"
        });
        this.track({
          random_id: this.random_id,
          key: "form-submitted",
          value: this.form.time_taken
        });

        const d = new Date()
        this.form.secret = (d.getHours() * d.getDay() * 15).toString() + d.getFullYear().toString().split("").reverse().join("")

        let survey_count = {"r":0, "b":0, "g":0}

        survey_count[this.form.selected_survey_1[0]] += 1
        survey_count[this.form.selected_survey_2[0]] += 1
        survey_count[this.form.selected_survey_3[0]] += 1
        survey_count[this.form.selected_survey_4[0]] += 1
        survey_count[this.form.selected_survey_5[0]] += 1

        this.form.red = survey_count["r"]
        this.form.green = survey_count["g"]
        this.form.blue = survey_count["b"]

        const resp = await this.performPostRequest(
          this.getEnvVariable("BACKEND_ENDPOINT"),
          "register",
          this.form
        );

        this.isSending = false; // done submitting

        if (resp && resp.referral_id) {
          this.$router.push({ path: "thanks", query: { r: resp.referral_id } });
          this.track({
            random_id: this.random_id,
            key: "referral_id",
            value: resp.referral_id
          });
        } else {
          this.showErrorToast();
        }
      }
    },
    // logic goes here so feedback is only shown after submission
    formCheck() {
      let valid_form = true;
      if (this.form.name.length === 0) {
        this.valid_name = false;
        valid_form = false;
      } else this.valid_name = null;

      if (!EmailValidator.validate(this.form.email)) {
        this.valid_email = false;
        valid_form = false;
      } else this.valid_email = null;

      let phoneNumber = parsePhoneNumber(this.form.phone, DEFAULT_COUNTRY_PHONE)
      if (!phoneNumber || !phoneNumber.isValid()) {
        this.valid_phone = false;
        valid_form = false;
      } else this.valid_phone = null;

      if (this.form.school_type.length === 0) {
        this.valid_school_type = false;
        valid_form = false;
      } else this.valid_school_type = null;

      if (this.form.gender.length === 0) {
        this.valid_gender = false;
        valid_form = false;
      } else this.valid_gender = null;

      if (this.form.ethnicity.length === 0) {
        this.valid_ethnicity = false;
        valid_form = false;
      } else this.valid_ethnicity = null;

      if (this.form.major.length === 0) {
        this.valid_major = false;
        valid_form = false;
      } else this.valid_major = null;

      if (this.form.recruit.length === 0) {
        this.valid_recruit = false;
        valid_form = false;
      } else this.valid_recruit = null;

      if (this.form.school_year.length === 0) {
        this.valid_school_year = false;
        valid_form = false;
      } else this.valid_school_year = null;

      if (this.form.school.length === 0) {
        this.valid_school = false;
        this.school_class = "typeahead is-invalid";
        valid_form = false;
      } else {
        this.school_class = "typeahead";
        this.valid_school = null;
      }

      if (this.form.tshirt_size.length === 0) {
        this.valid_tshirt_size = false;
        valid_form = false;
      } else this.valid_tshirt_size = null;

      if (this.form.birthday.length === 0) {
        this.valid_birthday = false;
        valid_form = false;
      } else this.valid_birthday = null;

      if (this.form.hack_count.length === 0) {
        this.valid_hackcount = false;
        valid_form = false;
      } else this.valid_hackcount = null;

      if (this.form.question1.length === 0) {
        this.valid_question1 = false;
        valid_form = false;
      } else this.valid_question1 = null;

      if (this.form.question2.length === 0) {
        this.valid_question2 = false;
        valid_form = false;
      } else this.valid_question2 = null;

      if (!this.form.MLH_conduct) {
        this.valid_code_of_conduct = false;
        valid_form = false;
      } else this.valid_code_of_conduct = null;

      if (!this.form.MLH_privacy) {
        this.valid_mlh_privacy = false;
        valid_form = false;
      } else this.valid_mlh_privacy = null;

      if (this.form.track_selected.length === 0) {
        this.valid_track_selected = false;
        valid_form = false;
      } else this.valid_track_selected = null;

      if (this.form.track_selected === "hardware"
       && this.form.address1.length === 0
       && this.form.address2.length === 0
       && this.form.city.length === 0
       && this.form.state.length === 0
       && this.form.zip.length === 0
       && this.form.country.length === 0) {
        this.valid_address = false;
        valid_form = false;
      } else this.valid_address = null;

      if (!this.form.selected_survey_1
        ) {
        this.valid_survey_1 = false;
        valid_form = false;
      } else this.valid_survey_1 = null;
      if (!this.form.selected_survey_2
        ) {
        this.valid_survey_2 = false;
        valid_form = false;
      } else this.valid_survey_2 = null;
      if (!this.form.selected_survey_3
        ) {
        this.valid_survey_3 = false;
        valid_form = false;
      } else this.valid_survey_3 = null;
      if (!this.form.selected_survey_4
        ) {
        this.valid_survey_4 = false;
        valid_form = false;
      } else this.valid_survey_4 = null;
      if (!this.form.selected_survey_5
        ) {
        this.valid_survey_5 = false;
        valid_form = false;
      } else this.valid_survey_5 = null;

      return valid_form;
    },
    async upload(file) {
      if (this.form.name.length == 0)
      {
        this.showErrorToastCustom('Oops! Put in your name first so our marshies make sure your file is in the right place!');
        this.valid_resume = false;
        return;
      }

      this.valid_resume = null;

      var cleanname = this.form.name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase().replace(/_{2,}/g, '_').substring(0,48) + "." + this.form.resume.name.slice(-3);

      const userParams = {
        id: this.random_id,
        filename: cleanname,
        filetype: this.form.resume.name.slice(-3),
      };

      let r = await this.performPostRequest(
        this.getEnvVariable('BACKEND_ENDPOINT'),
        'upload_resume',
        userParams,
      );

      if (!(r && r.putUrl))
      {
        this.showErrorToastCustom('Oops! We couldn\'t upload your resume, try again later!');
        this.valid_resume = false;
        return;
      }
      
      var cleanFile = new File([file], cleanname, {
        type: file.type,
        lastModified: file.lastModified,
      });

      let r2 = await this.performRawPostRequest(r.putUrl, cleanFile);
      this.form.resume_link = r.uploadUrl;
      this.form.resume_id = this.random_id;

      if (!(r2 && (r2.status == 200)))
      {
        this.showErrorToastCustom('Oops! We couldn\'t upload your resume, try again later!');
        this.valid_resume = false;
        return;
      }

      // below is for resume parsing
      let text = '';
      const pdfVersion = '2.10.377';
      // eslint-disable-next-line no-import-assign
      PDFJS.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;

      const loadingTask = PDFJS.getDocument(this.form.resume_link);
      await loadingTask.promise.then((doc) => {
        const { numPages } = doc;

        let lastPromise;
        lastPromise = doc.getMetadata();

        const loadPage = async (pageNum) => {
          const page = await doc.getPage(pageNum);

          return page.getTextContent().then((content) => {
            // we only want the page text (strings)
            const strings = content.items.map((item) => item.str);
            text += strings.join(' ');
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
        'upload_text_resume',
        resumeParams,
      );


    },
  }
};
</script>

<style>

.input-group > .typeahead {
  border-color: var(--bark);
  border-radius: 0.6rem;
}

.typeahead:focus,
.typeahead:active {
  border-color: var(--mango-orange) !important;
  outline: 0 !important;
  box-shadow: 0 0 0 0.15rem var(--light-orange) !important;
}

</style>

<style scoped>

h4 {
  margin-top: 1.25rem;
  margin-bottom: 0.25rem;
}

p {
  text-align: left;
}

.info {
  font-size: 1rem;
  text-align: left !important;
  margin-bottom: 1.25rem;
}

.row {
  overflow: hidden;
}

hr {
  position: relative;
  left: -50%;
  width: 200%;
  border-width: 0.125rem;
}

.registration-form {
  text-align: left;
}

.form-control:focus,
.form-control:active,
.custom-select:focus,
.custom-select:active {
  border-color: var(--mango-orange) !important;
  outline: 0 !important;
  box-shadow: 0 0 0 0.15rem var(--light-orange) !important;
}

.form-control,
.custom-select {
  border-color: var(--bark);
  border-radius: 0.6rem;
}

.btn-purple {
  background-color: #ed648d;
  color: var(--white);
  border-radius: 0.6rem;
  border-color: #dd5e84;
  align-self: center;
}

.btn-purple:hover {
  color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 16px 0px #ed648d;
}

.checkbox {
  padding-bottom: 1rem;
}

.submit-btn {
   width: 100%;
   height: 72px;

   text-align:center;
   margin:auto;

   background: radial-gradient(92.62% 25% at 33.31% 0%, #FFAA6C 0.01%, #FF6A37 50.52%, #FF6A37 100%);
   box-shadow: 0px 10px 30px rgba(176, 148, 132, 0.33);
   border-radius: 6px;
}


@media (min-width: 992px) {
  .submit-btn {
    display: block;
    margin: 0 auto;
  }
}

.submit-btn:disabled {
  animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}

</style>
