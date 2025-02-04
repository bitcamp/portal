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
            <!-- Photo Consent Form-->
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
                        <b-form-input id="input-first-name" v-model="form.photo_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_photo_name" style="width: 735px;"/>
                        <b-form-invalid-feedback :state="valid_photo_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>

                    
                </b-form-row>

                <!-- Date & Signature -->
                <b-form-row>
                    <!-- Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.photo_date" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_photo_date" />
                        <b-form-invalid-feedback :state="valid_photo_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.photo_signature" name="signaure" autocomplete="signaure"
                            placeholder="Full Name" :state="valid_photo_signature" />
                        <b-form-invalid-feedback :state="valid_photo_signature">
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
                        <b-form-input id="input-first-name" v-model="form.p_photo_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_p_photo_name" style="width: 735px;" />
                        <b-form-invalid-feedback :state="valid_p_photo_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                   
                <!-- Date & Signature -->
                <b-form-row>
                    <!-- Parent Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.p_photo_date" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_p_photo_date" />
                        <b-form-invalid-feedback :state="valid_p_photo_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Parent Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.p_photo_signature" name="signature" autocomplete="signature"
                            placeholder="Full Name" :state="valid_p_photo_signature" />
                        <b-form-invalid-feedback :state="valid_p_photo_signature">
                            Please enter your signature
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>



                <br>



                <!--Chaperone Agreement Form-->
                 <b-form class="registration-form" autocomplete="on" @submit="registerUser">
                <h4><u>Chaperone Agreement Form</u></h4>
                <br>

                <b-form-row>
                  
                    <b-form-group id="input-group-languages" label-for="input-group-languages" class="col-md-12">
                        <b-form-group v-slot="{ ariaDescribedby }" class="mt-2 mb-1">
                            <b-form-checkbox v-for="option in checklistItems" :key="option.text"
                                v-model="form.chap_responsibilities":value="option.text" :aria-describedby="ariaDescribedby"
                                :state="validChecklist">
                                {{ option.text }}
                            </b-form-checkbox>
                            
                        </b-form-group>
                        
                    <b-form-invalid-feedback :state="validChecklist">
                        Please select an option
                    </b-form-invalid-feedback>
                </b-form-group>
                </b-form-row>
                
            

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
                        <b-form-input id="input-first-name" v-model="form.chap_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_chap_name" style="width: 735px;"/>
                        <b-form-invalid-feedback :state="valid_chap_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>

                    
                </b-form-row>
                    <!-- Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.chap_date" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_chap_date" />
                        <b-form-invalid-feedback :state="valid_chap_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.chap_signature" name="signature" autocomplete="signature"
                            placeholder="Full Name" :state="valid_chap_signature" />
                        <b-form-invalid-feedback :state="valid_chap_signature">
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
                        <b-form-input id="input-first-name" v-model="form.p_chap_name" name="firstname"
                            autocomplete="firstname" placeholder="Sophie Wilson" :state="valid_p_chap_name" style="width: 735px;" />
                        <b-form-invalid-feedback :state="valid_p_chap_name">
                            Please enter your first name
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form-row>

                   
                <!-- Date & Signature -->
                <b-form-row>
                    <!-- Parent Date -->
                    <b-form-group id="input-group-date" label="Date*" label-for="input-date"
                        class="col-6 col-md-6">
                        <b-form-input id="input-date" v-model="form.p_chap_date" name="firstname"
                            autocomplete="date" placeholder="MM/DD/YYYY" :state="valid_p_chap_date" />
                        <b-form-invalid-feedback :state="valid_p_chap_date">
                            Please enter your date
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <!-- Parent Signature -->
                    <b-form-group id="input-group-signature" label="Signature*" label-for="input-signature"
                        class="col-6 col-md-6">
                        <b-form-input id="input-signature" v-model="form.p_chap_signature" name="signaure" autocomplete="signature"
                            placeholder="Full Name" :state="valid_p_chap_signature" />
                        <b-form-invalid-feedback :state="valid_p_chap_signature">
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
                
                
                
                photo_name: "",
                
                photo_date:"",
                photo_signature:"",
                p_photo_name: "",
                p_photo_date:"",
                p_photo_signature:"",

                chap_name:"",
                chap_date:"",
                chap_signature:"",
                p_chap_name:"",
                p_chap_date:"",
                p_chap_signature:"",
                chap_responsibilities: [],

                
               
            },

            
            
            valid_photo_name: null,
            valid_photo_date: null,
            valid_photo_signature: null,
            valid_p_photo_name: null,
            valid_p_photo_date: null,
            valid_p_photo_signature: null,

            valid_chap_name: null,
            valid_chap_date: null,
            valid_chap_signature: null,
            valid_p_chap_name: null,
            valid_p_chap_date: null,
            valid_p_chap_signature: null,
            

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

            

            checklistItems: [
        { text: "A Teacher from the minor’s school that has a background check (one teacher for every 15 minors)", value: false },
        { text: "Family member that is 18+", value: false },
        { text: "Adult that is approved by minor’s parent/guardian (adult can take one minor in addition to their own child/sibling)", value: false }
      ],
      validChecklist:null,

           

           
        };
    },
    

    methods: {

        
        
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
        
        
        async registerUser(event) {
        // Prevent form submission from reloading the page
        event.preventDefault();

        // Reset validity states
        this.valid_photo_name= null;
        this.valid_photo_date= null;
        this. valid_photo_signature= null;
        this.valid_p_photo_name= null;
        this.valid_p_photo_date= null;
        this.valid_p_photo_signature= null;
        this.valid_chap_name= null;
        this.valid_chap_date= null;
        this.valid_chap_signature= null;
        this.valid_p_chap_name= null;
        this.valid_p_chap_date=null;
        this.valid_p_chap_signature= null;
        this.validChecklist = null;
        

   

        // Basic validation
        let isValid = true;
        
        console.log('Selected Responsibilities:', this.form.chap_responsibilities);
        if (this.form.chap_responsibilities.length !== 0) {
                this.validChecklist = true; // Mark as invalid if no checkboxes are selected
                
                
            } else {
                this.validChecklist = false; // Mark as valid if any checkbox is selected
                // Proceed with form submission logic
             
                isValid = false;
                
            }

        // Validate photo consent form fields
        if (!this.form.photo_name) {
            this.valid_photo_name = false;
            isValid = false;
        } else {
            this.valid_photo_name = true;
        }

        if (!this.form.photo_date) {
            this.valid_photo_date = false;
            isValid = false;
        } else {
            this.valid_photo_date = true;
        }

        if (!this.form.photo_signature) {
            this.valid_photo_signature = false;
            isValid = false;
        } else {
            this.valid_photo_signature = true;
        }

        // Validate parent/guardian form fields
        if (!this.form.p_photo_name) {
            this.valid_p_photo_name = false;
            isValid = false;
        } else {
            this.valid_p_photo_name = true;
        }

        if (!this.form.p_photo_date) {
            this.valid_p_photo_date = false;
            isValid = false;
        } else {
            this.valid_p_photo_date = true;
        }

        if (!this.form.p_photo_signature) {
            this.valid_p_photo_signature = false;
            isValid = false;
        } else {
            this.valid_p_photo_signature = true;
        }

        // Validate chaperone agreement form fields
        if (!this.form.chap_name) {
            this.valid_chap_name = false;
            isValid = false;
        } else {
            this.valid_chap_name = true;
        }

        if (!this.form.chap_date) {
            this.valid_chap_date = false;
            isValid = false;
        } else {
            this.valid_chap_date = true;
        }

        if (!this.form.chap_signature) {
            this.valid_chap_signature = false;
            isValid = false;
        } else {
            this.valid_chap_signature = true;
        }

        // Validate parent chaperone form fields
        if (!this.form.p_chap_name) {
            this.valid_p_chap_name = false;
            isValid = false;
        } else {
            this.valid_p_chap_name = true;
        }

        if (!this.form.p_chap_date) {
            this.valid_p_chap_date = false;
            isValid = false;
        } else {
            this.valid_p_chap_date = true;
        }

        if (!this.form.p_chap_signature) {
            this.valid_p_chap_signature = false;
            isValid = false;
        } else {
            this.valid_p_chap_signature = true;
        }

        // If the form is valid, proceed with submitting
    
        if (isValid) {
            this.isSending = true;

            // Simulate form submission (e.g., make an API call)
            try {
                // Example: API call to submit form data
                const response = await this.submitFormData();
                console.log(this.form)


                if (response.success) {
                    // Handle success (e.g., display success message, redirect)
                    alert("Form submitted successfully!");
                    
                } else {
                    // Handle error (e.g., display error message)
                    alert("Error submitting form, please try again.");
                }
            } catch (error) {
                // Handle any unexpected errors
                alert("An unexpected error occurred.");
            } finally {
                this.isSending = false;
            }
        } else {
            // If form is not valid, show validation feedback
            alert("Please fill out all required fields.");
        }
    },

    // Mock function to simulate form submission (e.g., via API)
    async submitFormData() {
        // Simulate a delay for API call (e.g., 2 seconds)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 2000);
        });
    }
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
  