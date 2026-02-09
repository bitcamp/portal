<template>
  <div class="register-page">
    <h1 class="page-title">
      Register for Bitcamp 2026
    </h1>

    <p class="page-subtitle">
      Questions? Email us at
      <a href="mailto:hello@bit.camp">hello@bit.camp</a>. You can also learn more at
      <a href="https://bit.camp" target="_blank" rel="noopener">bit.camp</a>!
    </p>

    <div class="stepper">
      <div v-for="step in steps" :key="step.number" class="stepper-item" :class="{
        active: step.number === 6,
        completed: step.number < 6,
        inactive: step.number > 6
      }">
        <div class="stepper-circle">
          <span v-if="step.number < 6" class="checkmark">✓</span>
          <span v-else>{{ step.number }}</span>
        </div>
        <div class="stepper-label">
          {{ step.label }}
        </div>
      </div>
    </div>

    <hr>
    <b-form @submit.prevent="handleNext">
      <div class="info-box">
        <div class="info-header" @click="togglePhoto">
          <span class="title header-title">Photography Consent Form</span>
          <img :src="openImg" class="arrow" :class="{ open: photoIsOpen }" @click.stop="togglePhoto">
        </div>

        <div v-if="photoIsOpen" class="info-content">
          <p>
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
        </div>
      </div>

      <div v-if="photoIsOpen">
        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Minor Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-photo-name" v-model="formData.photo_name" :state="showState('photo_name')"
              @input="touched.photo_name = true" />
            <b-form-invalid-feedback :state="showState('photo_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="photo-date" v-model="formData.photo_date" placeholder="MM/DD/YYYY"
              :state="showState('photo_date')" @input="touched.photo_date = true" />
            <b-form-invalid-feedback :state="showState('photo_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-photo-signature" v-model="formData.photo_signature"
              :state="showState('photo_signature')" @input="touched.photo_signature = true" />
            <b-form-invalid-feedback :state="showState('photo_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Parent/Guardian Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-p-photo-name" v-model="formData.p_photo_name" :state="showState('p_photo_name')"
              @input="touched.p_photo_name = true" />
            <b-form-invalid-feedback :state="showState('p_photo_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="p-photo-date" v-model="formData.p_photo_date" placeholder="MM/DD/YYYY"
              :state="showState('p_photo_date')" @input="touched.p_photo_date = true" />
            <b-form-invalid-feedback :state="showState('p_photo_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-p-photo-signature" v-model="formData.p_photo_signature"
              :state="showState('p_photo_signature')" @input="touched.p_photo_signature = true" />
            <b-form-invalid-feedback :state="showState('p_photo_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>
        <br>
      </div>

      <div class="info-box">
        <div class="info-header" @click="toggleStu">
          <span class="title header-title">Student Organization Release and Informed Consent Form</span>
          <img :src="openImg" class="arrow" :class="{ open: stuIsOpen }" @click.stop="toggleStu">
        </div>

        <div v-if="stuIsOpen" class="info-content">
          <p>
            I am a participant of Bitcamp 2026 (Activity), a student organization recognized by
            the Stamp Student Union (Union) at the University of Maryland, College Park (University).
            I desire to participate in the Activity from April 10, 2026 - April 12, 2026 including. In
            consideration of being permitted to participate in such Activity, I, for myself, my heirs,
            personal representative(s) and assigns hereby represent and agree as follows:
            <br>
            <br>
          <ol>
            <li>
              I fully recognize and understand that there are risks and hazards, minor and serious, associated
              with participation in the Activity, ranging from scrapes, bruises, lacerations, broken bones to
              concussions,
              spinal cord injuries, paralysis and, even, death. These injuries may result from crashing with other
              participants, being hit by equipment, or environmental conditions.
            </li>
            <li>
              I understand that protective equipment, including but not limited to, headgear, pads, eyewear and
              mouthpieces
              may be recommended for the safety and protection of participants, and I agree to wear such equipment when
              participating in the Activity. However, I understand that wearing such equipment will not eliminate the
              risks of
              participation.
            </li>
            <li>
              To the extent they exist, I understand that the rules and regulations of the Activity's organizers are
              designed,
              in part, for the safety and protection of participants and I agree to abide by those rules and
              regulations.
            </li>
            <li>
              I understand that any physical activity requires a minimum level of fitness for safe participation. I also
              understand that the University advises that participants in the Activity carry personal health and
              accident
              insurance. I further understand that the University and Bitcamp 2026 do not provide medical, health or
              other
              insurance for participants in the Activity.
            </li>
            <li>
              In the event of a medical emergency, I hereby give my consent to emergency transportation and medical
              treatment
              arising out of or related to participation in the Activity. I understand that I am solely responsible for
              any
              and all
              costs associated with any medical care received.
            </li>
            <li>
              Knowing the dangers, hazards and risks associated with student organization activities, I voluntarily
              assume all
              responsibility and risk of loss, damage, illness and/or injury to my person or property in any way
              associated
              with
              my participation in the Activity.
            </li>
            <li>
              To the fullest extent permitted by law, I hereby release and forever discharge, and agree to indemnify and
              hold
              harmless the State of Maryland, the University of Maryland, and their departments, officers, agents,
              employees,
              and
              volunteers (Released Parties) and Bitcamp 2026 from and against any and all liabilities, claims, demands,
              causes
              of
              action, costs and expenses, (including attorneys' fees and related litigation costs) incurred by any of
              the
              Released Parties arising
              out of or relating to my participation in or involvement with student organization activities, or use of
              University equipment and
              facilities, including travel thereto and therefrom, whether due to the negligence, default or other action
              or
              inaction of any
              person or entity, including the Released Parties.
            </li>
          </ol>
          I, _________________________________________, CERTIFY THAT I AM BETWEEN THE AGES OF 14 AND 18 AND THAT I HAVE
          READ
          AND
          FULLY UNDERSTAND THIS RELEASE AND INFORMED CONSENT FORM AND I SIGN IT VOLUNTARILY WITH FULL KNOWLEDGE OF ITS
          SIGNIFICANCE.
          AS A MINOR, THE SIGNATURE BELOW IS THAT OF A PARENT OR LEGAL GUARDIAN AUTHORIZED TO SIGN ON MY BEHALF.
          </p>
        </div>
      </div>

      <div v-if="stuIsOpen">
        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Minor Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-terms-minor-name" v-model="formData.terms_minor_name"
              :state="showState('terms_minor_name')" @input="touched.terms_minor_name = true" />
            <b-form-invalid-feedback :state="showState('terms_minor_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="terms-minor-date" v-model="formData.terms_minor_date" placeholder="MM/DD/YYYY"
              :state="showState('terms_minor_date')" @input="touched.terms_minor_date = true" />
            <b-form-invalid-feedback :state="showState('terms_minor_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-terms-minor-signature" v-model="formData.terms_minor_signature"
              :state="showState('terms_minor_signature')" @input="touched.terms_minor_signature = true" />
            <b-form-invalid-feedback :state="showState('terms_minor_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Parent/Guardian Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-terms-parent-name" v-model="formData.terms_parent_name"
              :state="showState('terms_parent_name')" @input="touched.terms_parent_name = true" />
            <b-form-invalid-feedback :state="showState('terms_parent_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="terms-parent-date" v-model="formData.terms_parent_date" placeholder="MM/DD/YYYY"
              :state="showState('terms_parent_date')" @input="touched.terms_parent_date = true" />
            <b-form-invalid-feedback :state="showState('terms_parent_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="terms-parent-signature" v-model="formData.terms_parent_signature"
              :state="showState('terms_parent_signature')" @input="touched.terms_parent_signature = true" />
            <b-form-invalid-feedback :state="showState('terms_parent_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>
        <br>
      </div>

      <div class="info-box">
        <div class="info-header" @click="toggleCond">
          <span class="title header-title">Conditional Form Question</span>
          <img :src="openImg" class="arrow" :class="{ open: condIsOpen }" @click.stop="toggleCond">
        </div>

        <div v-if="condIsOpen" class="info-content">
          <p>
            <b-form-group>
              <template #label>
                <span>Please select your waiver type: <span class="text-danger">*</span></span>
              </template>
              <b-form-radio-group v-model="formData.waiverType" name="chaperone" @click="touched.waiverType = true">
                <b-form-radio value="chaperone">
                  I have a chaperone
                </b-form-radio>
                <b-form-radio value="school">
                  I'm coming with my school
                </b-form-radio>
              </b-form-radio-group>
              <b-form-invalid-feedback :state="showState('waiverType')">
                Select an option
              </b-form-invalid-feedback>
            </b-form-group>
          </p>

          <div v-if="formData.waiverType === 'chaperone'">
            <h4 style="text-decoration: underline">
              Chaperone Agreement Form
            </h4>
            <h5>Chaperone Responsibilities</h5>
            <p>
            <ul>
              <li>
                Responsible for their minor(s) the entire time they are on the University of Maryland,
                College Park campus, including inside the Armory.
              </li>
              <li>Required to be aware of their student's location within the Armory at all times.</li>
              <li>
                Required to ensure that their students remain inside the Armory at all times unless
                accompanied by their chaperone(s).
              </li>
              <li>
                Responsible for their student(s) behavior and are required to ensure that their
                student(s) adhere to Bitcamp's Terms and Code of Conduct.
              </li>
              <li>Required to remain in the Armory as long as their student(s) are there.</li>
              <li>
                Responsible for ensuring that their student(s) do not remain in the Armory after 12am
                (midnight) and do not arrive before 7am.
              </li>
              <li>
                Required to alert organizers, police, EMT, or fire marshal in case of an emergency.
              </li>
              <li>
                Responsible for knowing their student(s) food allergies and medical conditions, as well
                as ensuring that their health needs are being met.
              </li>
            </ul>
            </p>
          </div>

          <div v-else-if="formData.waiverType === 'school'">
            <h4 style="text-decoration: underline">
              School Agreement Form
            </h4>
            <p>
              ________________________________________________ <strong>[Chaperone]</strong> is
              authorized by ______________________________________________
              <strong>[School]</strong> to be a chaperone for up to fifteen (15) minors. He/She has
              been background checked and is cleared to legally take responsibility for students on
              off‐campus trips. The school also understands that neither Bitcamp, nor the University
              of Maryland, will be taking legal custody of your students during the course of Bitcamp
              2026.
            </p>
          </div>
        </div>
      </div>

      <div v-if="condIsOpen && formData.waiverType === 'chaperone'">
        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Minor Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-chap-name" v-model="formData.chap_name" :state="showState('chap_name')"
              @input="touched.chap_name = true" />
            <b-form-invalid-feedback :state="showState('chap_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="chap-date" v-model="formData.chap_date" placeholder="MM/DD/YYYY"
              :state="showState('chap_date')" @input="touched.chap_date = true" />
            <b-form-invalid-feedback :state="showState('chap_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-chap-signature" v-model="formData.chap_signature"
              :state="showState('chap_signature')" @input="touched.chap_signature = true" />
            <b-form-invalid-feedback :state="showState('chap_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Chaperone Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-p-chap-name" v-model="formData.p_chap_name" :state="showState('p_chap_name')"
              @input="touched.p_chap_name = true" />
            <b-form-invalid-feedback :state="showState('p_chap_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="p-chap-date" v-model="formData.p_chap_date" placeholder="MM/DD/YYYY"
              :state="showState('p_chap_date')" @input="touched.p_chap_date = true" />
            <b-form-invalid-feedback :state="showState('p_chap_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-p-chap-signature" v-model="formData.p_chap_signature"
              :state="showState('p_chap_signature')" @input="touched.p_chap_signature = true" />
            <b-form-invalid-feedback :state="showState('p_chap_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>
      </div>

      <div v-else-if="condIsOpen && formData.waiverType === 'school'">
        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Minor Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-school-minor-name" v-model="formData.school_minor_name"
              :state="showState('school_minor_name')" @input="touched.school_minor_name = true" />
            <b-form-invalid-feedback :state="showState('school_minor_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="school-school-minor-date" v-model="formData.school_minor_date" placeholder="MM/DD/YYYY"
              :state="showState('school_minor_date')" @input="touched.school_minor_date = true" />
            <b-form-invalid-feedback :state="showState('school_minor_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Minor Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-school-minor-signature" v-model="formData.school_minor_signature"
              :state="showState('school_minor_signature')" @input="touched.school_minor_signature = true" />
            <b-form-invalid-feedback :state="showState('school_minor_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Teacher Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-school-teacher-name" v-model="formData.school_teacher_name"
              :state="showState('school_teacher_name')" @input="touched.school_teacher_name = true" />
            <b-form-invalid-feedback :state="showState('school_teacher_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="school-school-teacher-date" v-model="formData.school_teacher_date"
              placeholder="MM/DD/YYYY" :state="showState('school_teacher_date')"
              @input="touched.school_teacher_date = true" />
            <b-form-invalid-feedback :state="showState('school_teacher_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Teacher Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-school-teacher-signature" v-model="formData.school_teacher_signature"
              :state="showState('school_teacher_signature')" @input="touched.school_teacher_signature = true" />
            <b-form-invalid-feedback :state="showState('school_teacher_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-6">
            <template #label>
              Principal Full Name <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-school-principal-name" v-model="formData.school_principal_name"
              :state="showState('school_principal_name')" @input="touched.school_principal_name = true" />
            <b-form-invalid-feedback :state="showState('school_principal_name')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group class="col-md-6">
            <template #label>
              Date <span class="text-danger">*</span>
            </template>
            <b-form-input id="school-school-principal-date" v-model="formData.school_principal_date"
              placeholder="MM/DD/YYYY" :state="showState('school_principal_date')"
              @input="touched.school_principal_date = true" />
            <b-form-invalid-feedback :state="showState('school_principal_date')">
              Please enter today's date
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>

        <b-form-row>
          <b-form-group class="col-md-12">
            <template #label>
              Principal Signature <span class="text-danger">*</span>
            </template>
            <b-form-input id="input-school-principal-signature" v-model="formData.school_principal_signature"
              :state="showState('school_principal_signature')" @input="touched.school_principal_signature = true" />
            <b-form-invalid-feedback :state="showState('school_principal_signature')">
              Required field
            </b-form-invalid-feedback>
          </b-form-group>
        </b-form-row>
      </div>

      <div class="actions">
        <b-button type="button" class="submit-btn prev-btn" @click="handlePrevious">
          <b-icon icon="arrow-left" /> Previous
        </b-button>
        <b-button type="submit" class="submit-btn next-btn">
          Next Step
          <b-icon icon="arrow-right" class="ml-1" />
        </b-button>
      </div>
    </b-form>
  </div>
  </b-col>
  </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin, LinkPlugin } from "bootstrap-vue";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default {
  name: "MinorForms",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    const sixthPageRequiredFields = [
      "photo_name",
      "photo_date",
      "photo_signature",
      "p_photo_name",
      "p_photo_date",
      "p_photo_signature",
      "terms_minor_name",
      "terms_minor_date",
      "terms_minor_signature",
      "terms_parent_name",
      "terms_parent_date",
      "terms_parent_signature",
      "waiverType",
      "chap_name",
      "chap_date",
      "chap_signature",
      "p_chap_name",
      "p_chap_date",
      "p_chap_signature",
      "school_minor_name",
      "school_minor_date",
      "school_minor_signature",
      "school_teacher_name",
      "school_teacher_date",
      "school_teacher_signature",
      "school_principal_name",
      "school_principal_date",
      "school_principal_signature",
    ];

    return {
      sixthPageRequiredFields: [
        "photo_name",
        "photo_date",
        "photo_signature",
        "p_photo_name",
        "p_photo_date",
        "p_photo_signature",
        "terms_minor_name",
        "terms_minor_date",
        "terms_minor_signature",
        "terms_parent_name",
        "terms_parent_date",
        "terms_parent_signature",
        "waiverType",
        "chap_name",
        "chap_date",
        "chap_signature",
        "p_chap_name",
        "p_chap_date",
        "p_chap_signature",
        "school_minor_name",
        "school_minor_date",
        "school_minor_signature",
        "school_teacher_name",
        "school_teacher_date",
        "school_teacher_signature",
        "school_principal_name",
        "school_principal_date",
        "school_principal_signature",
      ],

      touched: Object.fromEntries([...sixthPageRequiredFields].map((key) => [key, false])),
      steps: [
        { number: 1, label: "Personal Info" },
        { number: 2, label: "Track & Experience" },
        { number: 3, label: "Attendance Details" },
        { number: 4, label: "Campfire Games" },
        { number: 5, label: "Team Matching" },
        { number: 6, label: "Minor Waivers" },
        { number: 7, label: "Finalize & Submit" },
      ],

      stuIsOpen: false,
      photoIsOpen: false,
      condIsOpen: false,
      openImg: require('@/assets/dropdown-icons/up-arrow.svg')
    };
  },

  computed: {
    validations() {
      const req = (v) => v !== null && v !== undefined && v.toString().trim().length > 0;

      return {
        photo_name: req(this.formData.photo_name),
        photo_date: req(this.formData.photo_date) && this.isValidDateFormat(this.formData.photo_date),
        photo_signature: req(this.formData.photo_signature),
        p_photo_name: req(this.formData.p_photo_name),
        p_photo_date: req(this.formData.p_photo_date) && this.isValidDateFormat(this.formData.p_photo_date),
        p_photo_signature: req(this.formData.p_photo_signature),
        terms_minor_name: req(this.formData.terms_minor_name),
        terms_minor_date: req(this.formData.terms_minor_date) && this.isValidDateFormat(this.formData.terms_minor_date),
        terms_minor_signature: req(this.formData.terms_minor_signature),
        terms_parent_name: req(this.formData.terms_parent_name),
        terms_parent_date: req(this.formData.terms_parent_date) && this.isValidDateFormat(this.formData.terms_parent_date),
        terms_parent_signature: req(this.formData.terms_parent_signature),
        waiverType: req(this.formData.waiverType),
        chap_name: this.formData.waiverType === "chaperone" ? req(this.formData.chap_name) : true,
        chap_date: this.formData.waiverType === "chaperone" ? req(this.formData.chap_date) && this.isValidDateFormat(this.formData.chap_date) : true,
        chap_signature: this.formData.waiverType === "chaperone" ? req(this.formData.chap_signature) : true,
        p_chap_name: this.formData.waiverType === "chaperone" ? req(this.formData.p_chap_name) : true,
        p_chap_date: this.formData.waiverType === "chaperone" ? req(this.formData.p_chap_date) && this.isValidDateFormat(this.formData.p_chap_date) : true,
        p_chap_signature: this.formData.waiverType === "chaperone" ? req(this.formData.p_chap_signature) : true,
        school_minor_name: this.formData.waiverType === "school" ? req(this.formData.school_minor_name) : true,
        school_minor_date: this.formData.waiverType === "school" ? req(this.formData.school_minor_date) && this.isValidDateFormat(this.formData.school_minor_date) : true,
        school_minor_signature: this.formData.waiverType === "school" ? req(this.formData.school_minor_signature) : true,
        school_teacher_name: this.formData.waiverType === "school" ? req(this.formData.school_teacher_name) : true,
        school_teacher_date: this.formData.waiverType === "school" ? req(this.formData.school_teacher_date) && this.isValidDateFormat(this.formData.school_teacher_date) : true,
        school_teacher_signature: this.formData.waiverType === "school" ? req(this.formData.school_teacher_signature) : true,
        school_principal_name: this.formData.waiverType === "school" ? req(this.formData.school_principal_name) : true,
        school_principal_date: this.formData.waiverType === "school" ? req(this.formData.school_principal_date) && this.isValidDateFormat(this.formData.school_principal_date) : true,
        school_principal_signature: this.formData.waiverType === "school" ? req(this.formData.school_principal_signature) : true,
      };
    },
  },

  methods: {
    getToday() {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // 0-indexed months
      const day = String(today.getDate()).padStart(2, '0');
      const year = today.getFullYear();
      return `${month}/${day}/${year}`; // "MM/DD/YYYY"
    },

    isValidDateFormat(dateStr) {
      if (!dateStr) return false;

      const parts = dateStr.split('/');
      if (parts.length !== 3) return false;

      const [monthStr, dayStr, yearStr] = parts;
      const month = Number(monthStr);
      const day = Number(dayStr);
      const year = Number(yearStr);

      if (isNaN(month) || isNaN(day) || isNaN(year)) return false;

      if (month < 1 || month > 12) return false;
      if (day < 1 || day > 31) return false;
      if (yearStr.length !== 4) return false;

      const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (day > daysInMonth[month - 1]) return false;

      const today = this.getToday();
      return dateStr == today;
    },

    showInvalid(field) {
      return this.touched[field] === true && this.validations[field] === false;
    },

    showState(field) {
      if (!this.touched[field]) return null;
      return this.validations[field] === true ? true : false;
    },

    validateForm() {
      return this.sixthPageRequiredFields.every(
        (field) => this.validations[field] === true);
    },

    handleNext(event) {
      // console.log("TOUCHED", this.touched);
      // console.log("FORM DATA", this.formData);

      event.preventDefault();

      this.sixthPageRequiredFields.forEach((key) => {
        this.touched[key] = true;
      });

      if (this.validateForm()) {
        this.$emit("next");
      } else {
        this.$bvToast.toast("Please fill out all required fields", {
          toaster: "b-toaster-top-center",
          solid: true,
          appendToast: false,
          noCloseButton: true,
          variant: "danger",
        });
      }
    },

    handlePrevious() {
      this.$emit("previous");
    },

    toggleStu() {
      this.stuIsOpen = !this.stuIsOpen;
    },

    togglePhoto() {
      this.photoIsOpen = !this.photoIsOpen;
    },

    toggleCond() {
      this.condIsOpen = !this.condIsOpen;
    }
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
  opacity: 0.95;
  margin-bottom: 30px;
  color:#555;
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
  background: #DEDEDE;
  z-index: -1;
}

.stepper-item.completed:not(:last-child)::after {
  background: #f97345 !important;
}

.stepper-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #DEDEDE;
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

/* --- FORM & PROJECT STYLES --- */
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

.header {
  margin-top: 2rem;
  font-weight: 700;
}

.section-divider {
  height: 2px;
  background-color: #ffeac7;
  margin: 0.5rem auto 1.5rem;
  border-radius: 2px;
}

::v-deep .custom-control.custom-radio {
  align-items: center;
}

::v-deep .custom-control.custom-radio .custom-control-label {
  margin-bottom: 0;
  line-height: 1.2;
}

::v-deep .custom-control.custom-radio .custom-control-label::before,
::v-deep .custom-control.custom-radio .custom-control-label::after {
  top: 45%;
  transform: translateY(-55%);
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

.header-title {
  font-family: "Aleo", serif;
  font-size: 20px;
  color: white;
  font-weight: 600;
}

.info-box {
  margin-bottom: 1rem;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  background-color: #FF793F;
}

.info-content {
  padding: 25px 25px 10px 25px;
  border-top: 1px solid #eee;
  background-color: white;
}

.arrow {
  width: 16px;
  height: 16px;
  transform: rotate(180deg);
}

.arrow.open {
  transform: rotate(0deg);
}
</style>
