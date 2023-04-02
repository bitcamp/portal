<template>
    <b-row>
        <b-col md="1" />
        <b-col md="10">
            <br>
            <h1 style="text-align: center">
                Registration for Bitcamp 2023 is now closed - see you April 7-9!
            </h1>
            <img style="width: 200px; height: 200px;" src="@/assets/bitcamp.gif" />

            <p style="font-size: 0.9rem; opacity: 95%; text-align:center; padding-top: 3rem">
                Questions? Contact us at
                <a href="mailto:hello@bit.camp">hello@bit.camp</a> or learn more at <a href="https://bit.camp">bit.camp</a>!
            </p>
            <hr>

        </b-col>
        <b-col md="1" />
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
import TrackSelection from "./TrackSelection.vue";
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
    components: { TrackSelection },
    mixins: [generalMixin],

    data() {
        return {
            form: {
                email: this.$route.query.redo != null ? this.$route.query.redo : "",
                phone: "",
                MLH_emails: false,
                MLH_conduct: false,
                MLH_privacy: false,
                underrepresented_Gender: false,
                name: "",
                first_name: "",
                last_name: "",
                pronouns: "",
                country_of_residence: "",
                gender: "",
                ethnicity: "",
                major: "",
                recruit: "",
                portfolio: "",
                school_year: "",
                school: "",
                school_other: "",
                resume: "",
                resume_link: "",
                resume_id: "",
                age: "",
                minors_form: false,
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
                heard_from: "",
                dietary_restrictions: "",
                gmaps_place_id: "",
                referred_by: "",
                track_selected: "general",
                waitlist_track_selected: "",
            },

            isSending: false,
            random_id: uuid(),
            form_start: Date.now(),
            valid_first_name: null,
            valid_last_name: null,
            valid_pronouns: null,
            valid_email: null,
            valid_phone: null,
            valid_resume: null,
            valid_school_year: null,
            valid_school: null,
            valid_school_other: null,
            valid_country: null,
            valid_gender: null,
            valid_ethnicity: null,
            valid_major: null,
            valid_recruit: null,
            valid_portfolio: null,
            valid_age: null,
            valid_minors_form: null,
            valid_code_of_conduct: null,
            valid_mlh_privacy: null,
            valid_track_selected: null,
            valid_waitlist_track_selected: null,
            valid_address: null,
            valid_tshirt_size: null,
            valid_underrepresented_Gender: null,
            valid_hackcount: null,
            valid_survey_1: null,
            valid_survey_2: null,
            valid_survey_3: null,
            valid_survey_4: null,
            valid_survey_5: null,
            valid_survey_6: null,
            valid_question1: null,
            valid_question2: null,
            valid_heard_from: null,
            valid_diet: null,

            school_class: "typeahead",

            school_year_options: [
                { value: "", text: "Select one...", disabled: true },
                { value: "less than high school", text: "Less than Secondary / High School" },
                { value: "high school", text: "Secondary / High School" },
                { value: "undergrad 2 year", text: "Undergraduate University (2 year - community college or similar)" },
                { value: "undergrad 3+ year", text: "Undergraduate University (3+ year)" },
                { value: "grad", text: "Graduate University (Masters, Professional, Doctoral, etc)" },
                { value: "bootcamp", text: "Code School / Bootcamp" },
                { value: "vocational", text: "Other Vocational / Trade Program or Apprenticeship" },
                { value: "postdoc", text: "Post Doctorate" },
                { value: "other", text: "Other" },
                { value: "not a student", text: "I’m not currently a student" },
                { value: "prefer not to answer", text: "Prefer not to answer" },
            ],

            school_other_selected: false,

            gender_options: [
                { value: "", text: "Select one...", disabled: true },
                { value: "female", text: "Female" },
                { value: "male", text: "Male" },
                { value: "nonbinary", text: "Nonbinary" },
                { value: "prefer not to answer", text: "Prefer not to answer" },
                { value: "other", text: "Other" },
            ],

            ethnicity_select: [],
            ethnicity_other: false,
            ethnicity_other_text: "",
            ethnicity_prefer_no_answer: false,
            ethnicity_options: [
                { value: "asian-indian", text: "Asian Indian" },
                { value: "black-african", text: "Black or African" },
                { value: "chinese", text: "Chinese" },
                { value: "filipino", text: "Filipino" },
                { value: "guamanian-chamorro", text: "Guamanian or Chamorro" },
                { value: "hispanic", text: "Hispanic / Latino / Spanish Origin" },
                { value: "japanese", text: "Japanese" },
                { value: "korean", text: "Korean" },
                { value: "middle-eastern", text: "Middle Eastern" },
                { value: "native-american-alaskan-native", text: "Native American or Alaskan Native" },
                { value: "hawaiian", text: "Native Hawaiian" },
                { value: "samoan", text: "Samoan" },
                { value: "vietnamese", text: "Vietnamese" },
                { value: "white", text: "White" },
                { value: "other-asian", text: "Other Asian (Thai, Cambodian, etc.)" },
                { value: "other-pacific-islander", text: "Other Pacific Islander" },
                // { value: "prefer-not-to-answer", text: "Prefer Not to Answer" },
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

            major_options: [
                { value: "", text: "Select one...", disabled: true },
                { value: "no major", text: "No Major" },
                ...major_map,
                { value: "other", text: "Other" },
            ],

            recruit_options: [
                { value: "", text: "Select one...", disabled: true },
                { value: "yes fte", text: "Yes, for an internship" },
                { value: "yes intern", text: "Yes, for a full-time position" },
                {
                    value: "yes both",
                    text: "Yes, for an internship or full-time position",
                },
                { value: "no", text: "No" },
            ],

            university_options: [...university_list],

            country_options: [
                { value: "", text: "Select one...", disabled: true },
                ...country_list
            ],

            heard_from_select: [],
            heard_from_other: false,
            heard_from_other_text: "",
            heard_from_options: [
                { value: "instagram", text: "Instagram" },
                { value: "facebook", text: "Facebook" },
                { value: "twitter", text: "Twitter" },
                { value: "tiktok", text: "TikTok" },
                { value: "youtube", text: "YouTube" },
                { value: "linkedin", text: "LinkedIn" },
                { value: "google", text: "Google" },
                { value: "mlh", text: "Major League Hacking" },
                { value: "email", text: "Email Listserv" },
                { value: "flyer", text: "Flyer or Poster" },
                { value: "friend", text: "Friend" },
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

    mounted() {
        // log registration in google analytics
        this.$gtag.event("open-registration", { method: "Google" });
        this.track({
            random_id: this.random_id,
            key: "open-registration",
            value: true,
        });
        // this.sendAnalyticsEvent("registration_page_visit");
        document.addEventListener("DOMContentLoaded", () => {
            const input = document.getElementById("input-5");
            const autocomplete = new google.maps.places.Autocomplete(input, {
                types: ["address"],
            });

            google.maps.event.addListener(autocomplete, "place_changed", () => {
                const place = autocomplete.getPlace();

                //updates v-model value
                this.form.gmaps_place_id = place.place_id;
                this.form.address = place.formatted_address;
                this.fillInAddress(place);
            });

            google.maps.event.addDomListener(input, "keydown", function (event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    this.form.gmaps_place_id = place.place_id;
                }
            });

            document
                .getElementsByClassName("typeahead")[0]
                .setAttribute("autocomplete", "off");

            // document.getElementsByClassName("pac-container")[0].setAttribute("data-tap-disabled", "true");
        });
    },

    methods: {
        updateTrack(value) {
            this.form.track_selected = value;
        },
        updateWaitlistTrack(value) {
            this.form.waitlist_track_selected = value;
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
                        this.form.city = document.getElementById("input-city").value =
                            component.long_name;
                        break;

                    case "administrative_area_level_1": {
                        this.form.state = document.getElementById("input-state").value =
                            component.short_name;
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
        createEthnicityString() {
            let ethnicity_string = this.ethnicity_select.join(",");

            if (this.ethnicity_prefer_no_answer) {
                return "prefer-not-to-answer";
            }
            if (this.ethnicity_other && this.ethnicity_other_text != "") {
                if (ethnicity_string != "") {
                    ethnicity_string += ","
                }
                ethnicity_string = ethnicity_string + "other(" + this.ethnicity_other_text + ")";
            }

            return ethnicity_string;
        },
        createHeardFromString() {
            let heard_from_string = this.heard_from_select.join(",");

            if (this.heard_from_other && this.heard_from_other_text != "") {
                if (heard_from_string != "") {
                    heard_from_string += ","
                }
                heard_from_string = heard_from_string + "other(" + this.heard_from_other_text + ")";
            }

            return heard_from_string;
        },
        uncheckDietaryRestrictions() {
            this.diet_select = [];
            this.diet_other = false;
        },
        uncheckEthnicity() {
            this.ethnicity_select = [];
            this.ethnicity_other = false;
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

                // Track "heard from" statistics
                for (let heardFrom of this.heard_from_select) {
                    this.track({
                        random_id: this.random_id,
                        key: `hf-${heardFrom}`,
                        value: 1,
                    });
                }
                if (this.heard_from_other) {
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

                const survey_count = { r: 0, b: 0, g: 0 };

                survey_count[this.form.selected_survey_1.substring(0, 1)] += 1;
                survey_count[this.form.selected_survey_2.substring(0, 1)] += 1;
                survey_count[this.form.selected_survey_3.substring(0, 1)] += 1;
                survey_count[this.form.selected_survey_4.substring(0, 1)] += 1;
                survey_count[this.form.selected_survey_5.substring(0, 1)] += 1;
                survey_count[this.form.selected_survey_6.substring(0, 1)] += 1;

                this.form.red = survey_count["r"];
                this.form.green = survey_count["g"];
                this.form.blue = survey_count["b"];

                this.form.dietary_restrictions = this.createDietaryRestrictionString();
                this.form.ethnicity = this.createEthnicityString();
                this.form.heard_from = this.createHeardFromString();

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
                        value: resp.referral_id,
                    });
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

            this.form.name = `${this.form.first_name} ${this.form.last_name}`

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

            if (!EmailValidator.validate(this.form.email)) {
                this.valid_email = false;
                valid_form = false;
            } else {
                this.valid_email = null;
            }

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

            if (this.form.country_of_residence.length === 0) {
                this.valid_country = false;
                valid_form = false;
            } else {
                this.valid_country = null;
            }

            if (this.form.gender.length === 0) {
                this.valid_gender = false;
                valid_form = false;
            } else {
                this.valid_gender = null;
            }

            if (this.createEthnicityString().length === 0) {
                this.valid_ethnicity = false;
                valid_form = false;
            } else {
                this.valid_ethnicity = null;
            }

            if (this.form.major.length === 0) {
                this.valid_major = false;
                valid_form = false;
            } else {
                this.valid_major = null;
            }

            if (this.form.recruit.length === 0) {
                this.valid_recruit = false;
                valid_form = false;
            } else {
                this.valid_recruit = null;
            }

            if (this.form.school_year.length === 0) {
                this.valid_school_year = false;
                valid_form = false;
            } else {
                this.valid_school_year = null;
            }

            if (this.school_other_selected) {
                this.school_class = "typeahead";
                this.valid_school = null;
                if (this.form.school_other.length === 0) {
                    this.valid_school_other = false;
                    valid_form = false;
                } else {
                    this.valid_school_other = null;
                }
            } else {
                if (!university_list.includes(this.form.school)) {
                    this.valid_school = false;
                    this.school_class = "typeahead is-invalid";
                    valid_form = false;
                } else {
                    this.school_class = "typeahead";
                    this.valid_school = null;
                }
                this.valid_school_other = null;
            }

            if (this.form.tshirt_size.length === 0) {
                this.valid_tshirt_size = false;
                valid_form = false;
            } else {
                this.valid_tshirt_size = null;
            }

            if (this.form.age.length === 0) {
                this.valid_age = false;
                valid_form = false;
            } else {
                this.valid_age = null;
            }

            if (this.form.age.length > 0 && this.form.age < 18 && !this.form.minors_form) {
                this.valid_minors_form = false;
                valid_form = false;
            } else {
                this.valid_minors_form = null;
            }

            if (this.form.hack_count.length === 0 ||
                parseInt(this.form.hack_count) < 0) {
                this.valid_hackcount = false;
                valid_form = false;
            } else {
                this.valid_hackcount = null;
            }

            if (this.form.question1.length === 0) {
                this.valid_question1 = false;
                valid_form = false;
            } else {
                this.valid_question1 = null;
            }

            if (this.form.question2.length === 0) {
                this.valid_question2 = false;
                valid_form = false;
            } else {
                this.valid_question2 = null;
            }

            if (this.createHeardFromString().length === 0) {
                this.valid_heard_from = false;
                valid_form = false;
            } else {
                this.valid_heard_from = null;
            }

            if (this.createDietaryRestrictionString().length === 0) {
                this.valid_diet = false;
                valid_form = false;
            } else {
                this.valid_diet = null;
            }

            if (!this.form.MLH_conduct) {
                this.valid_code_of_conduct = false;
                valid_form = false;
            } else {
                this.valid_code_of_conduct = null;
            }

            if (!this.form.MLH_privacy) {
                this.valid_mlh_privacy = false;
                valid_form = false;
            } else {
                this.valid_mlh_privacy = null;
            }

            if (this.form.track_selected.length === 0) {
                this.valid_track_selected = false;
                valid_form = false;
            } else {
                this.valid_track_selected = null;
            }

            if (!this.form.selected_survey_1) {
                this.valid_survey_1 = false;
                valid_form = false;
            } else {
                this.valid_survey_1 = null;
            }
            if (!this.form.selected_survey_2) {
                this.valid_survey_2 = false;
                valid_form = false;
            } else {
                this.valid_survey_2 = null;
            }
            if (!this.form.selected_survey_3) {
                this.valid_survey_3 = false;
                valid_form = false;
            } else {
                this.valid_survey_3 = null;
            }
            if (!this.form.selected_survey_4) {
                this.valid_survey_4 = false;
                valid_form = false;
            } else {
                this.valid_survey_4 = null;
            }
            if (!this.form.selected_survey_5) {
                this.valid_survey_5 = false;
                valid_form = false;
            } else {
                this.valid_survey_5 = null;
            }
            if (!this.form.selected_survey_6) {
                this.valid_survey_6 = false;
                valid_form = false;
            } else {
                this.valid_survey_6 = null;
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
        async upload(file) {
            if (this.form.first_name.length == 0 || this.form.last_name.length == 0) {
                this.showErrorToastCustom(
                    "Oops! Put in your name first so our marshies make sure your file is in the right place!"
                );
                this.valid_resume = false;
                return;
            }

            this.valid_resume = null;

            if (
                this.form.resume.name.slice(-3) != "pdf" &&
                this.form.resume.name.slice(-3) != "doc" &&
                this.form.resume.name.slice(-4) != "docx" &&
                this.form.resume.name.slice(-3) != "txt"
            ) {
                this.showErrorToastCustom(
                    "Oops! Make sure your resume is in pdf, doc, docx, or txt format!"
                );
                this.valid_resume = false;
                return;
            }

            let cleanname;
            if (this.form.resume.name.slice(-4) == "docx") {
                cleanname =
                    this.form.first_name
                        .replace(/[^a-z0-9_-]/gi, "_")
                        .toLowerCase()
                        .replace(/_{2,}/g, "_")
                        .substring(0, 48) +
                    "_" + this.form.last_name
                        .replace(/[^a-z0-9_-]/gi, "_")
                        .toLowerCase()
                        .replace(/_{2,}/g, "_")
                        .substring(0, 48) +
                    "." +
                    this.form.resume.name.slice(-4);
            } else {
                cleanname =
                    this.form.first_name
                        .replace(/[^a-z0-9_-]/gi, "_")
                        .toLowerCase()
                        .replace(/_{2,}/g, "_")
                        .substring(0, 48) +
                    "_" + this.form.last_name
                        .replace(/[^a-z0-9_-]/gi, "_")
                        .toLowerCase()
                        .replace(/_{2,}/g, "_")
                        .substring(0, 48) +
                    "." +
                    this.form.resume.name.slice(-3);
            }

            const userParams = {
                id: this.random_id,
                filename: cleanname,
                filetype: this.form.resume.name.slice(-3),
            };

            const r = await this.performPostRequest(
                this.getEnvVariable("BACKEND_ENDPOINT"),
                "upload_resume",
                userParams
            );

            if (!(r && r.putUrl)) {
                this.showErrorToastCustom(
                    "Oops! We couldn't upload your resume, try again later!"
                );
                this.valid_resume = false;
                return;
            }

            const cleanFile = new File([file], cleanname, {
                type: file.type,
                lastModified: file.lastModified,
            });

            const r2 = await this.performRawPostRequest(r.putUrl, cleanFile);
            this.form.resume_link = r.uploadUrl;
            this.form.resume_id = this.random_id;

            if (!(r2 && r2.status == 200)) {
                this.showErrorToastCustom(
                    "Oops! We couldn't upload your resume, try again later!"
                );
                this.valid_resume = false;
                return;
            }

            // below is for resume parsing
            let text = "";
            const pdfVersion = "2.10.377";
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
    width: 100%;
    height: 72px;

    text-align: center;
    margin: auto;

    background: radial-gradient(92.62% 25% at 33.31% 0%,
            #ffaa6c 0.01%,
            #ff6a37 50.52%,
            #ff6a37 100%);
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
