<!-- eslint-disable no-undef -->
<template>
    <b-row>
        <b-col md="1" />
        <b-col md="10">
            <br>
            <h1 style="text-align: left">
                Register for Bitcamp 2025 - Volunteer
            </h1>
            
            <p style="font-size: 0.9rem; opacity: 95%">
                As a volunteer, you will take on shifts to serve food, help run workshops, guide attendees around the venue, and more!
            </p>
            <p style="font-size: 0.9rem; opacity: 95%">
                Questions? Contact us at
                <a href="mailto:hello@bit.camp">hello@bit.camp</a> or learn more at <a href="https://bit.camp">bit.camp</a>!
            </p>
            <hr>
            <b-form class="registration-form" autocomplete="on" @submit="registerUser">
                <h4>Tell us about yourself!</h4>
                <p class="info">
                    Once you register, you'll receive more info about Bitcamp 2025 at the
                    email you provide.
                </p>

                <!-- Name -->
                <b-form-row>
                    <!-- First Name -->
                    <b-form-group id="input-group-first-name" label="First Name*" label-for="input-first-name"
                        class="col-6 col-md-6">
                        <b-form-input id="input-first-name" v-model="form.first_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie" :state="valid_first_name" />
                        <b-form-invalid-feedback :state="valid_first_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Last Name -->
                    <b-form-group id="input-group-last-name" label="Last Name*" label-for="input-last-name"
                        class="col-6 col-md-6">
                        <b-form-input id="input-last-name" v-model="form.last_name" name="lastname" autocomplete="lastname"
                            placeholder="Wilson" :state="valid_last_name" />
                        <b-form-invalid-feedback :state="valid_last_name">
                            Please enter your last name
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                <!-- Email and Phone Number-->
                <b-form-row>
                    <!-- Email -->
                    <b-form-group id="input-group-2" label="Email*" label-for="input-2" class="col-7 col-md-7">
                        <b-form-input id="input-2" v-model="form.email" name="email" autocomplete="email"
                            placeholder="hello@bit.camp" :state="valid_email" type="email" @blur="emailFilledOut" />
                        <b-form-invalid-feedback :state="valid_email">
                            Please enter a valid email address
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Phone Number -->
                    <b-form-group id="input-group-9" label="Phone Number*" label-for="input-9" class="col-5 col-md-5">
                        <b-form-input id="input-9" v-model="form.phone" name="phone" autocomplete="tel"
                            placeholder="555-555-5555" :state="valid_phone" type="tel" />
                        <b-form-invalid-feedback :state="valid_phone">
                            Please enter a valid phone number
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                <h4>Background</h4>

                <b-form-group label="Will you be attending as a student, or do you bring professional experience?*"
                    id="input-group-school-or-company" label-for="input-school-or-company">
                    <b-form-radio-group id="input-school-or-company" v-model="form.selected_school_or_company"
                        :state="valid_school_or_company">
                        <b-form-radio value="yes">Student</b-form-radio>
                        <b-form-radio value="no"> Professional </b-form-radio>
                    </b-form-radio-group>
                    <b-form-invalid-feedback :state="valid_school_or_company">
                        Please select an answer
                    </b-form-invalid-feedback>
                </b-form-group>

                <!-- School Type -->
                <b-form-row v-if="form.selected_school_or_company === 'yes'">
                    <b-form-group id="input-group-school" label="School Name*" label-for="input-school" class="col-md-12">
                        <vue-bootstrap-autocomplete id="input-school" v-model="form.school" :input-class="school_class"
                            input-name="school" placeholder="University of Maryland, College Park"
                            :data="university_options" no-results-info="No results found." :disabled="school_other_selected"
                            :state="valid_school" />
                        <b-form-invalid-feedback v-if="form.school.length === 0" :state="valid_school">
                            Please enter your school name
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback v-else :state="valid_school">
                            Please select a school from the list
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                <b-form-row v-if="form.selected_school_or_company === 'yes'">
                    <div class="col-md-12">
                        <b-form-checkbox v-model="school_other_selected" :state="valid_school_other" @input="resetSchool">
                            My school is not listed above
                        </b-form-checkbox>
                    </div>
                    <b-form-group class="col-md-12">
                        <b-form-input v-if="school_other_selected" v-model="form.school_other" class="col-12 col-md-12"
                            aria-label="School Other Text Box" placeholder="Other school" :state="valid_school_other" />
                        <b-form-invalid-feedback :state="valid_school_other">
                            Please enter your school name
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                <b-form-group id="input-group-schoolyear" label="Current Level of Study*" label-for="input-schoolyear"
                    class="col-md-6" style="padding: 0rem;" v-if="form.selected_school_or_company === 'yes'">
                    <b-form-select id="input-schoolyear" v-model="form.school_year" placeholder="Choose a level of study"
                        class="form-select" :options="school_year_options" :state="valid_school_year" />
                    <b-form-invalid-feedback :state="valid_school_year">
                        Please select a year
                    </b-form-invalid-feedback>
                </b-form-group>

                <!-- Job -->
                <b-form-group id="input-group-company" label="Company*" label-for="input-company" class="col-6 col-md-12"
                    style="padding: 0rem;" v-if="form.selected_school_or_company === 'no'">
                    <b-form-input id="input-company" v-model="form.company" name="compnay" :state="valid_company" />
                    <b-form-invalid-feedback :state="valid_company">
                        Please enter your company name
                    </b-form-invalid-feedback>
                </b-form-group>

                <!-- T-Shirt Size -->
                <h4 class="mb-2">
                    Select a T-shirt size!
                </h4>
                <p class="info">
                    We've got unisex T-shirts in XS-XL sizes! Choose whichever size you
                    like, and your very own Bitcamp 2025 shirt will be given to you once
                    you arrive at UMD.
                </p>

                <b-form-row>
                    <b-form-group id="input-group-tshirt" label="T-shirt Size*" label-for="input-tshirt" class="col-md-12">
                        <b-form-select id="input-4" v-model="form.tshirt_size" class="form-select"
                            placeholder="Choose a T-shirt size" :options="tshirt_size_options" :state="valid_tshirt_size" />
                        <b-form-invalid-feedback :state="valid_tshirt_size">
                            Please select a T-shirt size
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                <h4 class="mb-2">
                    Dietary Restrictions
                </h4>

                <b-form-group id="input-dietary-restrictions" label="Do you have any dietary restrictions?*"
                    label-for="input-dietary-restrictions" class="col-12 col-md-6" style="padding: 0rem;">
                    <b-form-group v-slot="{ ariaDescribedby }" class="mt-2 mb-1">
                        <b-form-checkbox v-model="diet_none" @change="uncheckDietaryRestrictions()" :state="valid_diet">
                            None
                        </b-form-checkbox>
                        <b-form-checkbox v-for="option in diet_options" :key="option.value" v-model="diet_select"
                            :value="option.value" :aria-describedby="ariaDescribedby" name="flavour-3a"
                            :disabled="diet_none" 
                            :state="valid_diet">
                            {{ option.text }}
                        </b-form-checkbox>
                        <b-form-checkbox v-model="diet_other" :disabled="diet_none" :state="valid_diet">
                            Other
                        </b-form-checkbox>
                        <b-form-input v-if="diet_other" v-model="diet_other_text" class="col-12 col-md-12"
                            aria-label="Dietary Restriction Other Text Box" placeholder="Other dietary restriction" />
                        <b-form-invalid-feedback :state="valid_diet">
                            Please select your dietary restrictions ("None" is an option)
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-group>


                <!-- MLH Stuff -->
                <h4 class="mb-2">
                    Rules and privacy policies
                </h4>

                <b-form-checkbox id="checkbox-1" v-model="form.MLH_privacy" name="checkbox-1" class="checkbox"
                    :state="valid_mlh_privacy">
                    I authorize you to share my application/registration information with
                    Major League Hacking for event administration, ranking, and MLH
                    administration in-line with the
                    <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>. I further agree to the terms of
                    both
                    the
                    <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank">MLH
                        Contest Terms and Conditions</a>
                    and the
                    <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>.*
                    <b-form-invalid-feedback :state="valid_mlh_privacy">
                        Please agree to MLH's privacy policy and terms
                    </b-form-invalid-feedback>
                </b-form-checkbox>

                <b-form-checkbox id="checkbox-2" v-model="form.MLH_conduct" name="checkbox-2" :state="valid_code_of_conduct"
                    class="checkbox" style="padding-bottom: 1rem">
                    I have read and agree to the
                    <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank">MLH Code of Conduct</a>.*
                    <b-form-invalid-feedback :state="valid_code_of_conduct">
                        Please agree to MLH's code of conduct
                    </b-form-invalid-feedback>
                </b-form-checkbox>

                <b-form-checkbox id="checkbox-3" v-model="form.MLH_emails" name="checkbox-3" class="checkbox">
                    I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
                </b-form-checkbox>

                <!-- Submit -->
                <div>
                    <b-button type="submit" class="submit-btn m1 mx-auto" style="center" :disabled="isSending">
                        <h5 class="m-1">
                            Confirm Registration for Bitcamp!
                        </h5>
                    </b-button>
                </div>
            </b-form>
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
import "pdfjs-dist/build/pdf.worker.entry";
import * as univ_list from '../assets/university-list.json';
import * as EmailValidator from "email-validator";
import parsePhoneNumber from "libphonenumber-js";

Vue.use(FormRadioPlugin);
Vue.use(IconsPlugin);
Vue.use(FormFilePlugin);
Vue.component("BFormTextarea", BFormTextarea);
Vue.component("VueBootstrapAutocomplete", VueBootstrapAutocomplete);

const university_list = univ_list.default

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
                company: "",
                school_year: "",
                school: "",
                school_other: "",
                tshirt_size: "",
                dietary_restrictions: "",
            },

            isSending: false,
            random_id: uuid(),
            form_start: Date.now(),
            valid_first_name: null,
            valid_last_name: null,
            valid_company: null,
            valid_email: null,
            valid_phone: null,
            valid_school_year: null,
            valid_school: null,
            valid_school_other: null,
            valid_code_of_conduct: null,
            valid_mlh_privacy: null,
            valid_school_or_company: null,
            valid_tshirt_size: null,
            valid_diet: null,
            school_class: "typeahead",

            school_year_options: [
                { value: "", text: "Select one...", disabled: true },
                { value: "freshman", text: "Freshman" },
                { value: "sophomore", text: "Sophomore" },
                { value: "junior", text: "Junior" },
                { value: "senior", text: "Senior" },
                { value: "graduate", text: "Graduate" },
                { value: "post graduate", text: "Post Graduate" },
                { value: "other", text: "Other" },
                { value: "prefer not to answer", text: "Prefer not to answer" },
            ],

            school_other_selected: false,

            tshirt_size_options: [
                { value: "", text: "Select one...", disabled: true },
                //{ value: "no tshirt", text: "I don't want a T-shirt" },
                { value: "xs", text: "XS" },
                { value: "s", text: "S" },
                { value: "m", text: "M" },
                { value: "l", text: "L" },
                { value: "xl", text: "XL" },
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

            diet_select: [],
            diet_other: false,
            diet_other_text: "",
            diet_none: false,
            diet_options: [
                { text: "Vegan", value: "vegan" },
                { text: "Vegetarian", value: "vegetarian" },
                { text: "Gluten Free", value: "gluten-free" },
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
                
                const resp = await this.performPostRequest(
                    this.getEnvVariable("BACKEND_ENDPOINT"),
                    "register-volunteer",
                    this.form
                );

                this.isSending = false; // done submitting

                // console.log(resp);

                if (resp) {
                    this.$router.push({ path: "thanks?type=volunteer", query: { r: resp.referral_id } });
                    // this.track({
                    //     random_id: this.random_id,
                    //     key: "referral_id",
                    //     value: resp.referral_id,
                    // });
                } else {
                    // console.log('Error 1');
                    this.showErrorToast();
                }
            } else {
                // console.log('Error 2');
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
  