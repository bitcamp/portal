<template>
  <div class="about">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
        <b-row>
          <b-col md="1" />
          <b-col>
            <h1>You're registered

              <span v-if="type">
                as a {{ type }}
              </span>
              <!-- <span v-else>
                for the waitlist
              </span> -->
              for Bitcamp 2025!</h1>

            <img style="width: 200px; height: 200px;" src="@/assets/bitcamp.gif" />

            <div class="py-3">
              <p class="mb-4">
                You'll get a confirmation email shortly. Please check your spam folder if you don't
                see it.
                <br />
                See you by the campfire!
                <br />
                If you have any questions, be sure to reach out to
                <a href="mailto:hello@bit.camp">hello@bit.camp</a>.
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

              <p>Follow us on social media to make sure you don't miss any updates from Bitcamp.</p>
              <!-- Social links -->
              <div class="pb-3">
                <social-links />
              </div>
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
.about {
  display: flex;
  height: 100vh;
  align-items: center;
}

.card {
  margin: 0 !important;
}

h1 {
  margin-top: 1rem;
}

p {
  font-size: 1.05rem;
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
