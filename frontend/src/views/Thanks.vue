<template>
  <div class="about">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
        <b-row>
          <b-col md=1></b-col>
          <b-col>
            <h1>You're registered for Technica 2021!</h1>

            <div class="py-3">
              <p class="mb-4">
                You will be sent a confirmation email for your registration.
                If you have any questions, be sure to reach out to <a href="mailto:hello@gotechnica.org">hello@gotechnica.org</a>.
                <br/>
                Get ready for the best weekend you've ever had!
              </p>

              <p class="mb-1">
                Next, share your referral link with others to earn rewards.
              </p>

              <!-- Referral link copy -->
              <b-row class="mb-5">
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
              </b-row>

              <p>
                Follow us on social media to make sure you don't miss any updates from Technica.
              </p>
              <!-- Social links -->
              <div class="pb-3">
                <social-links/>
              </div>

            </div>

          </b-col>
          <b-col md=1></b-col>
        </b-row>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import generalMixin from '../mixins/general';
import SocialLinks from '../components/SocialLinks.vue';

Vue.use(VueClipboard);

export default {
  name: 'Team',
  components: { SocialLinks },
  mixins: [generalMixin],
  data () {
    return {
      copyBtnText: "Copy Link"
    }
  },
  computed: {
    referralLink() {
      return `${document.location.origin}/${this.referralID}`;
    },
  },
  props: {
      referralID: {
          type: String,
          default: ""
      }
  },
  methods: {
    changeCopyText() {
      this.copyBtnText = "Link copied!";
      this.sleep(1000).then( () => {
        this.copyBtnText = "Copy Link";
        this.$gtag.event('copied-referral-link', { method: 'Google' })
        this.track({
          referral_id: this.referralID,
          key: "copied-referral",
          value: true
        });
      })
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

p {
  font-size: 1.05rem;
}

.btn-cyan {
  background-color: var(--muted-cyan);
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
