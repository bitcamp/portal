<template>
  <div class="about">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
        <b-row>
          <b-col md=1></b-col>
          <b-col>
            <h1>Thanks for registering!</h1>

            <div class="py-3">
              <p class="mb-0">
                You will be sent a confirmation email for your registration. Share your referral link with others to earn rewards- more to come soon!
              </p>

              <!-- Referral link copy -->
              <b-row>
                <b-col md=1></b-col>
                <b-col>

                  <b-input-group class="my-3">
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
                        v-clipboard:success="showLinkToast"
                        size="sm"
                        variant="cyan"
                        class="copy-button"
                      >
                        <img
                          class="btn-icon btn-icon-left"
                          src="../assets/copy-icon.svg"
                        >
                        Copy Link
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>

                </b-col>
                <b-col md=1></b-col>
              </b-row>

              <p>
                Keep in touch with Technica by following us on social media! Get ready for the best weekend you've ever had.
              </p>
            </div>

            <span class="dot dot1"></span>
            <span class="dot dot2"></span>
            <span class="dot dot3"></span>
            <br>
            <span class="dot dot1"></span>
            <span class="dot dot2"></span>
            <span class="dot dot3"></span>
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

Vue.use(VueClipboard);

export default {
  name: 'Team',
  mixins: [generalMixin],
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
    /**
     * Shows a new alert
     */
    showLinkToast() {
      this.$bvToast.toast(`Copied referral link!`, {
        toaster: 'b-toaster-bottom-center',
        solid: true,
        appendToast: false,
        noCloseButton: true,
        autoHideDelay: 1000,
      })
    },
    /**
     * Select the entire input value on click
     */
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
.dot {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  display: inline-block;
}

.dot1 {
  background-color: var(--muted-cyan);
}

.dot2 {
  background-color: var(--lavender);
}

.dot3 {
  background-color: var(--rose);
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

.toast {

}

</style>
