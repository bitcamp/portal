<!-- takes in type prop to determine what to show -->
<template>
  <div class="about">
    <b-container>
      <b-card class="main-card mt-3 mt-md-5">
        <b-row>
          <b-col md="1" />
          <b-col>
            <h1>
              {{ type === 'hacker' ? 'Hacker' : type === 'volunteer' ? 'Volunteer' : type === 'mentor' ? 'Mentor' : 'Registration' }}
              registration for Bitcamp 2026 is now closed - See you April 10-12!
            </h1>
            <img
              style="width: 200px; height: 200px"
              src="@/assets/bitcamp.gif"
            >

            <div class="py-3">
              <p class="mb-4">
                If you have any questions, be sure to reach out to
                <a href="mailto:hello@bit.camp">hello@bit.camp</a>.
              </p>
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
import generalMixin from "../mixins/general";
import SocialLinks from "../components/SocialLinks.vue";

export default {
  name: "ThanksView",
  components: { SocialLinks },
  mixins: [generalMixin],
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.main-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
}
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
