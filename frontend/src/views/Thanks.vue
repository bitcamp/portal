<template>
  <div class="about">
    <b-container class="move">
      <b-card class="main-card mt-3 mt-md-5">
        <b-row>
          <b-col md="1" />
          <b-col>
            <h1>You're registered for Bitcamp 2026!</h1>

            <!--               <span v-if="type">
                as a {{ type }}
              </span>
              <span v-else>
                for the waitlist
              </span>
              for Bitcamp 2025!</h1> -->

            <img style="width: 20vh; height: 20vh" src="@/assets/marshy.svg" />

            <div class="py-3">
              <p class="mb-4">
                You'll get a confirmation email shortly. Please check your spam folder if you don't
                see it.
                <br />
                See you by the campfire!
                <br />
                If you have any questions, be sure to reach out to
                <a href="mailto:hello@bit.camp">hello@bit.camp</a>.
                <br />
                You may now close this tab.
              </p>

              <!-- <p class="mb-1">
                Next, share your referral link with others to earn rewards.
              </p>
              -->

              <!-- Referral link copy -->
              <!-- <b-row class="mb-5">
                <b-col md=1></b-col>
                <b-col>

                  <b-input-group>
                    <b-input
                      readonly
                      :value=referralLink
                      class="flex-0"
                      v-model="referralLink"
                      @click="handleLinkInputClick"
                    />
                    <b-input-group-append>
                      <b-button
                        v-clipboard:copy="referralLink"
                        v-clipboard:success="changeCopyText"
                        size="sm"
                        variant="cyan"
                        class="copy-button"
                      >
                        <img
                          class="btn-icon btn-icon-left"
                          src="../assets/copy-icon.svg"
                        >
                        <span class="ml-1" v-html="copyBtnText"></span>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
                <b-col md=1></b-col>
              </b-row> -->

              <p class="mobile">
                Follow us on social media to make sure you don't miss any updates from Bitcamp.
              </p>
              <!-- Social links -->
              <div class="pb-3">
                <social-links />
              </div>

              <p class="orange-p">You may now close this tab</p>
            </div>
          </b-col>
          <b-col md="1" />
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import VueConfetti from "vue-confetti";
import generalMixin from "../mixins/general";
import SocialLinks from "../components/SocialLinks.vue";

Vue.use(VueClipboard);
Vue.use(VueConfetti);

export default {
  name: "ThanksView",
  components: { SocialLinks },
  mixins: [generalMixin],
  props: {
    referralID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      copyBtnText: "Copy Link",
      type: "",
    };
  },

  computed: {
    referralLink() {
      return `${document.location.origin}/${this.referralID}`;
    },
  },

  mounted() {
    this.$confetti.start({
      defaultType: "rect",
      particlesPerFrame: 0.25,
      defaultColors: [
        "#FF3F46",
        "#FF6F3F",
        "#FFAF3F",
        "#FFEF3F",
        "#CBF2FF",
        "#FFFFFF",
        "#528CA5",
        "#528CA5",
      ],
    });

    this.sleep(3000).then(() => {
      this.$confetti.stop();
    });

    this.type = this.$route.query.type;
    // this.sendAnalyticsEvent('completed_registration');
    // gtag('event', 'conversion', {'send_to': this.getEnvVariable('GOOGLE_AD_ANALYTICS_ID')});
  },
  methods: {
    changeCopyText() {
      this.copyBtnText = "Link copied!";
      this.sleep(1000).then(() => {
        this.copyBtnText = "Copy Link";
        this.$gtag.event("copied-referral-link", { method: "Google" });
        this.track({
          referral_id: this.referralID,
          key: "copied-referral",
          value: true,
        });
      });
    },
    // Select the entire input value on click
    handleLinkInputClick(event) {
      // See this stackoverflow post:
      // https://stackoverflow.com/questions/4067469/selecting-all-text-in-html-text-input-when-clicked
      const input = event.currentTarget;
      input.setSelectionRange(0, input.value.length);
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  h1 {
    font-size: 1.8rem;
  }
  .mb-4 {
    font-size: 0.9rem;
  }
  .mobile {
    font-size: 0.9rem;
  }
}

.about {
  display: flex;
  height: 100vh;
  align-items: center;
}

.move {
  width: 85%;
}

.card {
  margin: 0 !important;
}

h1 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

p {
  font-size: 1.05rem;
}

.orange-p {
  font-family: Avenir;
  font-weight: 800;
  font-style: Heavy;
  font-size: 24px;
  leading-trim: NONE;
  line-height: 100%;
  letter-spacing: 0.25px;
  text-align: center;
  color: #ff6f00;
}

.btn-cyan {
  background-color: var(--dirty-cyan);
  color: var(--white);
  border-radius: 0.6rem;
  border-color: var(--cyan);
  float: right;
}

.btn-cyan:hover {
  background-color: var(--cyan);
}

.copy-button {
  z-index: 0;
  margin: 0;
}
</style>
