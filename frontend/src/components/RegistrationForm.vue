<template>
  <b-row>
    <b-col md="1" />
    <b-col md="10">
      <br />
      <h1 style="text-align: left">Register for Bitcamp 2025</h1>

      <p style="font-size: 0.9rem; opacity: 95%">
        <b-alert show variant="danger">
          At the moment, you can still register to join the waitlist, but registration to
          <b>guarantee</b> a spot for Bitcamp is <b>closed</b>. We will notify you on Friday night
          (4/11) if you can attend.
        </b-alert>
      </p>

      <p style="font-size: 0.9rem; opacity: 95%">
        Questions? Contact us at
        <a href="mailto:hello@bit.camp">hello@bit.camp</a> or learn more at
        <a href="https://bit.camp">bit.camp</a>!
      </p>
      <hr />
      <b-form class="registration-form" autocomplete="on" @submit="registerUser">
        <h4>Tell us about yourself!</h4>
        <p class="info">
          Once you register, you'll receive more info about Bitcamp 2025 at the email you provide.
        </p>

        <!-- Name and Age -->
        <b-form-row>
          <!-- First Name -->
          <b-form-group
            id="input-group-first-name"
            label="First Name*"
            label-for="input-first-name"
            class="col-12 col-md-5"
          >
            <b-form-input
              id="input-first-name"
              v-model="form.first_name"
              name="firstname"
              autocomplete="firstname"
              placeholder="Sophie"
              :state="valid_first_name"
            />
            <b-form-invalid-feedback :state="valid_first_name">
              Please enter your first name
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Last Name -->
          <b-form-group
            id="input-group-last-name"
            label="Last Name*"
            label-for="input-last-name"
            class="col-7 col-md-5"
          >
            <b-form-input
              id="input-last-name"
              v-model="form.last_name"
              name="lastname"
              autocomplete="lastname"
              placeholder="Wilson"
              :state="valid_last_name"
            />
            <b-form-invalid-feedback :state="valid_last_name">
              Please enter your last name
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Date of Birth -->
          <b-form-group
            id="input-group-age"
            label="Age*"
            label-for="input-age"
            class="col-5 col-md-2"
          >
            <b-form-input
              id="input-age"
              v-model="form.age"
              name="age"
              autocomplete="age"
              type="number"
              min="0"
              max="120"
              placeholder="19"
              :state="valid_age"
            />
            <b-form-invalid-feedback v-if="form.age.length === 0" :state="valid_age">
              Please enter your age
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- <p class="info" v-if="form.age.length > 0 && form.age > 2 && form.age < 18">
          To attend Bitcamp as a minor, please fill out these
          <a href="https://drive.google.com/drive/folders/1fVcfhQ7AfGJZ_m-QnVgXmE5ghgtxr9vr?usp=drive_link"
            target="_blank">minors
            forms</a> and email them to
          <a href="mailto:minors@bit.camp">minors@bit.camp</a>.*
        </p> -->

        <!-- Email and Phone Number-->
        <b-form-row>
          <!-- Email -->
          <b-form-group
            id="input-group-2"
            label="Email*"
            label-for="input-2"
            class="col-7 col-md-7"
          >
            <b-form-input
              id="input-2"
              v-model="form.email"
              name="email"
              autocomplete="email"
              placeholder="hello@bit.camp"
              :state="valid_email"
              type="email"
              @blur="emailFilledOut"
            />
            <b-form-invalid-feedback :state="valid_email">
              Please enter a valid email address
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Phone Number -->
          <b-form-group
            id="input-group-9"
            label="Phone Number*"
            label-for="input-9"
            class="col-5 col-md-5"
          >
            <b-form-input
              id="input-9"
              v-model="form.phone"
              name="phone"
              autocomplete="tel"
              placeholder="555-555-5555"
              :state="valid_phone"
              type="tel"
            />
            <b-form-invalid-feedback :state="valid_phone">
              Please enter a valid phone number
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- Gender and Country of Residence -->
        <b-form-row>
          <!-- Gender -->
          <b-form-group
            id="input-group-gender"
            label="Gender Identity*"
            label-for="input-gender"
            class="col-md-6"
          >
            <b-form-select
              id="input-gender"
              v-model="form.gender"
              placeholder="Choose a gender identity"
              class="form-select"
              :options="gender_options"
              :state="valid_gender"
            />
            <b-form-invalid-feedback :state="valid_gender">
              Please select a gender identity
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Country of Residence -->
          <b-form-group
            id="input-group-country"
            label="Country of Residence*"
            label-for="input-country"
            class="col-md-6"
          >
            <b-form-select
              id="input-country"
              v-model="form.country_of_residence"
              placeholder="Select a country"
              class="form-select"
              :options="country_options"
              :state="valid_country"
            />
            <b-form-invalid-feedback :state="valid_country">
              Please select your country of residence
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- Race / Ethnicity -->
        <b-form-row>
          <b-form-group
            id="input-group-ethnicity"
            label="Race / Ethnicity*"
            label-for="input-group-ethnicity"
            class="col-md-12"
          >
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-2 mb-1">
              <b-form-checkbox
                v-for="option in ethnicity_options"
                :key="option.value"
                v-model="ethnicity_select"
                :value="option.value"
                :aria-describedby="ariaDescribedby"
                :state="valid_ethnicity"
                :disabled="ethnicity_prefer_no_answer"
              >
                {{ option.text }}
              </b-form-checkbox>
              <b-form-checkbox
                v-model="ethnicity_prefer_no_answer"
                :state="valid_ethnicity"
                @change="uncheckEthnicity()"
              >
                Prefer Not to Answer
              </b-form-checkbox>
              <b-form-checkbox
                v-model="ethnicity_other"
                :state="valid_ethnicity"
                :disabled="ethnicity_prefer_no_answer"
              >
                Other (Please Specify)
              </b-form-checkbox>
            </b-form-group>
            <b-form-input
              v-if="ethnicity_other"
              v-model="ethnicity_other_text"
              class="col-12 col-md-5"
              aria-label="Ethnicity Other Text Box"
              placeholder="Other race / ethnicity"
            />
          </b-form-group>
          <b-form-invalid-feedback :state="valid_ethnicity">
            Please select your race / ethnicity
          </b-form-invalid-feedback>
        </b-form-row>

        <hr />
        <h4>How about your school?</h4>
        <br />

        <!-- School Type -->
        <b-form-row>
          <b-form-group
            id="input-group-school"
            label="School Name*"
            label-for="input-school"
            class="col-md-12"
          >
            <vue-bootstrap-autocomplete
              id="input-school"
              v-model="form.school"
              :input-class="school_class"
              input-name="school"
              placeholder="University of Maryland, College Park"
              :data="university_options"
              no-results-info="No results found."
              :disabled="school_other_selected"
              :state="valid_school"
            />
            <b-form-invalid-feedback v-if="form.school.length === 0" :state="valid_school">
              Please enter your school name
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-else :state="valid_school">
              Please select a school from the list
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <div class="col-md-12">
            <b-form-checkbox
              v-model="school_other_selected"
              :state="valid_school_other"
              @input="resetSchool"
            >
              My school is not listed above
            </b-form-checkbox>
          </div>
          <b-form-group class="col-md-12">
            <b-form-input
              v-if="school_other_selected"
              v-model="form.school_other"
              class="col-12 col-md-12"
              aria-label="School Other Text Box"
              placeholder="Other school"
              :state="valid_school_other"
            />
            <b-form-invalid-feedback :state="valid_school_other">
              Please enter your school name
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- More School Info -->
        <b-form-row>
          <b-form-group
            id="input-group-schoolyear"
            label="Current Level of Study*"
            label-for="input-schoolyear"
            class="col-md-6"
          >
            <b-form-select
              id="input-schoolyear"
              v-model="form.school_year"
              placeholder="Choose a level of study"
              class="form-select"
              :options="school_year_options"
              :state="valid_school_year"
            />
            <b-form-invalid-feedback :state="valid_school_year">
              Please select a year
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-major"
            label="Primary Major*"
            label-for="input-major"
            class="col-md-6"
          >
            <b-form-select
              id="input-major"
              v-model="form.major"
              class="form-select"
              placeholder="Choose a major"
              :options="major_options"
              :state="valid_major"
            />
            <b-form-invalid-feedback :state="valid_major">
              Please select a major
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <hr />
        <h4>Want to get hired?</h4>
        <p class="info">Let us know, and we'll pass your info on to our sponsors!</p>

        <!-- recruitment info -->
        <b-form-row>
          <b-form-group
            id="input-group-recruit"
            label="Do you want to be recruited for jobs?*"
            label-for="input-recruit"
            class="col-md-6"
          >
            <b-form-select
              id="input-recruit"
              v-model="form.recruit"
              placeholder="Choose an option"
              :options="recruit_options"
              class="form-select"
              :state="valid_recruit"
            />
            <b-form-invalid-feedback :state="valid_recruit">
              Please select an option
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-portfolio"
            label="GitHub or Portfolio Link"
            label-for="input-portfolio"
            class="col-md-6"
          >
            <b-form-input
              id="input-portfolio"
              v-model="form.portfolio"
              autocomplete="input-portfolio"
              placeholder="github.com/yourname"
            />
          </b-form-group>
        </b-form-row>

        <!-- resume upload -->
        <b-form-row>
          <b-form-group
            id="input-group-resume"
            label="Resume (.pdf .doc .docx)"
            label-for="input-resume"
            class="col-md-12"
          >
            <b-form-file
              id="input-resume"
              v-model="form.resume"
              name="resume"
              accept=".pdf, .doc, .docx, .txt"
              placeholder="Upload Resume (size limit: 5MB)"
              drop-placeholder="Drop file here..."
              :state="valid_resume"
              @input="upload"
            />
            <b-form-invalid-feedback :state="valid_resume">
              We couldn't upload your resume. Check that you entered your name first, and make sure
              your file size is less than 5MB!
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Citizen Question -->
          <b-form-group
            v-if="agreeToRecruitment()"
            id="input-group-citizen"
            label="Are you a US citizen?"
            label-for="input-citizen"
            class="col-md-12"
          >
            <b-form-radio-group
              id="input-citizen"
              v-model="form.citizen"
              class="font-weight-normal pt-2"
            >
              <p class="note">
                This information will be used for recruitment purposes only. Bitcamp will not be
                sending this data to any third-parties outside of sponsors.
              </p>
              <b-form-radio :value="true"> Yes </b-form-radio>
              <b-form-radio :value="false"> No </b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-form-row>

        <!-- Track selection -->
        <hr />
        <h4>Choose a track!</h4>
        <TrackSelection
          :default="'general'"
          @picked="updateTrack"
          @waitlisted="updateWaitlistTrack"
        />

        <!-- Optional quantum selection 1 -->
        <hr />
        <b-form-row>
          <b-form-group
            v-if="selectedQuantumTrack()"
            label="Would you like to be placed in the beginner quantum or advanced quantum track?*"
            class="col-md-12"
            label-for="quantum-survey"
          >
            <b-form-radio-group
              id="quantum-survey"
              v-model="form.quantum_track"
              class="font-weight pt-2"
              :state="valid_quantum_survey"
            >
              <b-form-radio value="beginner"> Beginner </b-form-radio>
              <b-form-radio value="advanced"> Advanced </b-form-radio>
            </b-form-radio-group>
            <b-form-invalid-feedback :state="valid_quantum_survey">
              Please select an answer
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Quantum selection 2 -->

          <b-form-group
            label="Although we are not offering a beginner (general) track this year, Bitcamp remains committed to being a
                  hackathon for hackers of all skill levels and experiences, and we’re working to ensure that our workshops
                  are beginner-friendly. Additionally, we will be creating and offering access to hacker guides, tips on how
                  to make the most of your Bitcamp weekend, and different resources that you can leverage when creating your hack!
                  Would you like us to share this content with you?*"
            label-for="beginner-question"
            class="col-md-12 pt-2"
          >
            <b-form-radio-group
              id="beginner-question"
              v-model="form.beginner_content_opt_in"
              class="font-weight-normal pt-2"
              :state="valid_beginner_survey"
            >
              <b-form-radio :value="true"> Yes </b-form-radio>
              <b-form-radio :value="false"> No </b-form-radio>
            </b-form-radio-group>
            <b-form-invalid-feedback :state="valid_beginner_survey">
              Please select an answer
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- Travel and Transportation -->
        <div v-if="!atNoTransportUnis()">
          <h4>Travel and Transportation</h4>
          <b-form-row class="pt-3">
            <b-form-group
              label="Would you need travel assistance to the hackathon?*"
              class="col-md-7"
              label-for="transport-bool"
            >
              <b-form-radio-group
                id="transport-bool"
                v-model="form.transport"
                :state="valid_transport"
                class="pt-2"
                @change="resetTransport"
              >
                <b-form-radio :value="true"> Yes </b-form-radio>
                <b-form-radio :value="false"> No </b-form-radio>
              </b-form-radio-group>
              <b-form-invalid-feedback :state="valid_transport">
                Please select an answer
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>
        </div>

        <!-- Shipping Address -->
        <hr />
        <h4>Want to give us a shipping address?</h4>
        <p class="info">
          We plan on handing out all swag in-person at the event, but in case we need to ship swag
          to you instead, this is where we'll send it to. Please note that we can only ship to the
          USA.
        </p>
        <b-form-group>
          <b-form-row>
            <b-form-group
              id="input-group-5"
              label="Shipping Address"
              label-for="input-5"
              class="col-md-7"
            >
              <b-form-input
                id="input-5"
                v-model="form.address1"
                name="address"
                autocomplete="off"
                placeholder="8125 Paint Branch Drive"
                class="form-input"
                :state="valid_address"
              />
            </b-form-group>

            <b-form-group
              id="input-group-address-line2"
              label="Shipping Address Line 2"
              label-for="input-address-line2"
              class="col-md-5"
            >
              <b-form-input
                id="input-address-line2"
                v-model="form.address2"
                name="address-line2"
                autocomplete="address-line2"
                placeholder="Apartment or Unit Number (optional)"
                class="form-input"
                :state="valid_address"
              />
            </b-form-group>
          </b-form-row>
          <b-form-row>
            <b-form-group
              id="input-group-city"
              label="City"
              label-for="input-city"
              class="col-8 col-md-5"
            >
              <b-form-input
                id="input-city"
                v-model="form.city"
                name="city"
                autocomplete="off"
                placeholder="College Park"
                :state="valid_address"
              />
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
              />
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
              />
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
              />
            </b-form-group>
          </b-form-row>
          <b-form-invalid-feedback :state="valid_address" style="margin: 0">
            Please provide a valid shipping address to apply for the hardware track
          </b-form-invalid-feedback>
        </b-form-group>

        <!-- Bitcamp Campfire Games Survey -->
        <hr />
        <h4>Campfire Games Survey</h4>
        <p class="info">
          This year, you'll once again be put into one of three teams based on your personality and
          interests. By winning unique challenges and attending workshops and mini-events, you and
          your fellow hackers will rack up points for your team. At the end of the event, members of
          the winning team will receive limited edition Bitcamp swag. So what are you waiting for?
          Take the survey and find your team!
        </p>
        <b-form-group class="font-weight-bold" label="Which dino do you most identify with?*">
          <b-form-radio-group
            id="survey-1"
            v-model="form.selected_survey_1"
            class="font-weight-normal pt-2"
            :state="valid_survey_1"
          >
            <b-form-radio value="r"> Triceratops </b-form-radio><br />
            <b-form-radio value="r1"> Velociraptor </b-form-radio><br />
            <b-form-radio value="g"> Ankylosaurus </b-form-radio><br />
            <b-form-radio value="b"> Stegosaurus </b-form-radio><br />
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_1">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          class="font-weight-bold"
          label="You are stuck in a cave with nothing but stones; what's your first move?*"
        >
          <b-form-radio-group
            id="survey-2"
            v-model="form.selected_survey_2"
            class="font-weight-normal pt-2"
            :state="valid_survey_2"
          >
            <b-form-radio value="b"> Grind the stones into paste and make a picasso </b-form-radio
            ><br />
            <b-form-radio value="r"> Strike the stones and make a fire </b-form-radio><br />
            <b-form-radio value="g">
              Kick the stones and invent the earliest prehistoric version of soccer </b-form-radio
            ><br />
            <b-form-radio value="b1">
              Line the stones and embrace your territory as a homebody </b-form-radio
            ><br />
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_2">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          class="font-weight-bold"
          label="If you could bring back one of these animals, which one would you choose?*"
        >
          <b-form-radio-group
            id="survey-3"
            v-model="form.selected_survey_3"
            class="font-weight-normal pt-2"
            :state="valid_survey_3"
          >
            <b-form-radio value="b"> Woolly Mammoths </b-form-radio><br />
            <b-form-radio value="g"> Dodo Birds </b-form-radio><br />
            <b-form-radio value="r"> Saber-Toothed Tigers </b-form-radio><br />
            <b-form-radio value="r1"> Megalodon Sharks </b-form-radio><br />
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_3">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="What’s your favorite part of Bitcamp?*">
          <b-form-radio-group
            id="survey-4"
            v-model="form.selected_survey_4"
            class="font-weight-normal pt-2"
            :state="valid_survey_4"
          >
            <b-form-radio value="g"> Hunting and gathering food and swag </b-form-radio><br />
            <b-form-radio value="b"> Hacking with axes </b-form-radio><br />
            <b-form-radio value="r"> Late night shenanigans </b-form-radio><br />
            <b-form-radio value="g1"> First time, I'll find out! </b-form-radio><br />
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_4">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="What would be your favorite way to unwind?*">
          <b-form-radio-group
            id="survey-5"
            v-model="form.selected_survey_5"
            class="font-weight-normal pt-2"
            :state="valid_survey_5"
          >
            <b-form-radio value="r"> Play some tunes on an ivory flute </b-form-radio><br />
            <b-form-radio value="g"> A day trip hunting bison & fishing by hand </b-form-radio
            ><br />
            <b-form-radio value="b"> Stargaze with a fellow neanderthal </b-form-radio><br />
            <b-form-radio value="g1"> Munch on roots, berries, and leaves! </b-form-radio><br />
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_5">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>

        <hr />
        <!-- T-Shirt Size -->
        <h4 class="mb-2">Select a T-shirt size!</h4>
        <p class="info">
          We've got unisex T-shirts in sizes XS-2XL! Choose whichever size you like, and your very
          own Bitcamp 2025 shirt will be given to you once you arrive at UMD.
        </p>

        <b-form-row>
          <b-form-group
            id="input-group-tshirt"
            label="T-shirt Size*"
            label-for="input-tshirt"
            class="col-md-12"
          >
            <b-form-select
              id="input-4"
              v-model="form.tshirt_size"
              class="form-select"
              placeholder="Choose a T-shirt size"
              :options="tshirt_size_options"
              :state="valid_tshirt_size"
            />
            <b-form-invalid-feedback :state="valid_tshirt_size">
              Please select a T-shirt size
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <hr />
        <!-- Short Questions -->
        <h4 class="mb-2">Why Bitcamp?</h4>
        <p class="info">
          We'd like to get to know you a little better! Help us learn more about you and make
          Bitcamp even more amazing by answering some questions!
        </p>

        <b-form-row>
          <b-form-group
            id="input-group-hackcount"
            label="How many hackathons have you participated in before?*"
            label-for="input-hackcount"
            class="col-md-12"
          >
            <b-form-input
              id="input-hackcount"
              v-model="form.hack_count"
              name="input-hackcount"
              autocomplete="off"
              placeholder="Number of Hackathons here..."
              class="form-input"
              :state="valid_hackcount"
              type="number"
              min="0"
            />
            <b-form-invalid-feedback :state="valid_hackcount">
              Please enter a valid number
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-question1"
            label="Why are you interested in attending Bitcamp?*"
            label-for="input-question1"
            class="col-md-12"
          >
            <b-form-textarea
              id="input-question1"
              v-model="form.question1"
              name="question1"
              autocomplete="off"
              placeholder="Your response here..."
              rows="3"
              max-rows="3"
              :state="valid_question1"
              :minlength="minChars"
              :maxlength="maxChars"
            />

            <small class="text-muted">
              {{ form.question1.length }} / {{ maxChars }} characters (minimum
              {{ minChars }} required)
            </small>

            <b-form-invalid-feedback :state="valid_question1">
              Please tell us why you are interested in attending Bitcamp
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group
            id="input-group-question2"
            label="What do you plan on doing or building at Bitcamp?*"
            label-for="input-question2"
            class="col-md-12"
          >
            <b-form-textarea
              id="input-question2"
              v-model="form.question2"
              name="question2"
              autocomplete="off"
              placeholder="Your response here..."
              rows="3"
              max-rows="3"
              :state="valid_question2"
              :minlength="minChars"
              :maxlength="maxChars"
            />

            <small class="text-muted">
              {{ form.question2.length }} / {{ maxChars }} characters (minimum
              {{ minChars }} required)
            </small>

            <b-form-invalid-feedback :state="valid_question2">
              Please tell us what you plan on doing/building at Bitcamp
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group
            id="input-heard-from"
            label="Where did you hear about us?*"
            label-for="input-heard-from"
            class="col-12 col-md-6"
          >
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-2 mb-1">
              <b-form-checkbox
                v-for="option in heard_from_options"
                :key="option.value"
                v-model="heard_from_select"
                :value="option.value"
                :aria-describedby="ariaDescribedby"
                name="flavour-3a"
                :state="valid_heard_from"
              >
                {{ option.text }}
              </b-form-checkbox>
              <b-form-checkbox v-model="heard_from_other" :state="valid_heard_from">
                Other
              </b-form-checkbox>
              <b-form-invalid-feedback :state="valid_heard_from">
                Please select an option
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-input
              v-if="heard_from_other"
              v-model="heard_from_other_text"
              class="col-12 col-md-12"
              aria-label="Heard From Other Text Box"
              placeholder="Other source"
            />
          </b-form-group>

          <b-form-group
            id="input-dietary-restrictions"
            label="Do you have any dietary restrictions?*"
            label-for="input-dietary-restrictions"
            class="col-12 col-md-6"
          >
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-2 mb-1">
              <b-form-checkbox
                v-model="diet_none"
                :state="valid_diet"
                @change="uncheckDietaryRestrictions()"
              >
                None
              </b-form-checkbox>
              <b-form-checkbox
                v-for="option in diet_options"
                :key="option.value"
                v-model="diet_select"
                :value="option.value"
                :aria-describedby="ariaDescribedby"
                name="flavour-3a"
                :disabled="diet_none"
                :state="valid_diet"
              >
                {{ option.text }}
              </b-form-checkbox>
              <b-form-checkbox v-model="diet_other" :disabled="diet_none" :state="valid_diet">
                Other
              </b-form-checkbox>
              <b-form-invalid-feedback :state="valid_diet">
                Please select your dietary restrictions ("None" is an option)
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-input
              v-if="diet_other"
              v-model="diet_other_text"
              class="col-12 col-md-12"
              aria-label="Dietary Restriction Other Text Box"
              placeholder="Other dietary restriction"
            />
          </b-form-group>
        </b-form-row>

        <hr />

        <!-- Minor Waivers -->
        <!-- New waiver forms for minors -->
        <div v-if="form.age.length > 0 && Number(form.age) < 18">
          <h4>Minor Waivers</h4>

          <!-- Minor Agreement Form -->
          <h4><u>Student Organization Release and Informed Consent Form</u></h4>
          <br />
          <p class="info">
            I am a participant of Bitcamp 2025 (Activity), a student organization recognized by the
            Stamp Student Union (Union) at the University of Maryland, College Park (University). I
            desire to participate in the Activity from April 11, 2025- April 13, 2025 including. In
            consideration of being permitted to participate in such Activity, I, for myself, my
            heirs, personal representative(s) and assigns hereby represent and agree as follows:
            <br />
            1. I fully recognize and understand that there are risks and hazards, minor and serious,
            associated with participation in the Activity, ranging from scrapes, bruises,
            lacerations, broken bones to concussions, spinal cord injuries, paralysis and, even,
            death. These injuries may result from crashing with other participants, being hit by
            equipment, or environmental conditions. <br />
            2. I understand that protective equipment, including but not limited to, headgear, pads,
            eyewear and mouthpieces may be recommended for the safety and protection of
            participants, and I agree to wear such equipment when participating in the Activity.
            However, I understand that wearing such equipment will not eliminate the risks of
            participation. <br />
            3. To the extent they exist, I understand that the rules and regulations of the
            Activity’s organizers are designed, in part, for the safety and protection of
            participants and I agree to abide by those rules and regulations. <br />
            4. I understand that any physical activity requires a minimum level of fitness for safe
            participation. I also understand that the University advises that participants in the
            Activity carry personal health and accident insurance. I further understand that the
            University and Bitcamp 2023 do not provide medical, health or other insurance for
            participants in the Activity. <br />
            5. In the event of a medical emergency, I hereby give my consent to emergency
            transportation and medical treatment arising out of or related to participation in the
            Activity. I understand that I am solely responsible for any and all costs associated
            with any medical care received. <br />
            6. Knowing the dangers, hazards and risks associated with student organization
            activities, I voluntarily assume all responsibility and risk of loss, damage, illness
            and/or injury to my person or property in any way associated with my participation in
            the Activity. <br />
            7. To the fullest extent permitted by law, I hereby release and forever discharge, and
            agree to indemnify and hold harmless the State of Maryland, the University of Maryland,
            and their departments, officers, agents, employees, and volunteers (Released Parties)
            and Bitcamp 2023 from and against any and all liabilities, claims, demands, causes of
            action, costs and expenses, (including attorneys’ fees and related litigation costs)
            incurred by any of the Released Parties arising out of or relating to my participation
            in or involvement with student organization activities, or use of University equipment
            and facilities, including travel thereto and therefrom, whether due to the negligence,
            default or other action or inaction of any person or entity, including the Released
            Parties. <br />
            I, _________________________________________, CERTIFY THAT I AM BETWEEN THE AGES OF 14
            AND 18 AND THAT I HAVE READ AND FULLY UNDERSTAND THIS RELEASE AND INFORMED CONSENT FORM
            AND I SIGN IT VOLUNTARILY WITH FULL KNOWLEDGE OF ITS SIGNIFICANCE. AS A MINOR, THE
            SIGNATURE BELOW IS THAT OF A PARENT OR LEGAL GUARDIAN AUTHORIZED TO SIGN ON MY BEHALF.
          </p>

          <!-- Photography Consent Form -->
          <h4><u>Photography Consent Form</u></h4>
          <br />
          <p class="info">
            I, __________________________________________, hereby give permission to the University
            of Maryland to use and reproduce my image, likeness, voice, and name (collectively,
            “Image”) and to authorize others to use my Image in any manner the University elects in
            any and all media now known or hereafter discovered or developed, in perpetuity,
            throughout the universe including but not limited to reproducing my Image in print
            publications, web sites, and audio visual broadcasts. I understand and agree that the
            University will own all rights in my Image, including all rights under copyright. I
            expressly waive any right I might have of prior approval over how and where my Image is
            used and compensation and all rights of privacy and rights accruing under the Family
            Educational Rights and Privacy Act and the University of Maryland policy that implements
            that Act. I forever release and discharge the State of Maryland, the University of
            Maryland, and their respective officers, employees, agents and other persons acting
            within the scope of their authority from any and all claims or causes of action, now
            known or later discovered, relating to or arising out of use of my Image, including by
            not limited to claims for invasion of privacy or misappropriation, right of publicity
            and defamation arising out of the use and exploitation of my Image. I represent that I
            am between the ages of 10 and 18 years, and that I have read this permission, am fully
            familiar with its contents and meaning, and have been given the opportunity to consult
            counsel of my choosing prior to signing this Permission and Release. As a Minor, the
            signature below is that of a parent or legal guardian authorized to sign on my behalf.
          </p>
          <b-form-row>
            <b-form-group
              id="input-group-photo-name"
              label="Minor Full Name*"
              label-for="input-photo-name"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-photo-name"
                v-model="form.photo_name"
                placeholder="Minor Full Name"
                :state="valid_photo_name"
              />
              <b-form-invalid-feedback :state="valid_photo_name">
                Please enter your full name
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-photo-date"
              label="Date*"
              label-for="input-photo-date"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-photo-date"
                v-model="form.photo_date"
                placeholder="MM/DD/YYYY"
                :state="valid_photo_date"
                :min="today"
                :max="today"
                type="date"
              />
              <b-form-invalid-feedback :state="valid_photo_date">
                Please enter today’s date in MM/DD/YYYY format.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-photo-signature"
              label="Signature*"
              label-for="input-photo-signature"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-photo-signature"
                v-model="form.photo_signature"
                placeholder="Signature"
                :state="valid_photo_signature"
              />
              <b-form-invalid-feedback :state="valid_photo_signature">
                Please enter your signature
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>

          <!-- Parent/Guardian Info for Photography Consent -->
          <b-form-row>
            <b-form-group
              id="input-group-p-photo-name"
              label="Parent/Guardian Full Name*"
              label-for="input-p-photo-name"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-p-photo-name"
                v-model="form.p_photo_name"
                placeholder="Parent/Guardian Full Name"
                :state="valid_p_photo_name"
              />
              <b-form-invalid-feedback :state="valid_p_photo_name">
                Please enter your parent/guardian's full name
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-p-photo-date"
              label="Date*"
              label-for="input-p-photo-date"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-p-photo-date"
                v-model="form.p_photo_date"
                placeholder="MM/DD/YYYY"
                :state="valid_p_photo_date"
                :min="today"
                :max="today"
                type="date"
              />
              <b-form-invalid-feedback :state="valid_p_photo_date">
                Please enter the date
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>
          <b-form-row>
            <b-form-group
              id="input-group-p-photo-signature"
              label="Signature*"
              label-for="input-p-photo-signature"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-p-photo-signature"
                v-model="form.p_photo_signature"
                placeholder="Signature"
                :state="valid_p_photo_signature"
              />
              <b-form-invalid-feedback :state="valid_p_photo_signature">
                Please enter your parent/guardian signature
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>

          <!-- Terms and Code of Conduct Section for Minors -->
          <div v-if="form.age.length > 0 && Number(form.age) < 18">
            <h4>Bitcamp Terms and Code of Conduct</h4>
            <!-- Display the long terms text in a scrollable preformatted area -->
            <p class="terms-content">
              BY PARTICIPATING IN BITCAMP, YOU AGREE TO THE FOLLOWING TERMS AND ALL OTHER APPLICABLE
              DOCUMENTS.
              <br />
              <br />
              Henceforth, "I", “me”, "my", “myself”, and other first-person pronouns shall refer to
              the Participant. "The Organizers" shall refer to any persons or group who had
              significant participation in the creation of the event, namely (but not necessarily
              exclusively) the Bitcamp organizing team, Bitcamp Inc., Startup Shell Inc., the
              student organization named Terrapin Hackers, and the University of Maryland at College
              Park. “The Hackathon” shall refer to the Bitcamp hackathon.
              <br />
              <br />
              I understand that by participating in The Hackathon, I agree to the following terms
              listed in this Bitcamp Terms and Code of Conduct agreement (the “Agreement”), and to
              follow any procedures and instructions given by The Organizers. Refusal to comply and
              any violations will subject me to punishment deemed appropriate by The Organizers,
              such as the revocation of prizes and expulsion from The Hackathon.
              <br />
              <br />
              I have represented myself accurately on the application and all other event forms. I
              am allowed to develop a concept for a project prior to The Hackathon, but any and all
              programming and tangible creations related to a concept must be done at the time and
              place of The Hackathon. I am allowed to use publicly available resources and code on
              my project, and I accept sole responsibility for licensee or owner responsibilities
              and for any and all licensing or ownership rights and responsibilities of any
              intellectual property that I use, display, store, distribute, make derivative works
              from, or otherwise and other appropriate acknowledgement regarding the resources. I
              understand that The Organizers will not receive any ownership title or rights of any
              work or project done at The Hackathon other than those limited rights herein. All
              original work will solely remain under the ownership of the creator and/or the
              employing company. The Organizers are not liable for any legal or contractual issues
              that may arise from the work. I hereby agree to indemnify, hold harmless, and defend
              The Organizers against any liability resulting from the project or any created
              content. I understand that the judges and The Organizers are allowed to look at my
              code for the purpose of judging by volunteer judges, and that the decisions of these
              judges are final and may not be contested. The Hackathon will not be held responsible
              for any decisions made by sponsors, and The Organizers are not liable for any
              transaction of prizes between a sponsor and a participant. I understand that if I win
              a Bitcamp-sponsored prize, it is my responsibility to be present at the event to
              receive the prize. If I am not present, I understand that I will not receive the
              prize, regardless if the rest of my team is present to receive their prizes. I
              understand that I will be fully responsible for any costs I incur as a direct or
              indirect result of participation in the event, including but not limited to use of
              proprietary technology, food, accommodations, and other purchases. The Organizers will
              not be liable for any costs or expenses incurred throughout the event. I understand
              that The Organizers are not obligated to give travel reimbursements, and that any
              granted travel reimbursements are contingent upon my submission of a project to
              Devpost. I understand that all services provided, including but not limited to
              transportation, facilities (property, furniture, electricity, networking), food and
              beverage, and activities are provided on an as-is and as-available basis only, with no
              guarantee of services meeting my requirements or remaining uninterrupted, error-free,
              secure, or free from viruses and other harmful components. The Organizers are not
              liable for any errors in services, regardless of whether they appear to provide these
              services or not. I understand any information I provide via my application may be
              distributed to sponsors for recruiting purposes. I understand that by providing my
              resume via the application, I am allowing the distribution of my resume to sponsors
              for recruiting purposes. I understand that unless I have paid for certain perks of
              sponsorship of Bitcamp, I am not allowed to recruit from the participants or disperse
              marketing or recruiting materials to anyone at The Hackathon, including anyone in the
              venue. I agree to be respectful and courteous to The Organizers, sponsors, volunteers,
              mentors, venue staff, and all other participants. The Organizers have the authority to
              discipline me if my behavior at the event does not meet their subjective standards of
              respect and courtesy. I authorize The Organizers in advance of any reasonably
              perceived medical emergency to authorize any specific diagnosis, treatment, or
              hospital care that is required to save my life or my child’s life or to avoid or
              respond to serious bodily harm, but this authorization is given to provide authority
              and power on the part of Bitcamp, its agents and employees for the duration of a
              hackathon event and no more than eight hours after the official end of the event while
              I or my child remain on the premises of the Organizer’s hackathon, in order to give
              specific consent to any and all such diagnosis, treatment or hospital care which the
              aforementioned health professional in the exercise of his or her best judgment may
              deem required or reasonably recommended. I agree to not be in the possession of
              illegal drugs, alcohol, or weapons at The Hackathon and otherwise always adhere to
              applicable state and federal contacts law. I understand that I am bound to all rules
              and regulations of Maryland state laws, as well as applicable city and federal laws.
              <br />
              <br />
              I ASSUME ALL RESPONSIBILITY FOR THE DAMAGE OR THEFT OF ALL PERSONAL ITEMS AND
              PROPERTY. I UNDERSTAND THAT THE HACKATHON AND THE ORGANIZERS DO NOT TAKE
              RESPONSIBILITY AND ARE NOT LIABLE FOR ANY DAMAGES OR THEFT TO PERSONAL ITEMS AND/OR
              PROPERTY.

              <br />
              <br />
              I understand that The Hackathon is 36 hours long, and that fatigue can cause delayed
              reaction time or unusual decision-making, and I indemnify and hold harmless Bitcamp
              and the University of Maryland for any liabilities or damages from and against, and
              shall compensate and reimburse each Indemnitee for, any loss, damage, injury, harm,
              detriment, lost opportunity, liability, exposure, claim, demand, settlement, judgment,
              award, fine, penalty, tax, fee (including attorneys’ fees), charge or expense that is
              directly or indirectly suffered or incurred by any of the Indemnitees, or to which any
              of the Indemnitees otherwise may become subject (regardless of whether or not related
              to a third-party claim) at any time (whether during or after the Term), and that is
              caused by or results from (a) any inaccuracy in any representation or warranty by or
              on my behalf contained in this Agreement, or (b) any failure on my part to observe,
              perform or abide by, or any other breach of, any restriction, covenant, obligation or
              other provision contained in this Agreement.
            </p>

            <!-- Minor's Information -->
            <b-form-row>
              <b-form-group
                id="input-group-terms-minor-name"
                label="Minor Full Name*"
                label-for="input-terms-minor-name"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-terms-minor-name"
                  v-model="form.terms_minor_name"
                  placeholder="Minor Full Name"
                  :state="valid_terms_minor_name"
                />
                <b-form-invalid-feedback :state="valid_terms_minor_name">
                  Please enter your full name
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-terms-minor-date"
                label="Date*"
                label-for="input-terms-minor-date"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-terms-minor-date"
                  v-model="form.terms_minor_date"
                  placeholder="MM/DD/YYYY"
                  :state="valid_terms_minor_date"
                  :min="today"
                  :max="today"
                  type="date"
                />
                <b-form-invalid-feedback :state="valid_terms_minor_date">
                  Please enter the date
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row>
              <b-form-group
                id="input-group-terms-minor-signature"
                label="Minor Signature*"
                label-for="input-terms-minor-signature"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-terms-minor-signature"
                  v-model="form.terms_minor_signature"
                  placeholder="e-Signature"
                  :state="valid_terms_minor_signature"
                />
                <b-form-invalid-feedback :state="valid_terms_minor_signature">
                  Please provide your e-signature
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>

            <!-- Guardian's Information -->
            <b-form-row>
              <b-form-group
                id="input-group-terms-parent-name"
                label="Parent/Guardian Full Name*"
                label-for="input-terms-parent-name"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-terms-parent-name"
                  v-model="form.terms_parent_name"
                  placeholder="Parent/Guardian Full Name"
                  :state="valid_terms_parent_name"
                />
                <b-form-invalid-feedback :state="valid_terms_parent_name">
                  Please enter your parent/guardian's full name
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-terms-parent-date"
                label="Date*"
                label-for="input-terms-parent-date"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-terms-parent-date"
                  v-model="form.terms_parent_date"
                  placeholder="MM/DD/YYYY"
                  :state="valid_terms_parent_date"
                  :min="today"
                  :max="today"
                  type="date"
                />
                <b-form-invalid-feedback :state="valid_terms_parent_date">
                  Please enter the date
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row>
              <b-form-group
                id="input-group-terms-parent-signature"
                label="Parent/Guardian Signature*"
                label-for="input-terms-parent-signature"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-terms-parent-signature"
                  v-model="form.terms_parent_signature"
                  placeholder="e-Signature"
                  :state="valid_terms_parent_signature"
                />
                <b-form-invalid-feedback :state="valid_terms_parent_signature">
                  Please provide your parent/guardian's e-signature
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
          </div>

          <div v-if="form.age.length > 0 && Number(form.age) < 18">
            <h4><u>Conditional Form Question</u></h4>
            <b-form-group label="Please select your waiver type:" label-for="waiver-type">
              <b-form-radio-group
                id="waiver-type"
                v-model="form.waiverType"
                :state="valid_waiverType"
                name="waiver-type"
              >
                <b-form-radio value="chaperone">I have a chaperone</b-form-radio>
                <b-form-radio value="school">I'm coming with my school</b-form-radio>
              </b-form-radio-group>
              <b-form-invalid-feedback :state="valid_waiverType">
                Please select a waiver type.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>

          <!-- Chaperone Agreement Form -->
          <div
            v-if="form.age.length > 0 && Number(form.age) < 18 && form.waiverType === 'chaperone'"
          >
            <h4><u>Chaperone Agreement Form</u></h4>

            <br />
            <h5>Chaperone Responsibilities</h5>
            <ul>
              <li v-for="(responsibility, index) in responsibilities" :key="index">
                {{ responsibility }}
              </li>
            </ul>

            <b-form-row>
              <b-form-group
                id="input-group-chap-name"
                label="Minor Full Name*"
                label-for="input-chap-name"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-chap-name"
                  v-model="form.chap_name"
                  placeholder="Minor Full Name"
                  :state="valid_chap_name"
                />
                <b-form-invalid-feedback :state="valid_chap_name">
                  Please enter your full name
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-chap-date"
                label="Date*"
                label-for="input-chap-date"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-chap-date"
                  v-model="form.chap_date"
                  placeholder="MM/DD/YYYY"
                  :state="valid_chap_date"
                  :min="today"
                  :max="today"
                  type="date"
                />
                <b-form-invalid-feedback :state="valid_chap_date">
                  Please enter the date
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row>
              <b-form-group
                id="input-group-chap-signature"
                label="Signature*"
                label-for="input-chap-signature"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-chap-signature"
                  v-model="form.chap_signature"
                  placeholder="e-Signature"
                  :state="valid_chap_signature"
                />
                <b-form-invalid-feedback :state="valid_chap_signature">
                  Please enter your signature
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row>
              <b-form-group
                id="input-group-p-chap-name"
                label="Chaperone Full Name*"
                label-for="input-p-chap-name"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-p-chap-name"
                  v-model="form.p_chap_name"
                  placeholder="Chaperone Full Name"
                  :state="valid_p_chap_name"
                />
                <b-form-invalid-feedback :state="valid_p_chap_name">
                  Please enter your chaperone's full name
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-p-chap-date"
                label="Date*"
                label-for="input-p-chap-date"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-p-chap-date"
                  v-model="form.p_chap_date"
                  placeholder="MM/DD/YYYY"
                  :state="valid_p_chap_date"
                  :min="today"
                  :max="today"
                  type="date"
                />
                <b-form-invalid-feedback :state="valid_p_chap_date">
                  Please enter the date
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
            <b-form-row>
              <b-form-group
                id="input-group-p-chap-signature"
                label="Signature*"
                label-for="input-p-chap-signature"
                class="col-6 col-md-6"
              >
                <b-form-input
                  id="input-p-chap-signature"
                  v-model="form.p_chap_signature"
                  placeholder="e-Signature"
                  :state="valid_p_chap_signature"
                />
                <b-form-invalid-feedback :state="valid_p_chap_signature">
                  Please enter your chaperone's signature
                </b-form-invalid-feedback>
              </b-form-group>
            </b-form-row>
          </div>
        </div>

        <!-- School Agreement Form Section -->
        <div v-if="form.age.length > 0 && Number(form.age) < 18 && form.waiverType === 'school'">
          <h4>School Agreement Form</h4>
          <p>
            ________________________________________________ <strong>[Chaperone]</strong> is
            authorized by ______________________________________________
            <strong>[School]</strong> to be a chaperone for up to fifteen (15) minors. He/She has
            been background checked and is cleared to legally take responsibility for students on
            off‐campus trips. The school also understands that neither Bitcamp, nor the University
            of Maryland, will be taking legal custody of your students during the course of Bitcamp
            2025.
          </p>

          <!-- Minor's Information -->
          <h5>Minor's Information</h5>
          <b-form-row>
            <b-form-group
              id="input-group-school-minor-name"
              label="Minor Full Name*"
              label-for="input-school-minor-name"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-minor-name"
                v-model="form.school_minor_name"
                placeholder="Minor Full Name"
                :state="valid_school_minor_name"
              />
              <b-form-invalid-feedback :state="valid_school_minor_name">
                Please enter the minor's full name.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-school-minor-date"
              label="Date*"
              label-for="input-school-minor-date"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-minor-date"
                v-model="form.school_minor_date"
                placeholder="MM/DD/YYYY"
                :state="valid_school_minor_date"
                :min="today"
                :max="today"
                type="date"
              />
              <b-form-invalid-feedback :state="valid_school_minor_date">
                Please enter the date.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>
          <b-form-row>
            <b-form-group
              id="input-group-school-minor-signature"
              label="Minor Signature*"
              label-for="input-school-minor-signature"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-minor-signature"
                v-model="form.school_minor_signature"
                placeholder="e-Signature"
                :state="valid_school_minor_signature"
              />
              <b-form-invalid-feedback :state="valid_school_minor_signature">
                Please provide the minor's e-signature.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>

          <!-- Teacher's Information -->
          <h5>Teacher's Information</h5>
          <b-form-row>
            <b-form-group
              id="input-group-school-teacher-name"
              label="Teacher Full Name*"
              label-for="input-school-teacher-name"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-teacher-name"
                v-model="form.school_teacher_name"
                placeholder="Teacher Full Name"
                :state="valid_school_teacher_name"
              />
              <b-form-invalid-feedback :state="valid_school_teacher_name">
                Please enter the teacher's full name.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-school-teacher-date"
              label="Date*"
              label-for="input-school-teacher-date"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-teacher-date"
                v-model="form.school_teacher_date"
                placeholder="MM/DD/YYYY"
                :state="valid_school_teacher_date"
                :min="today"
                :max="today"
                type="date"
              />
              <b-form-invalid-feedback :state="valid_school_teacher_date">
                Please enter the date.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>
          <b-form-row>
            <b-form-group
              id="input-group-school-teacher-signature"
              label="Teacher Signature*"
              label-for="input-school-teacher-signature"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-teacher-signature"
                v-model="form.school_teacher_signature"
                placeholder="e-Signature"
                :state="valid_school_teacher_signature"
              />
              <b-form-invalid-feedback :state="valid_school_teacher_signature">
                Please provide the teacher's e-signature.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>

          <!-- Principal's Information -->
          <h5>Principal's Information</h5>
          <b-form-row>
            <b-form-group
              id="input-group-school-principal-name"
              label="Principal Full Name*"
              label-for="input-school-principal-name"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-principal-name"
                v-model="form.school_principal_name"
                placeholder="Principal Full Name"
                :state="valid_school_principal_name"
              />
              <b-form-invalid-feedback :state="valid_school_principal_name">
                Please enter the principal's full name.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              id="input-group-school-principal-date"
              label="Date*"
              label-for="input-school-principal-date"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-principal-date"
                v-model="form.school_principal_date"
                placeholder="MM/DD/YYYY"
                :state="valid_school_principal_date"
                :min="today"
                :max="today"
                type="date"
              />
              <b-form-invalid-feedback :state="valid_school_principal_date">
                Please enter the date.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>
          <b-form-row>
            <b-form-group
              id="input-group-school-principal-signature"
              label="Principal Signature*"
              label-for="input-school-principal-signature"
              class="col-6 col-md-6"
            >
              <b-form-input
                id="input-school-principal-signature"
                v-model="form.school_principal_signature"
                placeholder="e-Signature"
                :state="valid_school_principal_signature"
              />
              <b-form-invalid-feedback :state="valid_school_principal_signature">
                Please provide the principal's e-signature.
              </b-form-invalid-feedback>
            </b-form-group>
          </b-form-row>
        </div>

        <!-- MLH Stuff -->
        <h4 class="mb-2">Rules and privacy policies</h4>

        <b-form-checkbox
          v-if="form.age.length > 0 && form.age < 18"
          id="checkbox-0"
          v-model="form.minors_form"
          name="checkbox-0"
          :state="valid_minors_form"
          class="checkbox"
        >
          I have filled out the minors forms.*
          <b-form-invalid-feedback :state="valid_minors_form">
            Please fill out the minors forms
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-1"
          v-model="form.MLH_privacy"
          name="checkbox-1"
          class="checkbox"
          :state="valid_mlh_privacy"
        >
          I authorize you to share my application/registration information with Major League Hacking
          for event administration, ranking, and MLH administration in-line with the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>. I further agree
          to the terms of both the
          <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank"
            >MLH Contest Terms and Conditions</a
          >
          and the
          <a href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy</a>.*
          <b-form-invalid-feedback :state="valid_mlh_privacy">
            Please agree to MLH's privacy policy and terms
          </b-form-invalid-feedback>
        </b-form-checkbox>

        <b-form-checkbox
          id="checkbox-2"
          v-model="form.MLH_conduct"
          name="checkbox-2"
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
          id="checkbox-3"
          v-model="form.MLH_emails"
          name="checkbox-3"
          class="checkbox"
        >
          I authorize MLH to send me occasional emails about relevant events, career opportunities,
          and community announcements.
        </b-form-checkbox>

        <!-- Submit -->
        <div>
          <b-button
            type="submit"
            class="submit-btn m1 mx-auto"
            style="center"
            :disabled="isSending"
          >
            <h5 class="m-1">Confirm Registration for Bitcamp!</h5>
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
  AlertPlugin,
} from "bootstrap-vue";
import VueBootstrapAutocomplete from "@vue-bootstrap-components/vue-bootstrap-autocomplete";
import TrackSelection from "./TrackSelection.vue";
import * as PDFJS from "pdfjs-dist/legacy/build/pdf.js";
import "pdfjs-dist/build/pdf.worker.entry";
import * as majors_list from "../assets/college-majors.json";
import * as univ_list from "../assets/university-list.json";
import * as country_codes from "../assets/country-codes.json";
import * as EmailValidator from "email-validator";
import parsePhoneNumber from "libphonenumber-js";

Vue.use(FormRadioPlugin);
Vue.use(IconsPlugin);
Vue.use(FormFilePlugin);
Vue.use(AlertPlugin);
Vue.component("BFormTextarea", BFormTextarea);
Vue.component("VueBootstrapAutocomplete", VueBootstrapAutocomplete);

const university_list = univ_list.default;

const country_list = country_codes.default.map((country) => country["name"]);

const major_map = majors_list["rows"].map((major) => {
  return {
    value: major[2].toLowerCase(),
    text: major[2]
      .toLowerCase()
      .split(" ")
      .map((word) => (word === "and" ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join(" "),
  };
});

major_map.sort((major1, major2) => {
  return major1["value"] < major2["value"] ? -1 : major1["value"] > major2["value"] ? 1 : 0;
});

const DEFAULT_COUNTRY_PHONE = "US";

export default {
  name: "RegistrationForm",
  components: { TrackSelection },
  mixins: [generalMixin],

  data() {
    return {
      minChars: 50,
      maxChars: 1000,
      today: "",
      form: {
        email: this.$route.query.redo != null ? this.$route.query.redo : "",
        phone: "",
        MLH_emails: false,
        MLH_conduct: false,
        MLH_privacy: false,
        // underrepresented_Gender: false,
        name: "",
        first_name: "",
        last_name: "",
        // pronouns: "",
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
        transport: null,
        transport_select: "",
        transport_deposit: null,
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
        citizen: null,
        quantum_track: null,
        beginner_content_opt_in: null,
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
      // valid_underrepresented_Gender: null,
      valid_hackcount: null,
      valid_quantum_survey: null,
      valid_beginner_survey: null,
      valid_survey_1: null,
      valid_survey_2: null,
      valid_survey_3: null,
      valid_survey_4: null,
      valid_survey_5: null,
      valid_question1: null,
      valid_question2: null,
      valid_transport: null,
      valid_transport_options: null,
      valid_transport_deposit: null,
      valid_heard_from: null,
      valid_diet: null,
      valid_photo_name: null,
      valid_photo_date: null,
      valid_photo_signature: null,
      valid_p_photo_name: null,
      valid_p_photo_date: null,
      valid_p_photo_signature: null,
      valid_chap_checklist: null,
      valid_chap_name: null,
      valid_chap_date: null,
      valid_chap_signature: null,
      valid_p_chap_name: null,
      valid_p_chap_date: null,
      valid_p_chap_signature: null,
      valid_terms_minor_name: null,
      valid_terms_minor_date: null,
      valid_terms_minor_signature: null,
      valid_terms_parent_name: null,
      valid_terms_parent_date: null,
      valid_terms_parent_signature: null,
      valid_school_minor_name: null,
      valid_school_minor_date: null,
      valid_school_minor_signature: null,
      valid_school_teacher_name: null,
      valid_school_teacher_date: null,
      valid_school_teacher_signature: null,
      valid_school_principal_name: null,
      valid_school_principal_date: null,
      valid_school_principal_signature: null,

      responsibilities: [
        "Responsible for their minor(s) for the entire time they are on the University of Maryland, College Park campus, including inside the Armory.",
        "Required to be aware of their student’s location within the Armory at all times.",
        "Required to ensure that their students remain inside the Armory at all times unless accompanied by their chaperone(s).",
        "Responsible for their student(s) behavior and are required to ensure that their student(s) adhere to Bitcamp’s Terms and Code of Conduct.",
        "Required to remain in the Armory as long as their student(s) are there.",
        "Responsible for ensuring that their student(s) do not remain in the Armory after 12am (midnight) and do not arrive before 7am.",
        "Required to alert organizers, police, EMT, or fire marshal in case of an emergency.",
        "Responsible for knowing their student(s) food allergies and medical conditions, as well as ensuring that their health needs are being met.",
      ],

      school_class: "typeahead",

      valid_waiverType: null,

      school_year_options: [
        { value: "", text: "Select one...", disabled: true },
        { value: "less than high school", text: "Less than Secondary / High School" },
        { value: "high school", text: "Secondary / High School" },
        {
          value: "undergrad 2 year",
          text: "Undergraduate University (2 year - community college or similar)",
        },
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

      no_transport_unis: ["The University of Maryland, College Park"],

      // transportation_options: [
      //   {
      //     value: "bus",
      //     text: "Bus",
      //   },
      //   {
      //     value: "train",
      //     text: "Train",
      //   },
      //   {
      //     value: "metro",
      //     text: "Metro",
      //   },
      //   {
      //     value: "uber",
      //     text: "Uber",
      //   },
      // ],

      country_options: [{ value: "", text: "Select one...", disabled: true }, ...country_list],

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
      ],
      transport_select: [],
    };
  },

  mounted() {
    this.today = new Date().toISOString().split("T")[0];
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

      document.getElementsByClassName("typeahead")[0].setAttribute("autocomplete", "off");

      // document.getElementsByClassName("pac-container")[0].setAttribute("data-tap-disabled", "true");
    });
  },

  methods: {
    resetTransport() {
      this.transport_select = [];
      this.form.transport_deposit = null;
    },
    atNoTransportUnis() {
      return this.no_transport_unis.includes(this.form.school);
    },
    selectedQuantumTrack() {
      return this.form.track_selected === "quantum";
    },
    agreeToRecruitment() {
      return ["yes fte", "yes both", "yes intern"].includes(this.form.recruit);
    },
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
        value: this.form.email,
      });
    },
    showErrorToast() {
      this.$bvToast.toast(`Something went wrong. Are you sure you filled everything out?`, {
        toaster: "b-toaster-top-center",
        solid: true,
        appendToast: false,
        noCloseButton: true,
        variant: "danger",
      });
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
          diet_string += ",";
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
          ethnicity_string += ",";
        }
        ethnicity_string = ethnicity_string + "other(" + this.ethnicity_other_text + ")";
      }

      return ethnicity_string;
    },
    createHeardFromString() {
      let heard_from_string = this.heard_from_select.join(",");

      if (this.heard_from_other && this.heard_from_other_text != "") {
        if (heard_from_string != "") {
          heard_from_string += ",";
        }
        heard_from_string = heard_from_string + "other(" + this.heard_from_other_text + ")";
      }

      return heard_from_string;
    },
    createTransportString() {
      return this.transport_select.join(",");
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
      console.log(this.form);
      if (this.formCheck()) {
        // prevent blacklisted hackers from registering
        if (this.form.name === "Auran Shereef" || this.form.name === "Monte James") {
          this.$router.push({ path: "thanks" });
          return;
        }

        // time taken to fill out form in seconds
        this.form.time_taken = (Date.now() - this.form_start) / 1000;
        const phoneNumber = parsePhoneNumber(this.form.phone, DEFAULT_COUNTRY_PHONE);
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
            key: "hf-other",
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

        this.form.red = survey_count["r"];
        this.form.green = survey_count["g"];
        this.form.blue = survey_count["b"];

        this.form.dietary_restrictions = this.createDietaryRestrictionString();
        this.form.ethnicity = this.createEthnicityString();
        this.form.heard_from = this.createHeardFromString();
        this.form.transport_select = this.createTransportString();

        //modify endpoint based on if minor or not
        const isMinor = this.form.age.length > 0 && Number(this.form.age) < 18;
        const endpoint = isMinor ? "register_minor" : "register";

        const resp = await this.performPostRequest(
          this.getEnvVariable("BACKEND_ENDPOINT"),
          endpoint,
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
          // this.showErrorToast();
          this.showErrorToastCustom("error1");
        }
      } else {
        this.showErrorToastCustom("error2");
        // this.showErrorToast();
      }
    },
    // logic goes here so feedback is only shown after submission
    formCheck() {
      let valid_form = true;

      this.form.name = `${this.form.first_name} ${this.form.last_name}`;

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

      const phoneNumber = parsePhoneNumber(this.form.phone, DEFAULT_COUNTRY_PHONE);
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

      if (this.ethnicity_other && !this.ethnicity_other_text.trim()) {
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

      if (!this.atNoTransportUnis() && this.form.transport === null) {
        this.valid_transport = false;
        valid_form = false;
      } else {
        this.valid_transport = null;
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

      if (this.form.hack_count.length === 0 || parseInt(this.form.hack_count) < 0) {
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

      if (this.heard_from_other && !this.heard_from_other_text.trim()) {
        this.valid_heard_from = false;
        valid_form = false;
      }

      if (this.createDietaryRestrictionString().length === 0) {
        this.valid_diet = false;
        valid_form = false;
      } else {
        this.valid_diet = null;
      }

      if (this.diet_other && !this.diet_other_text.trim()) {
        this.valid_diet = false;
        valid_form = false;
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

      if (this.selectedQuantumTrack() && this.form.quantum_track === null) {
        this.valid_quantum_survey = false;
        valid_form = false;
      } else {
        this.valid_quantum_survey = null;
      }

      if (this.form.beginner_content_opt_in === null) {
        this.valid_beginner_survey = false;
        valid_form = false;
      } else {
        this.valid_beginner_survey = null;
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

      // If the applicant is a minor, validate the waiver type selection.
      if (this.form.age.length > 0 && Number(this.form.age) < 18) {
        if (!this.form.waiverType) {
          this.valid_waiverType = false;
          valid_form = false;
        } else {
          this.valid_waiverType = null;
          // Now validate only the fields for the selected waiver type.
          if (this.form.waiverType === "chaperone") {
            // Validate Chaperone Agreement fields
            if (!this.form.chap_name) {
              this.valid_chap_name = false;
              valid_form = false;
            } else {
              this.valid_chap_name = null;
            }
            if (!this.form.chap_date) {
              this.valid_chap_date = false;
              valid_form = false;
            } else {
              this.valid_chap_date = null;
            }
            if (!this.form.chap_signature) {
              this.valid_chap_signature = false;
              valid_form = false;
            } else {
              this.valid_chap_signature = null;
            }
            if (!this.form.p_chap_name) {
              this.valid_p_chap_name = false;
              valid_form = false;
            } else {
              this.valid_p_chap_name = null;
            }
            if (!this.form.p_chap_date) {
              this.valid_p_chap_date = false;
              valid_form = false;
            } else {
              this.valid_p_chap_date = null;
            }
            if (!this.form.p_chap_signature) {
              this.valid_p_chap_signature = false;
              valid_form = false;
            } else {
              this.valid_p_chap_signature = null;
            }
          } else if (this.form.waiverType === "school") {
            // Validate School Agreement fields
            if (!this.form.school_minor_name) {
              this.valid_school_minor_name = false;
              valid_form = false;
            } else {
              this.valid_school_minor_name = null;
            }
            if (!this.form.school_minor_date) {
              this.valid_school_minor_date = false;
              valid_form = false;
            } else {
              this.valid_school_minor_date = null;
            }
            if (!this.form.school_minor_signature) {
              this.valid_school_minor_signature = false;
              valid_form = false;
            } else {
              this.valid_school_minor_signature = null;
            }
            if (!this.form.school_teacher_name) {
              this.valid_school_teacher_name = false;
              valid_form = false;
            } else {
              this.valid_school_teacher_name = null;
            }
            if (!this.form.school_teacher_date) {
              this.valid_school_teacher_date = false;
              valid_form = false;
            } else {
              this.valid_school_teacher_date = null;
            }
            if (!this.form.school_teacher_signature) {
              this.valid_school_teacher_signature = false;
              valid_form = false;
            } else {
              this.valid_school_teacher_signature = null;
            }
            if (!this.form.school_principal_name) {
              this.valid_school_principal_name = false;
              valid_form = false;
            } else {
              this.valid_school_principal_name = null;
            }
            if (!this.form.school_principal_date) {
              this.valid_school_principal_date = false;
              valid_form = false;
            } else {
              this.valid_school_principal_date = null;
            }
            if (!this.form.school_principal_signature) {
              this.valid_school_principal_signature = false;
              valid_form = false;
            } else {
              this.valid_school_principal_signature = null;
            }
          }
        }
        if (!this.form.photo_name) {
          this.valid_photo_name = false;
          valid_form = false;
        } else {
          this.valid_photo_name = null;
        }
        if (!this.form.photo_date) {
          this.valid_photo_date = false;
          valid_form = false;
        } else {
          this.valid_photo_date = null;
        }
        if (!this.form.photo_signature) {
          this.valid_photo_signature = false;
          valid_form = false;
        } else {
          this.valid_photo_signature = null;
        }
        if (!this.form.p_photo_name) {
          this.valid_p_photo_name = false;
          valid_form = false;
        } else {
          this.valid_p_photo_name = null;
        }
        if (!this.form.p_photo_date) {
          this.valid_p_photo_date = false;
          valid_form = false;
        } else {
          this.valid_p_photo_date = null;
        }
        if (!this.form.p_photo_signature) {
          this.valid_p_photo_signature = false;
          valid_form = false;
        } else {
          this.valid_p_photo_signature = null;
        }

        if (!this.form.terms_minor_name) {
          this.valid_terms_minor_name = false;
          valid_form = false;
        } else {
          this.valid_terms_minor_name = null;
        }
        if (!this.form.terms_minor_date) {
          this.valid_terms_minor_date = false;
          valid_form = false;
        } else {
          this.valid_terms_minor_date = null;
        }
        if (!this.form.terms_minor_signature) {
          this.valid_terms_minor_signature = false;
          valid_form = false;
        } else {
          this.valid_terms_minor_signature = null;
        }
        if (!this.form.terms_parent_name) {
          this.valid_terms_parent_name = false;
          valid_form = false;
        } else {
          this.valid_terms_parent_name = null;
        }
        if (!this.form.terms_parent_date) {
          this.valid_terms_parent_date = false;
          valid_form = false;
        } else {
          this.valid_terms_parent_date = null;
        }
        if (!this.form.terms_parent_signature) {
          this.valid_terms_parent_signature = false;
          valid_form = false;
        } else {
          this.valid_terms_parent_signature = null;
        }
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
      // 5MB upload limit
      if (this.form.resume.size > 1024 * 1024 * 5) {
        this.showErrorToastCustom("Please ensure that your resume file size does not exceed 5MB.");
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
          "_" +
          this.form.last_name
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
          "_" +
          this.form.last_name
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
        this.showErrorToastCustom("Oops! We couldn't upload your resume, try again later!");
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
        this.showErrorToastCustom("Oops! We couldn't upload your resume, try again later!");
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
.input-group > .typeahead {
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
input[type="checkbox"]:hover ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.3);
}

input[type="checkbox"]:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.3);
}

input[type="checkbox"]:checked ~ .custom-control-label::before {
  background-color: var(--light-orange);
  border-color: grey;
}

/* disabled checkbox */
input[type="checkbox"]:disabled ~ .custom-control-label::before {
  box-shadow: none !important;
  background-color: white;
  border-color: lightgrey;
}

input[type="checkbox"]:disabled:checked ~ .custom-control-label::before {
  background-color: rgba(255, 165, 0, 0.4) !important;
}

/* radio button */
input[type="radio"]:checked ~ .custom-control-label::after {
  background-image: none;
  transform: scale(0.7);
  border-radius: 50%;
  box-shadow: 0px 0px 0px 10px inset var(--light-orange);
}

input[type="radio"]:checked ~ .custom-control-label::before {
  background-color: white;
  border-color: orange;
}

input[type="radio"]:hover ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.3);
  background-color: rgba(255, 165, 0, 0.3);
}

input[type="radio"]:focus ~ .custom-control-label::before {
  box-shadow: none;
}

input[type="radio"]:active ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.1rem rgba(255, 165, 0, 0.5);
  background-color: rgba(255, 165, 0, 0.5);
}

/* disabled radio button */
input[type="radio"]:disabled:hover ~ .custom-control-label::before {
  box-shadow: none;
}

input[type="radio"]:disabled ~ .custom-control-label::before {
  border-color: lightgrey;
  background-color: white;
}

input[type="radio"]:disabled:checked ~ .custom-control-label::before {
  background-color: white !important;
  border-color: rgba(255, 165, 0, 0.4);
}

input[type="radio"]:disabled:checked ~ .custom-control-label::after {
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

.note {
  font-size: 0.75rem;
  text-align: left !important;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
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

  background: radial-gradient(92.62% 25% at 33.31% 0%, #ffaa6c 0.01%, #ff6a37 50.52%, #ff6a37 100%);
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
