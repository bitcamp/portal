<template>
  <div class="register-wrapper">
    <b-row class="justify-content-center">
      <b-col md="12" lg="12">
        <div class="page-content">
          <h1 class="page-title">Register for Bitcamp 2026</h1>

          <p class="page-subtitle">
            Questions? Chat with us in the bottom right hand corner or email
            <a href="mailto:hello@bit.camp">hello@bit.camp</a>. You can also learn more at
            <a href="https://bit.camp" target="_blank" rel="noopener">bit.camp</a>!
          </p>

          <div class="stepper">
            <div
              v-for="step in steps"
              :key="step.number"
              class="stepper-item"
              :class="{ active: step.number === 6 }"
            >
              <div class="stepper-circle">{{ step.number }}</div>
              <div class="stepper-label">{{ step.label }}</div>
            </div>
          </div>

          <hr />

          <b-form @submit.prevent="handleNext">

        <div class="info-box">
            <div class="info-header" @click="toggleStu">
                <span class="title header-title">Student Organization Release and Informed Consent Form</span>
                    <img
                    :src="openImg"
                    class="arrow"
                    :class="{open : stuIsOpen}"
                    @click.stop="toggleStu"
                    />
                </div>

        <div v-if="stuIsOpen" class="info-content">
        <p>
            I am a participant of Bitcamp 2026 (Activity), a student organization recognized by the
            Stamp Student Union (Union) at the University of Maryland, College Park (University). I
            desire to participate in the Activity from April 10, 2026 - April 12, 2026 including. In
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
            Activity's organizers are designed, in part, for the safety and protection of
            participants and I agree to abide by those rules and regulations. <br />
            4. I understand that any physical activity requires a minimum level of fitness for safe
            participation. I also understand that the University advises that participants in the
            Activity carry personal health and accident insurance. I further understand that the
            University and Bitcamp 2026 do not provide medical, health or other insurance for
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
            and Bitcamp 2026 from and against any and all liabilities, claims, demands, causes of
            action, costs and expenses, (including attorneys' fees and related litigation costs)
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
        </div>
    </div>

    <div class="info-box">
            <div class="info-header" @click="togglePhoto">
                <span class="title header-title">Photography Consent Form</span>
                    <img
                    :src="openImg"
                    class="arrow"
                    :class="{open : photoIsOpen}"
                    @click.stop="togglePhoto"
                    />
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
          <template #label> Minor Full Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-minor-name"
            v-model="formData.minor_name"
            @input="touched.minor_name = true"
            :state="showState('minor_name')"
          />
          <b-form-invalid-feedback :state="showState('minor_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="col-md-6">
          <template #label> Date <span class="text-danger">*</span></template>
          <b-form-input
                  id="minor-date"
                  v-model="formData.minor_date"
                  placeholder="MM/DD/YYYY"
                  :state="showState('minor_date')"
                  @input="touched.minor_date = true"
                />
                <b-form-invalid-feedback :state="showState('minor_date')">
                  Please enter today's date
                </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-12">
          <template #label> Signature <span class="text-danger">*</span></template>
          <b-form-input
            id="input-minor_sig"
            v-model="formData.minor_sig"
            @input="touched.minor_sig = true"
            :state="showState('minor_sig')"
          />
          <b-form-invalid-feedback :state="showState('minor_sig')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Parent/Guardian Full Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-parent_name"
            v-model="formData.parent_name"
            @input="touched.parent_name = true"
            :state="showState('parent_name')"
          />
          <b-form-invalid-feedback :state="showState('parent_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="col-md-6">
          <template #label> Date <span class="text-danger">*</span></template>
            <b-form-input
                  id="parent-date"
                  v-model="formData.parent_date"
                  placeholder="MM/DD/YYYY"
                  :state="showState('parent_date')"
                  @input="touched.parent_date = true"
            />
            <b-form-invalid-feedback :state="showState('parent_date')">
                Please enter today's date
            </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-12">
          <template #label> Signature <span class="text-danger">*</span></template>
          <b-form-input
            id="input-parent_sig"
            v-model="formData.parent_sig"
            @input="touched.parent_sig = true"
            :state="showState('parent_sig')"
          />
          <b-form-invalid-feedback :state="showState('parent_sig')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>
    <br>
    </div>

    <div class="info-box">
            <div class="info-header" @click="toggleStu2">
                <span class="title header-title">Student Organization Release and Informed Consent Form</span>
                    <img
                    :src="openImg"
                    class="arrow"
                    :class="{open : stu2IsOpen}"
                    @click.stop="toggleStu2"
                    />
                </div>

        <div v-if="stu2IsOpen" class="info-content">
        <p>
            BY PARTICIPATING IN BITCAMP, YOU AGREE TO THE FOLLOWING TERMS AND ALL OTHER APPLICABLE 
            DOCUMENTS.
            <br>
            <br>
            Henceforth, "I", “me”, "my", “myself”, and other first-person pronouns shall refer to the Participant. "The 
            Organizers" shall refer to any persons or group who had significant participation in the creation of the event,
            namely (but not necessarily exclusively) the Bitcamp organizing team, Bitcamp Inc., Startup Shell Inc., the
            student organization named Terrapin Hackers, and the University of Maryland at College Park. “The
            Hackathon” shall refer to the Bitcamp hackathon. 
            <br>
            <br>
            I understand that by participating in The Hackathon, I agree to the following terms listed in this Bitcamp 
            Terms and Code of Conduct agreement (the “Agreement”), and to follow any procedures and instructions 
            given by The Organizers. Refusal to comply and any violations will subject me to punishment deemed 
            appropriate by The Organizers, such as the revocation of prizes and expulsion from The Hackathon.
            I have represented myself accurately on the application and all other event forms. I am allowed to develop a 
            concept for a project prior to The Hackathon, but any and all programming and tangible creations related to 
            a concept must be done at the time and place of The Hackathon. I am allowed to use publicly available 
            resources and code on my project, and I accept sole responsibility for licensee or owner responsibilities and 
            for any and all licensing or ownership rights and responsibilities of any intellectual property that I use, 
            display, store, distribute, make derivative works from, or otherwise and other appropriate acknowledgement 
            regarding the resources. I understand that The Organizers will not receive any ownership title or rights of any 
            work or project done at The Hackathon other than those limited rights herein. All original work will solely 
            remain under the ownership of the creator and/or the employing company. The Organizers are not liable for 
            any legal or contractual issues that may arise from the work. I hereby agree to indemnify, hold harmless, and 
            defend The Organizers against any liability resulting from the project or any created content. I understand 
            that the judges and The Organizers are allowed to look at my code for the purpose of judging by volunteer 
            judges, and that the decisions of these judges are final and may not be contested. The Hackathon will not be 
            held responsible for any decisions made by sponsors, and The Organizers are not liable for any transaction 
            of prizes between a sponsor and a participant. I understand that if I win a Bitcamp-sponsored prize, it is my 
            responsibility to be present at the event to receive the prize. If I am not present, I understand that I will not 
            receive the prize, regardless if the rest of my team is present to receive their prizes. I understand that I will 
            be fully responsible for any costs I incur as a direct or indirect result of participation in the event, including 
            but not limited to use of proprietary technology, food, accommodations, and other purchases. The 
            Organizers will not be liable for any costs or expenses incurred throughout the event. I understand that The 
            Organizers are not obligated to give travel reimbursements, and that any granted travel reimbursements are 
            contingent upon my submission of a project to Devpost. I understand that all services provided, including 
            but not limited to transportation, facilities (property, furniture, electricity, networking), food and beverage, 
            and activities are provided on an as-is and as-available basis only, with no guarantee of services meeting my 
            requirements or remaining uninterrupted, error-free, secure, or free from viruses and other harmful 
            components. The Organizers are not liable for any errors in services, regardless of whether they appear to
            provide these services or not. I understand any information I provide via my application may be distributed 
            to sponsors for recruiting purposes. I understand that by providing my resume via the application, I am 
            allowing the distribution of my resume to sponsors for recruiting purposes. I understand that unless I have
            paid for certain perks of sponsorship of Bitcamp, I am not allowed to recruit from the participants or disperse 
            marketing or recruiting materials to anyone at The Hackathon, including anyone in the venue. I agree to be 
            respectful and courteous to The Organizers, sponsors, volunteers, mentors, venue staff, and all other 
            participants. The Organizers have the authority to discipline me if my behavior at the event does not meet 
            their subjective standards of respect and courtesy. I authorize The Organizers in advance of any reasonably 
            perceived medical emergency to authorize any specific diagnosis, treatment, or hospital care that is required 
            to save my life or my child's life or to avoid or respond to serious bodily harm, but this authorization is given 
            to provide authority and power on the part of Bitcamp, its agents and employees for the duration of a 
            hackathon event and no more than eight hours after the official end of the event while I or my child remain 
            on the premises of the Organizer's hackathon, in order to give specific consent to any and all such diagnosis, 
            treatment or hospital care which the aforementioned health professional in the exercise of his or her best 
            judgment may deem required or reasonably recommended. I agree to not be in the possession of illegal 
            drugs, alcohol, or weapons at The Hackathon and otherwise always adhere to applicable state and federal 
            contacts law. I understand that I am bound to all rules and regulations of Maryland state laws, as well as 
            applicable city and federal laws.
            <br>
            <br>
            I ASSUME ALL RESPONSIBILITY FOR THE DAMAGE OR THEFT OF ALL PERSONAL ITEMS AND PROPERTY. 
            I UNDERSTAND THAT THE HACKATHON AND THE ORGANIZERS DO NOT TAKE RESPONSIBILITY AND 
            ARE NOT LIABLE FOR ANY DAMAGES OR THEFT TO PERSONAL ITEMS AND/OR PROPERTY.
            <br>
            <br>
            I understand that The Hackathon is 36 hours long, and that fatigue can cause delayed reaction time or 
            unusual decision-making, and I indemnify and hold harmless Bitcamp and the University of Maryland for any 
            liabilities or damages from and against, and shall compensate and reimburse each Indemnitee for, any loss, 
            damage, injury, harm, detriment, lost opportunity, liability, exposure, claim, demand, settlement, judgment, 
            award, fine, penalty, tax, fee (including attorneys' fees), charge or expense that is directly or indirectly 
            suffered or incurred by any of the Indemnitees, or to which any of the Indemnitees otherwise may become 
            subject (regardless of whether or not related to a third-party claim) at any time (whether during or after the 
            Term), and that is caused by or results from (a) any inaccuracy in any representation or warranty by or on my 
            behalf contained in this Agreement, or (b) any failure on my part to observe, perform or abide by, or any 
            other breach of, any restriction, covenant, obligation or other provision contained in this Agreement.
          </p>
        </div>
    </div>

  <div v-if="stu2IsOpen">
    <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Minor Full Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-minor-name"
            v-model="formData.stu_minor_name"
            @input="touched.stu_minor_name = true"
            :state="showState('stu_minor_name')"
          />
          <b-form-invalid-feedback :state="showState('stu_minor_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="col-md-6">
          <template #label> Date <span class="text-danger">*</span></template>
          <b-form-input
                  id="minor-date"
                  v-model="formData.stu_minor_date"
                  placeholder="MM/DD/YYYY"
                  :state="showState('stu_minor_date')"
                  @input="touched.stu_minor_date = true"
                />
                <b-form-invalid-feedback :state="showState('stu_minor_date')">
                  Please enter today's date
                </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-12">
          <template #label> Signature <span class="text-danger">*</span></template>
          <b-form-input
            id="input-minor_sig"
            v-model="formData.stu_minor_sig"
            @input="touched.stu_minor_sig = true"
            :state="showState('stu_minor_sig')"
          />
          <b-form-invalid-feedback :state="showState('stu_minor_sig')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Parent/Guardian Full Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-parent_name"
            v-model="formData.stu_parent_name"
            @input="touched.stu_parent_name = true"
            :state="showState('stu_parent_name')"
          />
          <b-form-invalid-feedback :state="showState('stu_parent_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="col-md-6">
          <template #label> Date <span class="text-danger">*</span></template>
            <b-form-input
                  id="parent-date"
                  v-model="formData.stu_parent_date"
                  placeholder="MM/DD/YYYY"
                  :state="showState('stu_parent_date')"
                  @input="touched.stu_parent_date = true"
            />
            <b-form-invalid-feedback :state="showState('stu_parent_date')">
                Please enter today's date
            </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-12">
          <template #label> Signature <span class="text-danger">*</span></template>
          <b-form-input
            id="input-parent_sig"
            v-model="formData.stu_parent_sig"
            @input="touched.stu_parent_sig = true"
            :state="showState('stu_parent_sig')"
          />
          <b-form-invalid-feedback :state="showState('stu_parent_sig')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>
    <br>
    </div>

    <div class="info-box">
            <div class="info-header" @click="toggleCond">
                <span class="title header-title">Conditional Form Question</span>
                    <img
                    :src="openImg"
                    class="arrow"
                    :class="{open : condIsOpen}"
                    @click.stop="toggleCond"
                    />
                </div>

        <div v-if="condIsOpen" class="info-content">
        <p>
            <b-form-group>
              <template #label>
                <span
                  >Please select your waiver type: <span class="text-danger">*</span></span
                >
              </template>
              <b-form-radio-group
                v-model="formData.chaperone"
                name="chaperone"
                @click="touched.chaperone = true"
              >
                <b-form-radio value="yes">I have a chaperone</b-form-radio>
                <b-form-radio value="no">I'm coming with my school</b-form-radio>
              </b-form-radio-group>
              <b-form-invalid-feedback :state="showState('chaperone')">
                Select an option
            </b-form-invalid-feedback>
            </b-form-group>
          </p>
          <h4 style="text-decoration: underline;">
            Chaperone Agreement Form
          </h4>
          <h5>
            Chaperone Responsibilities
          </h5>
          <p>
            <ul>
                <li>Responsible for their minor(s) the entire time they are on the University of Maryland, College Park campus, including inside the Armory.</li>
                <li>Required to be awayre of their student's location within the Armory at all times.</li>
                <li>Required to ensure that their students remain inside the Armory at all times unless accompanied by their chaperone(s).</li>
                <li>Responsible for their student(s) behavior and are required to ensure that their student(s) adhere to Bitcamp's Terms and Code of Conduct.</li>
                <li>Required to remain in the Armory as long as their student(s) are there.</li>
                <li>Responsible for ensuring that their student(s) do not remain in the Armory after 12am (midnight) and do not arrive before 7am.</li>
                <li>Required to alert organizers, police, EMT, or fire marshal in case of an emergency.</li>
                <li>Responsible for knowing their student(s) food allergies and medical conditions, as well as ensuring that their health needs are being met.</li>
            </ul>
          </p>
        </div>
    </div>

<div v-if="condIsOpen">
    <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Minor Full Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-minor-name"
            v-model="formData.chap_minor_name"
            @input="touched.chap_minor_name = true"
            :state="showState('chap_minor_name')"
          />
          <b-form-invalid-feedback :state="showState('chap_minor_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="col-md-6">
          <template #label> Date <span class="text-danger">*</span></template>
          <b-form-input
                  id="chap_minor-date"
                  v-model="formData.chap_minor_date"
                  placeholder="MM/DD/YYYY"
                  :state="showState('chap_minor_date')"
                  @input="touched.chap_minor_date = true"
                />
                <b-form-invalid-feedback :state="showState('chap_minor_date')">
                  Please enter today's date
                </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-12">
          <template #label> Signature <span class="text-danger">*</span></template>
          <b-form-input
            id="input-chap_minor_sig"
            v-model="formData.chap_minor_sig"
            @input="touched.chap_minor_sig = true"
            :state="showState('chap_minor_sig')"
          />
          <b-form-invalid-feedback :state="showState('chap_minor_sig')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-6">
          <template #label> Chaperone Full Name <span class="text-danger">*</span></template>
          <b-form-input
            id="input-chap_name"
            v-model="formData.chap_name"
            @input="touched.chap_name = true"
            :state="showState('chap_name')"
          />
          <b-form-invalid-feedback :state="showState('chap_name')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group class="col-md-6">
          <template #label> Date <span class="text-danger">*</span></template>
            <b-form-input
                  id="chap-date"
                  v-model="formData.chap_date"
                  placeholder="MM/DD/YYYY"
                  :state="showState('chap_date')"
                  @input="touched.chap_parent_date = true"
            />
            <b-form-invalid-feedback :state="showState('chap_date')">
                Please enter today's date
            </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>

    <b-form-row>
        <b-form-group class="col-md-12">
          <template #label> Signature <span class="text-danger">*</span></template>
          <b-form-input
            id="input-chap_sig"
            v-model="formData.chap_sig"
            @input="touched.chap_parent_sig = true"
            :state="showState('chap_sig')"
          />
          <b-form-invalid-feedback :state="showState('chap_sig')">
            Required field
          </b-form-invalid-feedback>
        </b-form-group>
    </b-form-row>
    </div>

            <div class="actions">
              <b-button
                type="button"
                @click="handlePrevious"
                class="submit-btn"
                style="margin-right: 10px"
              >
                <b-icon icon="arrow-left" /> Previous
              </b-button>
              <b-button type="submit" class="submit-btn">
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
        "minor_name",
        "minor_date",
        "minor_sig",
        "parent_name",
        "parent_date",
        "parent_sig",
        "stu_minor_name",
        "stu_minor_date",
        "stu_minor_sig",
        "stu_parent_name",
        "stu_parent_date",
        "stu_parent_sig",
        "chaperone",
        "chap_minor_name",
        "chap_minor_date",
        "chap_minor_sig",
        "chap_name",
        "chap_date",
        "chap_sig"
    ];

    return {
       sixthPageRequiredFields : [
        "minor_name",
        "minor_date",
        "minor_sig",
        "parent_name",
        "parent_date",
        "parent_sig",
        "stu_minor_name",
        "stu_minor_date",
        "stu_minor_sig",
        "stu_parent_name",
        "stu_parent_date",
        "stu_parent_sig",
        "chaperone",
        "chap_minor_name",
        "chap_minor_date",
        "chap_minor_sig",
        "chap_name",
        "chap_date",
        "chap_sig"
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
      stu2IsOpen: false,
      condIsOpen: false,
      openImg: require('@/assets/dropdown-icons/up-arrow.svg')
    };
  },

  computed: {
    validations() {
        const req = (v) => v !== null && v !== undefined && v.toString().trim().length > 0;

        return {
            minor_name: req(this.formData.minor_name),
            minor_date: req(this.formData.minor_date) && this.isValidDateFormat(this.formData.minor_date),
            minor_sig: req(this.formData.minor_sig),
            parent_name: req(this.formData.parent_name),
            parent_date: req(this.formData.parent_date) && this.isValidDateFormat(this.formData.parent_date),
            parent_sig: req(this.formData.parent_sig),
            stu_minor_name: req(this.formData.stu_minor_name),
            stu_minor_date: req(this.formData.stu_minor_date) && this.isValidDateFormat(this.formData.stu_minor_date),
            stu_minor_sig: req(this.formData.stu_minor_sig),
            stu_parent_name: req(this.formData.stu_parent_name),
            stu_parent_date: req(this.formData.stu_parent_date) && this.isValidDateFormat(this.formData.stu_parent_date),
            stu_parent_sig: req(this.formData.stu_parent_sig),
            chaperone: req(this.formData.chaperone),
            chap_minor_name: req(this.formData.chap_minor_name),
            chap_minor_date: req(this.formData.chap_minor_date) && this.isValidDateFormat(this.formData.chap_minor_date),
            chap_minor_sig: req(this.formData.chap_minor_sig),
            chap_name: req(this.formData.chap_name),
            chap_date: req(this.formData.chap_date) && this.isValidDateFormat(this.formData.chap_date),
            chap_sig: req(this.formData.chap_sig),
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
      console.log("TOUCHED", this.touched);
      console.log("FORM DATA", this.formData);

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

    toggleStu2() {
      this.stu2IsOpen = !this.stu2IsOpen;
    },
    
    toggleCond(){
        this.condIsOpen = !this.condIsOpen;
    }
  },
};
</script>

<style scoped>
/* Stepper and Page Content Styles */
.page-content {
  background: #fff7ee;
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15);
  padding: 40px 56px 48px;
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
  margin-bottom: 22px;
}

.header-title {
  font-family: "Aleo", serif;
  font-size: 20px;
  color: white;
  font-weight: 600;
}

.stepper {
  display: flex;
  justify-content: space-between;
  margin: 18px 0 14px;
}

.stepper-item {
  flex: 1;
  text-align: center;
  font-size: 0.7rem;
}

.stepper-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 auto 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  color: #9a9a9a;
  border: 1px solid #dddddd;
  font-size: 1rem;
  font-weight: 600;
}

.stepper-item.active .stepper-circle {
  background: #ff6b35;
  color: #ffffff;
  border-color: #ff6b35;
}

.stepper-item.active .stepper-label {
  color: #ff6b35;
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.submit-btn {
  background-color: #ff6b35;
  border: none;
  color: #ffffff;
  padding: 10px 32px;
  font-weight: 700;
  border-radius: 6px;
  box-shadow: 0 6px 16px rgba(255, 107, 53, 0.45);
}

.header {
  margin-top: 2rem;
}

.section-divider {
  height: 2px;
  background-color: #ffeac7;
  margin: 0.5rem auto 1.5rem;
  border-radius: 2px;
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

.arrow.open{
  transform: rotate(0deg);
}

</style>
