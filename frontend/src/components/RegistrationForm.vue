<template>
  <b-row>
    <b-col md="1" />
    <b-col md="10">
      <br />
      <h1 style="text-align: left">Register for Bitcamp 2024</h1>

      <p style="font-size: 0.9rem; opacity: 95%">
        Questions? Contact us at
        <a href="mailto:hello@bit.camp">hello@bit.camp</a> or learn more at
        <a href="https://bit.camp">bit.camp</a>!
      </p>
      <hr />
      <b-form class="registration-form" autocomplete="on" @submit="registerUser">
        <h4>Tell us about yourself!</h4>
        <p class="info">
          Once you register, you'll receive more info about Bitcamp 2024 at the email you provide.
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

        <p class="info" v-if="form.age.length > 0 && form.age > 2 && form.age < 18">
          To attend Bitcamp as a minor, please fill out these
          <a
            href="https://drive.google.com/drive/folders/1Hh98d0fhBS7RfUGwFsOf33wBE7QGhRpe"
            target="_blank"
            >minors forms</a
          >
          and email them to <a href="mailto:minors@bit.camp">minors@bit.camp</a>.*
        </p>

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
              placeholder="University of Maryland at College Park"
              :data="university_options"
              noResultsInfo="No results found."
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
              placeholder="Upload Resume"
              drop-placeholder="Drop file here..."
              :state="valid_resume"
              @input="upload"
            />
            <b-form-invalid-feedback :state="valid_resume">
              We couldn't upload your resume. Try again later, or check that you entered your name
              first!
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <!-- Citizenship question -->
        <b-form-row>
          <b-form-group
            id="input-group-citizen"
            label="Are you a US citizen?"
            label-for="input-citizen"
            class="col-md-7"
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
              <b-form-radio value="yes"> Yes </b-form-radio>
              <b-form-radio value="no"> No </b-form-radio>
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

        <div v-show="!no_transport_unis.includes(form.school)">
          <hr />
          <h4>Travel and Transportation</h4>
          <b-form-group
            label="Would you need travel assistance to the hackathon?*"
            label-for="transport-bool"
          >
            <b-form-radio-group
              id="transport-bool"
              v-model="form.transport"
              :state="valid_transport"
            >
              <b-form-radio v-bind:value="true">Yes</b-form-radio>
              <b-form-radio v-bind:value="false">No</b-form-radio>
            </b-form-radio-group>
            <b-form-invalid-feedback :state="valid_transport">
              Please select an answer
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            v-show="form.transport"
            label="What is your preferred method of transportation assistance?*"
            label-for="transport-options"
          >
            <b-form-group
              id="transport-options"
              v-slot="{ ariaDescribedby }"
              class="mt-2 mb-1"
              :state="valid_transport_options"
            >
              <b-form-checkbox
                v-for="option in transportation_options"
                :key="option.value"
                v-model="form.transportation_select"
                :value="option.value"
                :aria-describedby="ariaDescribedby"
                :state="valid_transport_options"
                name="flavour-3a"
              >
                {{ option.text }}
              </b-form-checkbox>
              <b-form-invalid-feedback :state="valid_transport_options">
                Please select an option
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group
              label="Would you be willing to pay a small, refundable deposit to secure your seat on any method of travel assistance?*"
              label-for="transport-deposit"
            >
              <p class="note">If you are in attendance, we will refund your deposit</p>
              <b-form-radio-group
                id="transport-deposit"
                v-model="form.transport_deposit"
                :state="valid_transport_deposit"
              >
                <b-form-radio v-bind:value="true">Yes</b-form-radio>
                <b-form-radio v-bind:value="false">No</b-form-radio>
              </b-form-radio-group>
              <b-form-invalid-feedback :state="valid_transport_deposit">
                Please select an answer
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
        <b-form-group class="font-weight-bold" label="What is your favorite season?*">
          <b-form-radio-group
            id="survey-1"
            v-model="form.selected_survey_1"
            class="font-weight-normal pt-2"
            :state="valid_survey_1"
          >
            <b-form-radio value="r"> Summer ☀️ </b-form-radio>
            <b-form-radio value="r1"> Spring ⚡ </b-form-radio>
            <b-form-radio value="g"> Fall 🍁 </b-form-radio>
            <b-form-radio value="b"> Winter ❄️ </b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_1">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="How early do you finish classwork?*">
          <b-form-radio-group
            id="survey-2"
            v-model="form.selected_survey_2"
            class="font-weight-normal pt-2"
            :state="valid_survey_2"
          >
            <b-form-radio value="b">
              The minute before it’s due. I like to live life on the edge
            </b-form-radio>
            <b-form-radio value="r"> As soon as possible, I’m a machine </b-form-radio>
            <b-form-radio value="g"> Relaxingly, I spread the work out until its due </b-form-radio>
            <b-form-radio value="b1"> Huh!?! I had classwork? </b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_2">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="Would you rather never be able to...*">
          <b-form-radio-group
            id="survey-3"
            v-model="form.selected_survey_3"
            class="font-weight-normal pt-2"
            :state="valid_survey_3"
          >
            <b-form-radio value="b"> Listen to music 🎵 </b-form-radio>
            <b-form-radio value="g"> Watch TV 📺 </b-form-radio>
            <b-form-radio value="r"> Eat junk food 🍕 </b-form-radio>
            <b-form-radio value="r1"> Use your phone to text and call 📱 </b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_3">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="What is your go to coffee order?*">
          <b-form-radio-group
            id="survey-4"
            v-model="form.selected_survey_4"
            class="font-weight-normal pt-2"
            :state="valid_survey_4"
          >
            <b-form-radio value="g"> Straight black coffee </b-form-radio>
            <b-form-radio value="b"> Anything with pumpkin spice or matcha in it </b-form-radio>
            <b-form-radio value="r"> As long as it has enough sugar to taste good </b-form-radio>
            <b-form-radio value="g1"> Something new every time I order </b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_4">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="font-weight-bold" label="What is your favorite thing about Bitcamp?*">
          <b-form-radio-group
            id="survey-5"
            v-model="form.selected_survey_5"
            class="font-weight-normal pt-2"
            :state="valid_survey_5"
          >
            <b-form-radio value="r"> Hacking </b-form-radio>
            <b-form-radio value="g"> Free stuff </b-form-radio>
            <b-form-radio value="b"> Late night shenanigans </b-form-radio>
            <b-form-radio value="g1"> First time, I'll find out! </b-form-radio>
          </b-form-radio-group>
          <b-form-invalid-feedback :state="valid_survey_5">
            Please select an answer
          </b-form-invalid-feedback>
        </b-form-group>

        <hr />
        <!-- T-Shirt Size -->
        <h4 class="mb-2">Select a T-shirt size!</h4>
        <p class="info">
          We've got unisex T-shirts in XS-2XL sizes! Choose whichever size you like, and your very
          own Bitcamp 2024 shirt will be given to you once you arrive at UMD.
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
            />
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
            />
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
              >
                {{ option.text }}
              </b-form-checkbox>
              <b-form-checkbox v-model="heard_from_other"> Other </b-form-checkbox>
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
              <b-form-checkbox v-model="diet_none" @change="uncheckDietaryRestrictions()">
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
              >
                {{ option.text }}
              </b-form-checkbox>
              <b-form-checkbox v-model="diet_other" :disabled="diet_none"> Other </b-form-checkbox>
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
          I have filled out the
          <a
            href="https://drive.google.com/drive/folders/1Hh98d0fhBS7RfUGwFsOf33wBE7QGhRpe"
            target="_blank"
            >minors forms</a
          >
          and emailed them to <a href="mailto:minors@bit.camp">minors@bit.camp</a>.*
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
          I authorize MLH to send me an email where I can further opt into the MLH Hacker, Events,
          or Organizer Newsletters and other communications from MLH.
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
import { BFormTextarea, FormFilePlugin, FormRadioPlugin, IconsPlugin } from "bootstrap-vue";
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
      form: {
        email: this.$route.query.redo != null ? this.$route.query.redo : "",
        phone: "",
        QUANTUM_SELECTED: false,
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
        transport: undefined,
        transportation_select: [],
        transportation_deposit: undefined,
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
      quantum_survey_1: null,
      quantum_survey_2: null,
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

      school_class: "typeahead",

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

      transportation_options: [
        {
          value: "bus",
          text: "Bus",
        },
        {
          value: "train",
          text: "Train",
        },
        {
          value: "metro",
          text: "Metro",
        },
        {
          value: "uber",
          text: "Uber",
        },
      ],

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

      document.getElementsByClassName("typeahead")[0].setAttribute("autocomplete", "off");

      // document.getElementsByClassName("pac-container")[0].setAttribute("data-tap-disabled", "true");
    });
  },

  methods: {
    updateTrack(value) {
      if (value === "quantum") {
        this.form.QUANTUM_SELECTED = true;
      } else {
        this.form.QUANTUM_SELECTED = false;
      }
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

      if (this.form.citizen === undefined) {
        this.form.citizen = null;
      }

      this.valid_transport = this.form.transport !== undefined;
      this.valid_transport_options = this.form.transportation_select.length > 0;
      this.valid_transport_deposit = this.form.transport_deposit !== undefined;
      valid_form =
        valid_form && this && this.valid_transport_options && this.valid_transport_deposit;

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

      if (!this.form.selected_quantum_survey_track && this.form.QUANTUM_SELECTED) {
        this.quantum_survey_1 = false;
        valid_form = false;
      } else {
        this.quantum_survey_1 = null;
      }

      if (!this.form.selected_quantum_survey_guide) {
        this.quantum_survey_2 = false;
        valid_form = false;
      } else {
        this.quantum_survey_2 = null;
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
