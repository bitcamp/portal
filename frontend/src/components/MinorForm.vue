<!-- eslint-disable no-undef -->
<template>
    <b-row>
        <b-col md="1" />
        <b-col md="10">
            <br>
            <h1 style="text-align: left">
                Register for Bitcamp 2025 - Minor
            </h1>

            
            <hr>
            <b-form class="registration-form" autocomplete="on" @submit="registerUser">
                <h4><u>Photography Consent Form</u></h4>
                <br>
                <p class="info">
                    I, __________________________________________, hereby give permission to the University of Maryland to use and reproduce my image, likeness, voice, and name (collectively, “Image”) and to authorize others to use my Image in any manner the University elects in any and all media now known or hereafter discovered or developed, in perpetuity, throughout the universe including but not limited to reproducing my Image in print publications, web sites, and audio visual broadcasts. I understand and agree that the University will own all rights in my Image, including all rights under copyright. 
I expressly waive any right I might have of prior approval over how and where my Image is used and compensation and all rights of privacy and rights accruing under the Family Educational Rights and Privacy Act and the University of Maryland policy that implements that Act. I forever release and discharge the State of Maryland, the University of Maryland, and their respective officers, employees, agents and other persons acting within the scope of their authority from any and all claims or causes of action, now known or later discovered, relating to or arising out of use of my Image, including by not limited to claims for invasion of privacy or misappropriation, right of publicity and defamation arising out of the use and exploitation of my Image. 
I represent that I am between the ages of 10 and 18 years, and that I have read this permission, am fully familiar with its contents and meaning, and have been given the opportunity to consult counsel of my choosing prior to signing this Permission and Release. As a Minor, the signature below is that of a parent or legal guardian authorized to sign on my behalf. 


                </p>

                <!-- Name and Age -->
                <b-form-row>
                    <!-- First Name -->
                    <b-form-group id="input-group-full-name" label="Minor Full Name*" label-for="input-first-name"
                        class="col-6 col-md-6">
                        <b-form-input id="input-first-name" v-model="form.first_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_first_name" style="width: 735px;"/>
                        <b-form-invalid-feedback :state="valid_first_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>

                    
                </b-form-row>

                <!-- Date & Signature -->
                <b-form-row>
                    <!-- Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.first_name" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.last_name" name="signaure" autocomplete="signaure"
                            placeholder="Full Name" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_signature">
                            Please enter your signature
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>


                <br>
                <br>

                <b-form-row>
                    <!-- Parent Full Name -->
                    <b-form-group id="input-group-full-name" label="Parent/Guardian Full Name*" label-for="input-first-name"
                        class="col-6 col-md-6">
                        <b-form-input id="input-first-name" v-model="form.first_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_first_name" style="width: 735px;" />
                        <b-form-invalid-feedback :state="valid_first_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                   
                <!-- Date & Signature -->
                <b-form-row>
                    <!-- Parent Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.first_name" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Parent Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.last_name" name="signaure" autocomplete="signature"
                            placeholder="Full Name" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_signature">
                            Please enter your signature
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>



                <br>


                 <b-form class="registration-form" autocomplete="on" @submit="registerUser">
                <h4><u>Chaperone Agreement Form</u></h4>
                <br>

                <div class="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
                <h5 class="text-xl font-semibold mb-4">Checklist for Minor Supervision</h5>
                
                <div v-for="(item, index) in checklistItems" :key="index" class="flex items-center mb-2">
                    <input type="checkbox" v-model="item.checked" class="mr-2 w-5 h-5">
                    <span :class="{ 'line-through text-gray-500': item.checked }">{{ item.text }}</span>
                </div>
                
            </div>

            <div>
            <br>
            <h5>Chaperone Responsibilities</h5>
            <ul>
            <li v-for="(responsibility, index) in responsibilities" :key="index">
                {{ responsibility }}
            </li>
            </ul>
        </div>
        <br>

        <!-- Date & Signature -->
        <b-form-row>

             <!-- Name and Age -->
             <b-form-row>
                    <!-- First Name -->
                    <b-form-group id="input-group-full-name" label="Minor Full Name*" label-for="input-first-name"
                        class="col-6 col-md-6">
                        <b-form-input id="input-first-name" v-model="form.first_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_first_name" style="width: 735px;"/>
                        <b-form-invalid-feedback :state="valid_first_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>

                    
                </b-form-row>
                    <!-- Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.first_name" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.last_name" name="signaure" autocomplete="signaure"
                            placeholder="Full Name" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_signature">
                            Please enter your signature
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>


                <br>
                <br>

                <b-form-row>
                    <!-- Parent Full Name -->
                    <b-form-group id="input-group-full-name" label="Chaperone Full Name*" label-for="input-first-name"
                        class="col-6 col-md-6">
                        <b-form-input id="input-first-name" v-model="form.first_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_first_name" style="width: 735px;" />
                        <b-form-invalid-feedback :state="valid_first_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                   
                <!-- Date & Signature -->
                <b-form-row>
                    <!-- Parent Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.first_name" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Parent Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.last_name" name="signaure" autocomplete="signature"
                            placeholder="Full Name" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_signature">
                            Please enter your signature
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                
               </b-form>


               
















       


                

            <!-- Submit -->
        <div>
          <b-button
            type="submit"
            class="submit-btn m1 mx-auto"
            style="center"
            :disabled="isSending"
          >
            <h5 class="m-1">Submit Minor Forms</h5>
          </b-button>
        </div>

            </b-form>
        </b-col>
    </b-row>
</template>
  
<script>
import generalMixin from "../mixins/general";
import { v4 as uuid } from "uuid";
import Vue from "vue";
import {
    BFormTextarea,
    FormFilePlugin,
    FormRadioPlugin,
    IconsPlugin,
} from "bootstrap-vue";
import VueBootstrapAutocomplete from '@vue-bootstrap-components/vue-bootstrap-autocomplete';
import * as PDFJS from "pdfjs-dist/legacy/build/pdf.js";
import "pdfjs-dist/build/pdf.worker.entry";
import * as majors_list from "../assets/college-majors.json";
import * as univ_list from '../assets/university-list.json';
import * as country_codes from "../assets/country-codes.json";
import * as EmailValidator from "email-validator";
import parsePhoneNumber from "libphonenumber-js";

Vue.use(FormRadioPlugin);
Vue.use(IconsPlugin);
Vue.use(FormFilePlugin);
Vue.component("BFormTextarea", BFormTextarea);
Vue.component("VueBootstrapAutocomplete", VueBootstrapAutocomplete);

const university_list = univ_list.default

const country_list = country_codes.default.map((country) => country["name"]);

const major_map = majors_list["rows"].map((major) => {
    return {
        value: major[2].toLowerCase(),
        text: major[2]
            .toLowerCase()
            .split(" ")
            .map((word) =>
                word === "and" ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" "),
    };
});

major_map.sort((major1, major2) => {
    return major1["value"] < major2["value"]
        ? -1
        : major1["value"] > major2["value"]
            ? 1
            : 0;
});

const DEFAULT_COUNTRY_PHONE = "US";

export default {
    name: "RegistrationForm",
    components: {},
    mixins: [generalMixin],

    data() {
        return {
            form: {
                email: this.$route.query.redo != null ? this.$route.query.redo : "",
                phone: "",
                MLH_emails: false,
                MLH_conduct: false,
                MLH_privacy: false,
                name: "",
                first_name: "",
                last_name: "",
                skill: "",
                major: "",
                company: "",
                school_year: "",
                school: "",
                school_other: "",
                tshirt_size: "",
                prev_mentor_experience: "",
                prev_track_experience: "",
                mentor_tracks: "",
                dietary_restrictions: "",
                languages: "",
            },

            isSending: false,
            random_id: uuid(),
            form_start: Date.now(),
            valid_first_name: null,
            valid_last_name: null,
            valid_signature:null,
            valid_date:null,
            valid_company: null,
            valid_email: null,
            valid_phone: null,
            valid_school_year: null,
            valid_school: null,
            valid_school_other: null,
            valid_skill: null,
            valid_major: null,
            valid_code_of_conduct: null,
            valid_mlh_privacy: null,
            valid_school_or_company: null,
            valid_tshirt_size: null,
            valid_prev_mentor_experience: null,
            valid_prev_track_experience: null,
            valid_mentor_tracks: null,
            valid_diet: null,
            valid_languages: null,

            responsibilities: [
        "Responsible for their minor(s) for the entire time they are on the University of Maryland, College Park campus, including inside the Armory.",
        "Required to be aware of their student’s location within the Armory at all times.",
        "Required to ensure that their students remain inside the Armory at all times unless accompanied by their chaperone(s).",
        "Responsible for their student(s) behavior and are required to ensure that their student(s) adhere to Bitcamp’s Terms and Code of Conduct.",
        "Required to remain in the Armory as long as their student(s) are there.",
        "Responsible for ensuring that their student(s) do not remain in the Armory after 12am (midnight) and do not arrive before 7am.",
        "Required to alert organizers, police, EMT, or fire marshal in case of an emergency.",
        "Responsible for knowing their student(s) food allergies and medical conditions, as well as ensuring that their health needs are being met."
      ],

            school_class: "typeahead",

            school_year_options: [
                { value: "", text: "Select one...", disabled: true },
                { value: "undergrad 2 year", text: "Undergraduate University (2 year - community college or similar)" },
                { value: "undergrad 3+ year", text: "Undergraduate University (3+ year) - Sophomore" },
                { value: "undergrad 3+ year", text: "Undergraduate University (3+ year) - Junior" },
                { value: "undergrad 3+ year", text: "Undergraduate University (3+ year) - Senior" },
                { value: "grad", text: "Graduate University (Masters, Professional, Doctoral, etc)" },
                { value: "bootcamp", text: "Code School / Bootcamp" },
                { value: "vocational", text: "Other Vocational / Trade Program or Apprenticeship" },
                { value: "postdoc", text: "Post Doctorate" },
                { value: "other", text: "Other" },
                { value: "prefer not to answer", text: "Prefer not to answer" },
            ],

            checklistItems: [
        { text: "A Teacher from the minor’s school that has a background check (one teacher for every 15 minors)", checked: false },
        { text: "Family member that is 18+", checked: false },
        { text: "Adult that is approved by minor’s parent/guardian (adult can take one minor in addition to their own child/sibling)", checked: false }
      ],

            school_other_selected: false,

            skill_select: [],
            skill_other: false,
            skill_other_text: "",
            skill_prefer_no_answer: false,
            skill_options: [
                { value: "web-development", text: "Web Development" },
                { value: "mobile-application-development", text: "Mobile Application Development" },
                { value: "game-development", text: "Game Development" },
                { value: "machine-learning", text: "Machine Learning" },
                { value: "quantum-computing", text: "Quantum Computing" },
                { value: "cybersecurity", text: "Cybersecurity" },
                { value: "user-interface-design", text: "User Interface Design" },
                { value: "hardware", text: "Hardware" },
            ],

            languages_select: [],
            languages_other: false,
            languages_other_text: "",
            languages_prefer_no_answer: false,
            languages_options: [
                { value: "javascript", text: "JavaScript" },
                { value: "typescript", text: "Typescript" },
                { value: "html", text: "HTML" },
                { value: "css", text: "CSS" },
                { value: "bootstrap", text: "Bootstrap" },
                { value: "react", text: "React" },
                { value: "react-native", text: "React Native" },
                { value: "angular", text: "Angular" },
                { value: "express", text: "Express" },
                { value: "node", text: "Node" },
                { value: "python", text: "Python" },
                { value: "java", text: "Java" },
                { value: "sql", text: "SQL" },
                { value: "nosql", text: "NoSQL" },
                { value: "c#", text: "C#" },
                { value: "rust", text: "Rust" },
                { value: "servo", text: "Servo" },
                { value: "perl", text: "Perl" },
                { value: "go", text: "Go" },
                { value: "flask", text: "Flask" },
                { value: "git", text: "Git/Github" },
                { value: "arduino", text: "Arduino" },
                { value: "c++", text: "C++" },
                { value: "opencv", text: "OpenCV" },
                { value: "google-cloud", text: "Google Cloud" },
                { value: "flutter", text: "Flutter" },
                { value: "amazon-web-services", text: "Amazon Web Services" },
            ],

            tshirt_size_options: [
                { value: "", text: "Select one...", disabled: true },
                //{ value: "no tshirt", text: "I don't want a T-shirt" },
                { value: "xs", text: "XS" },
                { value: "s", text: "S" },
                { value: "m", text: "M" },
                { value: "l", text: "L" },
                { value: "xl", text: "XL" },
                { value: "2xl", text: "2XL" },
            ],

            university_options: [...university_list],

            mentor_tracks_select: [],
            mentor_tracks_other: false,
            mentor_tracks_other_text: "",
            mentor_tracks_options: [
                { value: "app_dev", text: "App Dev" },
                { value: "cybersecurity", text: "Cybersecurity" },
                { value: "quantum", text: "Quantum Technology (familiarity with Qiskit, or a comparable quantum language is expected)" },
                { value: "machine_learning", text: "Machine Learning" },
            ],

            diet_select: [],
            diet_other: false,
            diet_other_text: "",
            diet_none: false,
            diet_options: [
                { text: "Vegan", value: "vegan" },
                { text: "Vegetarian", value: "vegetarian" },
                { text: "Gluten Free", value: "gluten-free" },
                { text: "Dairy Free", value: "dairy-free" },
                { text: "Nut Allergy", value: "nut-allergy" },
                { text: "Kosher", value: "kosher" },
                { text: "Halal", value: "halal" },
            ]
        };
    },

    methods: {
        emailFilledOut() {
            this.track({
                random_id: this.random_id,
                key: "filled-email",
                value: this.form.email,
            });
        },
        showErrorToast() {
            this.$bvToast.toast(
                `Something went wrong. Are you sure you filled everything out?`,
                {
                    toaster: "b-toaster-top-center",
                    solid: true,
                    appendToast: false,
                    noCloseButton: true,
                    variant: "danger",
                }
            );
        },
        showErrorToastCustom(str) {
            this.$bvToast.toast(str, {
                toaster: "b-toaster-top-center",
                solid: true,
                appendToast: false,
                noCloseButton: true,
                variant: "danger",
            });
        },
        createDietaryRestrictionString() {
            let diet_string = this.diet_select.join(",");

            if (this.diet_none) {
                return "none";
            }
            if (this.diet_other && this.diet_other_text != "") {
                if (diet_string != "") {
                    diet_string += ","
                }
                diet_string = diet_string + "other(" + this.diet_other_text + ")";
            }

            return diet_string;
        },
        createSkillString() {
            let skill_string = this.skill_select.join(",");

            if (this.skill_prefer_no_answer) {
                return "prefer-not-to-answer";
            }
            if (this.skill_other && this.skill_other_text != "") {
                if (skill_string != "") {
                    skill_string += ","
                }
                skill_string = skill_string + "other(" + this.skill_other_text + ")";
            }

            return skill_string;
        },
        createLanguagesString() {
            let languages_string = this.languages_select.join(",");

            if (this.languages_prefer_no_answer) {
                return "prefer-not-to-answer";
            }
            if (this.languages_other && this.languages_other_text != "") {
                if (languages_string != "") {
                    languages_string += ","
                }
                languages_string = languages_string + "other(" + this.languages_other_text + ")";
            }

            return languages_string;
        },
        createMentorTracksString() {
            let mentor_tracks_string = this.mentor_tracks_select.join(",");

            if (this.mentor_tracks_other && this.mentor_tracks_other_text != "") {
                if (mentor_tracks_string != "") {
                    mentor_tracks_string += ","
                }
                mentor_tracks_string = mentor_tracks_string + "other(" + this.mentor_tracks_other_text + ")";
            }

            return mentor_tracks_string;
        },
        uncheckDietaryRestrictions() {
            this.diet_select = [];
            this.diet_other = false;
        },
        async registerUser(event) {
            event.preventDefault();
            if (this.formCheck()) {
                // prevent blacklisted hackers from registering
                if (this.form.name === 'Auran Shereef' || this.form.name === 'Monte James') {
                    this.$router.push({ path: "thanks" });
                    return;
                }

                // time taken to fill out form in seconds
                this.form.time_taken = (Date.now() - this.form_start) / 1000;
                const phoneNumber = parsePhoneNumber(
                    this.form.phone,
                    DEFAULT_COUNTRY_PHONE
                );
                this.form.phone = phoneNumber.number;

                this.isSending = true; // block double submits

                if (this.$route.params.referral) {
                    this.$gtag.event("got-referred", { method: "Google" });
                    this.form.referred_by = this.$route.params.referral;
                    this.track({
                        random_id: this.random_id,
                        key: "got-referred",
                        value: this.$route.params.referral,
                    });
                }

                // Track "mentor tracks" statistics
                for (let mentorTracks of this.mentor_tracks_select) {
                    this.track({
                        random_id: this.random_id,
                        key: `hf-${mentorTracks}`,
                        value: 1,
                    });
                }
                if (this.mentor_tracks_other) {
                    this.track({
                        random_id: this.random_id,
                        key: 'hf-other',
                        value: 1,
                    });
                }

                this.$gtag.event("submit-registration", { method: "Google" });
                this.$gtag.time({
                    name: "completion-time",
                    value: this.form.time_taken,
                    event_category: "Form completion duration",
                });
                this.track({
                    random_id: this.random_id,
                    key: "form-submitted",
                    value: this.form.time_taken,
                });

                const d = new Date();
                this.form.secret =
                    (d.getHours() * d.getDay() * 15).toString() +
                    d.getFullYear().toString().split("").reverse().join("");

                this.form.dietary_restrictions = this.createDietaryRestrictionString();
                this.form.skill = this.createSkillString();
                this.form.languages = this.createLanguagesString();
                this.form.mentor_tracks = this.createMentorTracksString();

                const resp = await this.performPostRequest(
                    this.getEnvVariable("BACKEND_ENDPOINT"),
                    "register-mentor",
                    this.form
                );

                this.isSending = false; // done submitting

                if (resp) {
                    this.$router.push({ path: "thanks?type=mentor", query: { r: resp.referral_id } });
                    // this.track({
                    //     random_id: this.random_id,
                    //     key: "referral_id",
                    //     value: resp.referral_id,
                    // });
                } else {
                    this.showErrorToast();
                }
            } else {
                this.showErrorToast();
            }
        },
        // logic goes here so feedback is only shown after submission
        formCheck() {
            let valid_form = true;
            console.log("\nvalid form" + valid_form)

            this.form.name = `${this.form.first_name} ${this.form.last_name}`

            console.log("fname: " + (this.form.first_name.length === 0))
            if (this.form.first_name.length === 0) {
                this.valid_first_name = false;
                valid_form = false;
            } else {
                this.valid_first_name = null;
                this.form.first_name = this.form.first_name.trim();
            }

            if (this.form.last_name.length === 0) {
                this.valid_last_name = false;
                valid_form = false;
            } else {
                this.valid_last_name = null;
                this.form.last_name = this.form.last_name.trim();
            }

            console.log("email: " + (!EmailValidator.validate(this.form.email)))
            if (!EmailValidator.validate(this.form.email)) {
                this.valid_email = false;
                valid_form = false;
            } else {
                this.valid_email = null;
            }

            console.log("phone: " + (!phoneNumber || !phoneNumber.isValid()))
            const phoneNumber = parsePhoneNumber(
                this.form.phone,
                DEFAULT_COUNTRY_PHONE
            );
            if (!phoneNumber || !phoneNumber.isValid()) {
                this.valid_phone = false;
                valid_form = false;
            } else {
                this.valid_phone = null;
            }

            console.log("skill: " + (this.createSkillString().length === 0))
            if (this.createSkillString().length === 0) {
                this.valid_skill = false;
                valid_form = false;
            } else {
                this.valid_skill = null;
            }
            console.log("\nvalid form" + valid_form)

            console.log("language: " + (this.createLanguagesString().length === 0))
            if (this.createLanguagesString().length === 0) {
                this.valid_languages = false;
                valid_form = false;
            } else {
                this.valid_languages = null;
            }

            if (!this.form.selected_school_or_company) {
                this.valid_school_or_company = false;
                valid_form = false;
            } else {
                this.valid_school_or_company = null;
            }

            if (this.form.school_year.length === 0 && this.form.selected_school_or_company == "yes") {
                this.valid_school_year = false;
                valid_form = false;
            } else {
                this.valid_school_year = null;
            }

            if (this.school_other_selected && this.form.selected_school_or_company == "yes") {
                this.school_class = "typeahead";
                this.valid_school = null;
                if (this.form.school_other.length === 0) {
                    this.valid_school_other = false;
                    valid_form = false;
                } else {
                    this.valid_school_other = null;
                }
            } else if (this.form.selected_school_or_company == "yes") {
                if (!university_list.includes(this.form.school) && this.form.selected_school_or_company == "yes") {
                    this.valid_school = false;
                    this.school_class = "typeahead is-invalid";
                    valid_form = false;
                } else {
                    this.school_class = "typeahead";
                    this.valid_school = null;
                }
                this.valid_school_other = null;
            }

            if (this.form.company.length === 0 && this.form.selected_school_or_company == "no") {
                this.valid_company = false;
                valid_form = false;
            } else {
                this.valid_company = null;
                this.form.company = this.form.company.trim();
            }

            console.log("tshirt: " + (this.form.tshirt_size.length === 0))
            if (this.form.tshirt_size.length === 0) {
                this.valid_tshirt_size = false;
                valid_form = false;
            } else {
                this.valid_tshirt_size = null;
            }

            console.log("q1: " + (this.form.prev_mentor_experience.length === 0))
            if (this.form.prev_mentor_experience.length === 0) {
                this.valid_prev_mentor_experience = false;
                valid_form = false;
            } else {
                this.valid_prev_mentor_experience = null;
            }

            console.log("q2: " + (this.form.prev_mentor_experience.length === 0))
            if (this.form.prev_track_experience.length === 0) {
                this.valid_prev_track_experience = false;
                valid_form = false;
            } else {
                this.valid_prev_track_experience = null;
            }

            console.log("diet: " + (this.createDietaryRestrictionString().length === 0))
            if (this.createDietaryRestrictionString().length === 0) {
                this.valid_diet = false;
                valid_form = false;
            } else {
                this.valid_diet = null;
            }

            console.log("mlh1: " + (!this.form.MLH_conduct))
            if (!this.form.MLH_conduct) {
                this.valid_code_of_conduct = false;
                valid_form = false;
            } else {
                this.valid_code_of_conduct = null;
            }

            console.log("mlh2: " + (!this.form.MLH_privacy))
            if (!this.form.MLH_privacy) {
                this.valid_mlh_privacy = false;
                valid_form = false;
            } else {
                this.valid_mlh_privacy = null;
            }
            return valid_form;
        },
        resetSchool(other) {
            console.log(other);
            if (other) {
                this.form.school = "Other";
                this.form.school_other = "";
            } else {
                this.form.school = "";
                this.form.school_other = "";
            }
        },
    },
};
</script>
  
<style lang="scss">
.input-group>.typeahead {
    border-radius: 0.4rem;

    &.is-invalid {
        color: var(--pale-red);
        border-color: var(--pale-red);
        background-color: var(--faded-pale-red);
    }
}

.typeahead:focus,
.typeahead:active {
    border-color: var(--mango-orange) !important;
    outline: 0 !important;
    box-shadow: 0 0 0 0.15rem var(--light-orange) !important;
}

/* checkbox */
input[type="checkbox"]:hover~.custom-control-label::before {
    box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.3);
}

input[type="checkbox"]:focus~.custom-control-label::before {
    box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.3);
}

input[type="checkbox"]:checked~.custom-control-label::before {
    background-color: var(--light-orange);
    border-color: grey;
}

/* disabled checkbox */
input[type="checkbox"]:disabled~.custom-control-label::before {
    box-shadow: none !important;
    background-color: white;
    border-color: lightgrey;
}

input[type="checkbox"]:disabled:checked~.custom-control-label::before {
    background-color: rgba(255, 165, 0, 0.4) !important;
}

/* radio button */
input[type="radio"]:checked~.custom-control-label::after {
    background-image: none;
    transform: scale(0.7);
    border-radius: 50%;
    box-shadow: 0px 0px 0px 10px inset var(--light-orange);
}

input[type="radio"]:checked~.custom-control-label::before {
    background-color: white;
    border-color: orange;
}

input[type="radio"]:hover~.custom-control-label::before {
    box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.3);
    background-color: rgba(255, 165, 0, 0.3);
}

input[type="radio"]:focus~.custom-control-label::before {
    box-shadow: none;
}

input[type="radio"]:active~.custom-control-label::before {
    box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.5);
    background-color: rgba(255, 165, 0, 0.5);
}

/* disabled radio button */
input[type="radio"]:disabled:hover~.custom-control-label::before {
    box-shadow: none;
}

input[type="radio"]:disabled~.custom-control-label::before {
    border-color: lightgrey;
    background-color: white;
}

input[type="radio"]:disabled:checked~.custom-control-label::before {
    background-color: white !important;
    border-color: rgba(255, 165, 0, 0.4);
}

input[type="radio"]:disabled:checked~.custom-control-label::after {
    box-shadow: 0px 0px 0px 10px inset rgb(255, 165, 0, 0.4);
}

/* Vertically center checkbox and radio */
.custom-control-label {
    padding-top: 3px;
}
</style>
  
<style scoped lang="scss">
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
    color: var(--black);
    border-radius: 0.4rem;

    &.is-invalid {
        color: var(--pale-red);
        border-color: var(--pale-red);
        background-color: var(--faded-pale-red);
    }

    &:disabled {
        &::placeholder {
            color: var(--pale-grey);
        }

        border-color: var(--faded-red-orange);
        background-color: var(--faded-light-grey);
    }
}

.form-select {
    appearance: none;
    background-image: url("../assets/dropdown-icons/dropdown-arrow-down.png");
    background-size: 25px 25px;
    background-repeat: none;
    overflow: hidden;
}

.form-select:focus {
    appearance: none;
    background-image: url("../assets/dropdown-icons/dropdown-arrow-up.png");
    background-size: 25px 25px;
    overflow: hidden;
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
    width: 50%;
    height: 60px;

    text-align: center;
    margin: auto;

    background: linear-gradient(90deg, #ea1d9b, #ef70ae);
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
  